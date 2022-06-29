import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../components/product-card';
import publicAxios from '../../utils/public-axios';

export interface ProductSliceState {
  product: Product | null;
  loading: boolean;
  error: null | object;
}

const initialState: ProductSliceState = {
  product: null,
  loading: false,
  error: null,
};

export const getProductById = createAsyncThunk(
  'products/details',
  async (id: string | undefined) => {
    try {
      const res = await publicAxios.get(`/products/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (error) {}
  }
);

export const productDetailsSlice = createSlice({
  name: 'product-detail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductById.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(
      getProductById.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function

export default productDetailsSlice;
