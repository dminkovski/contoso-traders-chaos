import * as Constants from "app/config/constants";
import { CartItem, Product } from "app/shared/models";
import axios, { AxiosResponse } from "axios";

class CartService {
    private static API_PREFIX = Constants.SHOPPING_CART_API_ENDPOINT;
  
    /**
     * Retrieves the current shopping cart.
     * @returns {Promise<CartItem[] | null>} - The shopping cart items or null in case of an error.
     */
    static async getShoppingCart(): Promise<CartItem[] | null> {
      try {
        const response: AxiosResponse<CartItem[]> = await axios.get(`${this.API_PREFIX}/shoppingcart`);
        return response.data;
      } catch (error) {
        console.error('Error fetching shopping cart:', error);
        return null;
      }
    }
  
    /**
     * Adds a product to the shopping cart. If the product is already in the cart, its quantity is updated.
     * @param {Product} detailProduct - The product to be added.
     * @returns {Promise<{ message?: string; errMessage?: string }>} - A message indicating success or failure.
     */
    static async postProductToCart(
      detailProduct: Product
    ): Promise<{ message?: string; errMessage?: string }> {
      const cartItems = await this.getShoppingCart();  
      if (cartItems) {
        const existingProduct:CartItem | undefined = cartItems.find((cartItem) => cartItem.productId === detailProduct.id);
  
        if (existingProduct) {
          return this.updateQuantity(existingProduct, existingProduct.quantity + 1)
            .then(() => ({ message: 'Product added to shopping cart' }))
            .catch(() => ({ errMessage: 'The product could not be added to the cart' }));
        }
      }
      return this.addProduct(detailProduct);
    }
  
    /**
     * Adds a new product to the shopping cart.
     * @param {Product} detailProduct - The product to be added.
     * @returns {Promise<any>} - The response data or an error message.
     */
    static async addProduct(detailProduct: Product): Promise<any> {  
      const cartItem: CartItem = {
        cartItemId: Math.floor(Math.random() * 1000).toString(),
        email: detailProduct.email.toLowerCase(),
        productId: detailProduct.id,
        name: detailProduct.name,
        price: detailProduct.price,
        imageUrl: detailProduct.imageUrl,
        quantity: detailProduct.quantity,
      };
  
      try {
        const response: AxiosResponse<any> = await axios.post(
          `${this.API_PREFIX}/shoppingcart`,
          cartItem
        );
        return response.data;
      } catch (error) {
        console.error('Error adding product to cart:', error);
        return { errMessage: 'The product could not be added to the cart' };
      }
    }
  
    /**
     * Retrieves related products based on the type ID.
     * @param {string} typeid - The type ID of the product.
     * @returns {Promise<any>} - The first related product from the response.
     */
    static async getRelatedDetailProducts(typeid: string): Promise<any> {  
      try {
        const response: AxiosResponse<any[]> = await axios.get(
          `${this.API_PREFIX}/shoppingcart/relatedproducts/?type=${typeid}`,
        );
        return response.data[0];
      } catch (error) {
        console.error('Error fetching related products:', error);
        return null;
      }
    }
  
    /**
     * Updates the quantity of a product in the shopping cart.
     * @param {CartItem} cartItem - The cart item.
     * @param {number} quantity - The new quantity of the product.
     * @param {string} token - The authentication token.
     * @returns {Promise<AxiosResponse<any>>} - The response from the update request.
     */
    static async updateQuantity(
      cartItem: CartItem,
      quantity: number,
    ): Promise<AxiosResponse<any>> {  
        const requestObject = {
            ...cartItem,
            quantity
        }
      return axios.put(
        `${this.API_PREFIX}/shoppingcart/product`,
        requestObject
      );
    }
  
    /**
     * Deletes a product from the shopping cart.
     * @param {CartItem} detailProduct - The product to be deleted.
     * @returns {Promise<AxiosResponse<any>>} - The response from the delete request.
     */
    static async deleteProduct(detailProduct: CartItem): Promise<AxiosResponse<any>> {  
      const requestConfig = {
        data: {
          cartItemId: detailProduct.cartItemId,
          email: detailProduct.email,
          productId: detailProduct.productId,
          name: detailProduct.name,
          price: detailProduct.price,
          imageUrl: detailProduct.imageUrl,
          quantity: detailProduct.quantity,
        },
      };
  
      return axios.delete(`${this.API_PREFIX}/shoppingcart/product`, requestConfig);
    }
  }
  
  export default CartService;