import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import {CartService, ProductService} from 'app/services';
import { Product } from 'app/shared/models';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const useProductLogic = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<{ open: boolean, type: 'success' | 'error', message: string }>({ open: false, type: 'error', message: '' });
  const [quantity, setQuantity] = useState<number>(1);


  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();

  const addProductToCart = useCallback(async () => {
    if (!product) return;
    if (!isAuthenticated) {
        const cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
        const itemIndex = cartItems.findIndex((item: any) => item.productId === product.id);

        if (itemIndex === -1) {
            cartItems.push({ ...product, quantity });
            localStorage.setItem('cart_items', JSON.stringify(cartItems));
            showSuccessMessage(`Added ${product.name} to Cart`);
        } else {
            showErrorMessage('Already added to cart');
        }
    } else if (accounts.length > 0) {
        try {
            const email = accounts[0].username;
            const productToAdd = { ...product, email, quantity };

            const response = await CartService.addProduct(productToAdd);

            if (response.errMessage) {
                showErrorMessage(response.errMessage);
            } else {
                showSuccessMessage("Added to shopping cart!");
            }
        } catch (error) {
            console.error('Failed to add product to cart:', error);
            showErrorMessage('Failed to add product to cart');
        }
    } else {
        console.error('The account is missing.');
    }
}, [isAuthenticated, accounts, product, quantity]);

  const showSuccessMessage = (message: string) => {
    setAlert({ open: true, type: 'success', message });
  };

  const showErrorMessage = (message: string) => {
    setAlert({ open: true, type: 'error', message });
  };

  const handleClose = () => {
    setAlert({ open: false, type: 'error', message: '' });
  };

  const getProduct = async (productId: string) => {
      try {
          setLoading(true);
          const productData:Product = await ProductService.getDetailProductData(productId);
          if (productData) {
              setProduct(productData);
          } else {
              navigate('/product-not-found');
          }
      } catch (error) {
          console.error('Failed to fetch product details:', error);
          navigate('/product-not-found');
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    getProduct(productId!);
}, [productId]);

  return {
    state:{
      alert,
      product,
      isAuthenticated,
      loading
    },
    actions: {
      setQuantity,
      addProductToCart,
      handleClose
    }
  }
}
export default useProductLogic;