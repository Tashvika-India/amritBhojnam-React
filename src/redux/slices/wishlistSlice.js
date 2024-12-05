import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWishlist, postWishlist } from '../../services/adminApiRoutes';


export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getWishlist();
            const data = response?.data || [];
            return data.map((product) => ({ ...product, is_wishlist: true }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



export const updateWishlist = createAsyncThunk(
    'wishlist/updateWishlist',
    async ({ product_id, action }, { rejectWithValue }) => {
        try {
            await postWishlist({ product_id, action });
            return { product_id, action };
        } catch (error) {
            console.error('Error updating wishlist:', error);
            return rejectWithValue(error.message);
        }
    }
);


const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlist: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateWishlist.fulfilled, (state, action) => {
                const { product_id, action: is_wishlist } = action.payload;
                state.wishlist = state.wishlist.map((item) =>
                    item.id === product_id ? { ...item, is_wishlist } : item
                );
            });
    },
});

export default wishlistSlice.reducer;