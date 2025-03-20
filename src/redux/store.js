import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './slices/wishlistSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;