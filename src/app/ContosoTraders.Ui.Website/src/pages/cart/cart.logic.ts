import { IRootState } from "app/config/store";
import { CartService } from "app/services";
import { AuthenticationState } from "app/shared/reducers/authentication.reducer";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';

const VALID_COUPONS:string[] = ['discount10','discount15'];
const DEFAULT_DISCOUNT_PERCENTAGE  = 15;
const DEFAULT_DELIVERY = 10;

const useCartLogic = () => {

  const [coupon, setCoupon] = useState('DISCOUNT15');
  
  const [cartItems, setCartItems] = useState([]);
  
  const [invalidCoupon, setInvalidCoupon] = useState(false);
  const [loading, setLoading] = useState(false)

  const [discountPercentage, setDiscountPercentage] = useState(DEFAULT_DISCOUNT_PERCENTAGE);
  const [delivery, setDelivery] = useState(DEFAULT_DELIVERY);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  
  const textInput = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector((state:IRootState) => (state.authentication as AuthenticationState).isAuthenticated);

  const getCartItems = useCallback(async () => {
    setLoading(true);
    let items;
    if (isAuthenticated) {
      let res = await CartService.getShoppingCart();
      items = res ? res : []
    } else {
      items = localStorage.getItem('cart_items') ? JSON.parse(localStorage.getItem('cart_items') as string) : []
    }
      let sum = 0;
      if (items.length > 0) {
        items.map((item:any) => {
          return (
            sum += item.price * item.quantity
          )
        })
        setTotal(sum);
        let discount = (sum/100)*discountPercentage;
        setDiscountPrice(Math.ceil(discount));
        let deliveryCharge = 10;
        setDelivery(deliveryCharge)
        let totalval:number = (sum - discount) + deliveryCharge;
        setGrandTotal(totalval);
      }
      setCartItems(items)
      setLoading(false)
  }, [isAuthenticated])

  useEffect(() => {
    getCartItems();
  }, [getCartItems, isAuthenticated]);

  useEffect(() => {
    if(total > 0){
      let discount:number = (total/100)*discountPercentage;
      setDiscountPrice(Math.ceil(discount));
      let totalValue:number = (total - discount) + delivery;
      setGrandTotal(totalValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountPercentage]);

  const currentPath = location.pathname?.split("/")?.pop()?.replaceAll('-', ' ');
  const parentPath = location.pathname?.split("/")?.pop()?.replaceAll('-', ' ');
  const parentUrl =   location.pathname?.split("/")?.pop()?.replaceAll('-', ' ');

  const checkDiscount = () => {
    if(textInput.current) {
      const couponCode = textInput.current.value.toLowerCase();
      if(VALID_COUPONS.includes(couponCode)){
        switch (couponCode) {
          case 'discount15':
            setDiscountPercentage(15);
            break;
          case 'discount10':
            setDiscountPercentage(10);
            break;
          default:
            break;
        }
        setCoupon(textInput.current.value);
        textInput.current.value = ''
        setInvalidCoupon(false);
      }else{
        setInvalidCoupon(true)
      }
    }
    
  }


  const removeFromCart = async (item:any) => {
    if (isAuthenticated) {
      await CartService.deleteProduct(item);
    }else{
      let cartItem = localStorage.getItem('cart_items') ? JSON.parse(localStorage.getItem('cart_items') as string) : [];
      var filtered = cartItem.filter(function(el:any) { return el.name !== item.name; });
      localStorage.setItem('cart_items',JSON.stringify(filtered))
    }
    getCartItems()
  }


  return {
    state: {
      coupon,
      invalidCoupon,
      discountPercentage,
      discountPrice,
      cartItems,
      loading,
      total,
      delivery,
      grandTotal
    },
    data: {
      currentPath,
      parentPath, 
      parentUrl,
      isAuthenticated,
    },
    refs: {
      textInput
    },
    actions: {
      navigate,
      removeFromCart,
      checkDiscount,
      setDiscountPercentage,
      setCoupon,
      getCartItems
    }
  }
}
export default useCartLogic;