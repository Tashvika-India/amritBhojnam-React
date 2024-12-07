import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import { getCartApi, getFinalCartApi, postCartApi } from "../../services/adminApiRoutes";

const initialState = {
  cartItems: [],
  finalCart: null,
  loading: false,
  updating: false,
  error: null,
};

// Thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const response = await getCartApi();
    return response.data?.items || {};
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchFinalCart = createAsyncThunk(
  "cart/fetchFinalCart",
  async (cartId, { rejectWithValue }) => {
    try {
      const response = await getFinalCartApi(cartId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postCartApi(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchCart
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // fetchFinalCart
    builder.addCase(fetchFinalCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFinalCart.fulfilled, (state, action) => {
      state.loading = false;
      state.finalCart = action.payload;
    });
    builder.addCase(fetchFinalCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // updateCart
    builder.addCase(updateCart.pending, (state) => {
      state.updating = true;
      state.error = null;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.updating = false;
      const updatedItem = action.payload;
      state.cartItems = state.cartItems?.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
    });
    builder.addCase(updateCart.rejected, (state, action) => {
      state.updating = false;
      state.error = action.payload;
    });
  },
});

export default cartSlice.reducer;
