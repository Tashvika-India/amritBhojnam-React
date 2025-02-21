import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBestPriceApi, getPopularProducts, getProductApi } from "../../services/adminApiRoutes";

// Async thunk to fetch product list
export const fetchProductList = createAsyncThunk(
    "product/fetchProductList",
    async (filter, { rejectWithValue }) => {
        try {
            const response = await getProductApi(filter);
            return response?.data?.results || [];
        } catch (error) {
            console.error("Error fetching product list:", error);
            return rejectWithValue(error.message);
        }
    }
);

// Slice for managing product list state
const productSlice = createSlice({
    name: "product",
    initialState: {
        productList: [],
        popularProducts: [],
        bestPriceProducts: [],
        bestChoiceProducts: [],
        deliciousProducts: [],
        healthyBitesProducts: [],
        loading: true,
        error: null,
    },
    reducers: {
        clearProductList: (state) => {
            state.productList = [];
            state.popularProducts = [];
            state.bestPriceProducts = [];
            state.bestChoiceProducts = [];
            state.deliciousProducts = [];
            state.healthyBitesProducts = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Product List
            .addCase(fetchProductList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductList.fulfilled, (state, action) => {
                state.loading = false;
                state.productList = action.payload;
                state.popularProducts = action.payload.filter(item => item.is_manually_popular);
                state.bestPriceProducts = action.payload.filter(item => item.is_best_price);
                state.bestChoiceProducts = action.payload.filter(item => item.is_manually_best_choice);
                state.deliciousProducts = action.payload.filter(item => item.is_delicious);
                state.healthyBitesProducts = action.payload.filter(item => item.is_healthy_bites);
            })
            .addCase(fetchProductList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearProductList } = productSlice.actions;
export default productSlice.reducer;
