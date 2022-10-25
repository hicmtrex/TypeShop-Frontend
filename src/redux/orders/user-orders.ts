import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { Product } from '../../components/product-card';
import authAxios from '../../utils/auth-axios';
import { setError } from '../../utils/error';

type Ordertypes = {
  _id: string;
  user: string;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  cartItems: Product[];
  totalPrice: number;
  isPaid: boolean;
  createdAt: Date;
};

export interface OrderSliceState {
  orders: Ordertypes[];
  loading: boolean;
  error: null | object;
}

const initialState: OrderSliceState = {
  orders: [],
  loading: false,
  error: null,
};

export const getUserOrder = createAsyncThunk('users/orders', async () => {
  try {
    const { data } = await authAxios.get('/orders/orders-user');
    return data;
  } catch (error: any) {
    const message = setError(error);
    toast.error(message);
  }
});

export const userOrderSlice = createSlice({
  name: 'user-orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserOrder.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(getUserOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(getUserOrder.rejected, (state) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function

export default userOrderSlice;
