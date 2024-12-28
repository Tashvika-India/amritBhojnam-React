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

// Async thunk to fetch popular products
export const fetchPopularProducts = createAsyncThunk(
    "product/fetchPopularProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getPopularProducts();
            return response?.data?.results || [];
        } catch (error) {
            console.error("Error fetching popular products:", error);
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk to fetch best price products
export const fetchBestPriceProducts = createAsyncThunk(
    "product/fetchBestPriceProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getBestPriceApi();
            return Array.isArray(response?.data) ? response.data : [];
        } catch (error) {
            console.error("Error fetching best price products:", error);
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
        loading: false,
        error: null,
    },
    reducers: {
        clearProductList: (state) => {
            state.productList = [];
            state.popularProducts = [];
            state.bestPriceProducts = [];
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
            })
            .addCase(fetchProductList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Popular Products
            .addCase(fetchPopularProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPopularProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.popularProducts = action.payload;
            })
            .addCase(fetchPopularProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Best Price Products
            .addCase(fetchBestPriceProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBestPriceProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.bestPriceProducts = action.payload;
            })
            .addCase(fetchBestPriceProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearProductList } = productSlice.actions;
export default productSlice.reducer;
