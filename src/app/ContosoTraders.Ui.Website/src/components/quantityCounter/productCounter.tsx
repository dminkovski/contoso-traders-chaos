import './productCounter.scss'

import { IRootState } from 'app/config/store';
import { CartService } from 'app/services';
import { CartItem } from 'app/shared/models';
import { AuthenticationState } from 'app/shared/reducers/authentication.reducer';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface QuantityPickerProps {
  qty?: number;
  min: number;
  max: number;
  page?: string;
  detailProduct?: CartItem;
  setQty?: (value: number) => void;
  getCartItems?: () => void;
}

const QuantityPicker = ({
  qty,
  min,
  max,
  page,
  detailProduct,
  setQty,
  getCartItems
}:QuantityPickerProps):JSX.Element => {
  const [value, setValue] = useState<number>(qty || min);
  const disableDec = value <= min;
  const disableInc = value >= max;
  const isAuthenticated = useSelector((state:IRootState) => (state.authentication as AuthenticationState).isAuthenticated);

  useEffect(() => {
    if (page === 'cart') {
      updateProductQty();
    }
    if (setQty) {
      setQty(value);
    }
  }, [value]);

  const updateProductQty = useCallback(async () => {
    if (page === 'cart' &&  detailProduct?.quantity != value) {
      if (isAuthenticated) {
        const response = await CartService.updateQuantity(detailProduct as CartItem, value);
        if (response && getCartItems) {
          getCartItems();
        }
      } else {
        let cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
        const itemIndex = cartItems.findIndex(
          (item: CartItem) => item.productId === detailProduct?.productId
        );
        if (itemIndex !== -1) {
          cartItems[itemIndex].quantity = value;
          localStorage.setItem('cart_items', JSON.stringify(cartItems));
          if (getCartItems) {
            getCartItems();
          }
        }
      }
    }

    if (setQty) {
      setQty(value);
    }
  }, [value, page, isAuthenticated, detailProduct, getCartItems, setQty]);



  useEffect(() => {
    updateProductQty();
  }, [value, updateProductQty]);

  const increment = () => {
    if (value < max) {
      setValue(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      setValue(value - 1);
    }
  };

  return (
    <span>
      <span className="quantity-picker">
        <button
          className={`${disableDec ? 'mod-disable ' : ''}quantity-modifier modifier-left`}
          onClick={decrement}
          disabled={disableDec}
        >
          -
        </button>
        <input className="quantity-display" type="text" value={value} readOnly />
        <button
          className={`${disableInc ? 'mod-disable ' : ''}quantity-modifier modifier-right`}
          onClick={increment}
          disabled={disableInc}
        >
          +
        </button>
      </span>
    </span>
  );
};

export default QuantityPicker;