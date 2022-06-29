import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import authAxios from '../../utils/auth-axios';
import { setError } from '../../utils/error';
import { User } from '../../utils/interfaces';

interface ProductSliceState {
  users: User[];
  loading: boolean;
  error: null | object;
}

const initialState: ProductSliceState = {
  users: [],
  loading: false,
  error: null,
};

export const getUsersList = createAsyncThunk('users/list', async () => {
  try {
    const res = await authAxios.get('/users');
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    const message = setError(error);
    toast.error(message);
  }
});

export const userListSlice = createSlice({
  name: 'user-list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsersList.rejected, (state) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function

export default userListSlice;
