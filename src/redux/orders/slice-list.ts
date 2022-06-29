import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  CaseReducer,
  createEntityAdapter,
} from '@reduxjs/toolkit';
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
  totalPrice: number;
}

const initialState: OrderSliceState = {
  orders: [],
  loading: false,
  error: null,
  totalPrice: 0,
};

export const getOrdersList = createAsyncThunk('orders/list', async () => {
  try {
    const { data } = await authAxios.get('/orders');
    return data;
  } catch (error) {
    const message = setError(error);
    toast.error(message);
  }
});

const getOrderPrice = createEntityAdapter<OrderSliceState>({
  selectId: (state) =>
    state.orders.reduce((acc, order) => acc + order.totalPrice, 0),
});

export const orderListSlice = createSlice({
  name: 'orders-list',
  initialState,
  reducers: {
    ordersPrice: (state: OrderSliceState) => {
      state.totalPrice = state.orders.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersList.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(getOrdersList.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(getOrdersList.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { ordersPrice } = orderListSlice.actions;

export default orderListSlice;
