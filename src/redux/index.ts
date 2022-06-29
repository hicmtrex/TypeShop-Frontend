import { configureStore, combineReducers, compose } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cartSlice from './cart/cart-slice';
import { productListSlice } from './products/slice-list';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import orderListSlice from './orders/slice-list';
import productDetailsSlice from './products/slice-details';
import loginSlice from './users/login-slice';
import { authorizationProvider } from '../utils/auth-axios';
import userDetailsSlice from './users/user-details';
import userListSlice from './users/user-list';
import userOrderSlice from './orders/user-orders';
import orderDetailSlice from './orders/order-details';
import productFilterSlice from './products/search-list';

const reducers = combineReducers({
  productList: productListSlice.reducer,
  cart: cartSlice.reducer,
  productDetail: productDetailsSlice.reducer,
  productFilter: productFilterSlice.reducer,
  //auth
  login: loginSlice.reducer,
  userDetails: userDetailsSlice.reducer,
  userList: userListSlice.reducer,
  //orders
  orders: orderListSlice.reducer,
  userOrder: userOrderSlice.reducer,
  orderDetail: orderDetailSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

authorizationProvider(store);
