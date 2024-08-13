import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CartService } from '../../services';

export const initialState = {
  quantity: 0
};

export type CartState = Readonly<typeof initialState>;

export const getCartQuantity = async () => {
  /*const shoppingcart = await CartService.getShoppingCart();
  if (shoppingcart) {
    const quantity = shoppingcart.length;
    saveQuantity(quantity);
  }*/
}

export const saveQuantity = (quantity:number) => (dispatch:Function) => {
  dispatch(newQuantity(quantity));
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState: initialState as CartState,
  reducers: {
    newQuantity(state: CartState, action: PayloadAction<number>) {
      return {
        ...initialState,
        quantity: action.payload
      };
    },
  },
});

export const { newQuantity } = CartSlice.actions;


export default CartSlice.reducer;
