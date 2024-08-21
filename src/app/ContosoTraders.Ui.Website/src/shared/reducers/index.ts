import { ReducersMapObject } from 'redux';

import authentication from './authentication.reducer';
import cart from "./cart.reducer";

const rootReducer: ReducersMapObject = {
  authentication,
  cart
};

export default rootReducer;
