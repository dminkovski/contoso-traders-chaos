import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const initialState = {
  quantity: 0
};

export type CartState = Readonly<typeof initialState>;

export const CartSlice = createSlice({
  name: 'cart',
  initialState: initialState as CartState,
  reducers: {
    newQuantity(state: CartState, action: PayloadAction<number>) {
      return {
        ...state,
        quantity: action.payload
      };
    },
  },
});

export const { newQuantity } = CartSlice.actions;


export default CartSlice.reducer;
