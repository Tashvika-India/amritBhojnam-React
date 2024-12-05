import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './slices/wishlistSlice';

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
});

export default store;