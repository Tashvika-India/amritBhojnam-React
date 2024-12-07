import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './slices/wishlistSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});

export default store;