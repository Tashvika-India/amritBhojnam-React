import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./redux/productSlices"


const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});

export default store;
