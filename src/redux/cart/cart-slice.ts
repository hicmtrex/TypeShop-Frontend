import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../components/product-card';
import { AddressTypes } from '../../utils/interfaces';

export interface CartSliceState {
  cartItems: Product[];
  shippingAddress: AddressTypes | null;
}

const initialState: CartSliceState = {
  cartItems: [],
  shippingAddress: null,
};

export const cartSlice = createSlice({
  name: 'cart-items',
  initialState: initialState,

  reducers: {
    addToCart: (state: CartSliceState, action: PayloadAction<Product>) => {
      const product = action.payload;
      const exist = state.cartItems.find(
        (item: any) => item._id == product._id
      );

      if (exist) {
        state.cartItems = state.cartItems.map((item: any) =>
          item._id == product._id ? { ...product, qty: item.qty + 1 } : item
        );
      } else {
        state.cartItems = [...state.cartItems, { ...product, qty: 1 }];
      }
    },
    removeFromCart: (state: CartSliceState, action: PayloadAction<Product>) => {
      const product = action.payload;
      const exist = state.cartItems.find(
        (item: any) => item._id == product._id
      );

      if (exist && exist.qty === 1) {
        state.cartItems = state.cartItems.filter(
          (item: any) => item._id !== product._id
        );
      } else {
        state.cartItems = state.cartItems.map((item: any) =>
          item._id == product._id ? { ...product, qty: item.qty - 1 } : item
        );
      }
    },
    saveAddress: (
      state: CartSliceState,
      action: PayloadAction<AddressTypes>
    ) => {
      state.shippingAddress = action.payload;
    },
    reset: (state: any) => {
      state.cartItems = [];
      state.shippingAddress = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, saveAddress, reset } =
  cartSlice.actions;

export default cartSlice;
