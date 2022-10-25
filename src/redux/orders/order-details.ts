import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import authAxios from '../../utils/auth-axios';
import { setError } from '../../utils/error';
import { Ordertypes } from '../../utils/interfaces';

export interface OrderSliceState {
  order: Ordertypes | null;
  loading: boolean;
  error: null | object;
}

const initialState: OrderSliceState = {
  order: null,
  loading: false,
  error: null,
};

export const getOrderById = createAsyncThunk(
  'orders/:id',
  async (id?: string) => {
    try {
      const { data } = await authAxios.get(`/orders/${id}`);
      return data;
    } catch (error: any) {
      const message = setError(error);
      toast.error(message);
    }
  }
);

export const orderDetailSlice = createSlice({
  name: 'orders-detail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(getOrderById.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default orderDetailSlice;
