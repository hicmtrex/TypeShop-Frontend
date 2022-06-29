import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../utils/interfaces';
import publicAxios from '../../utils/public-axios';

interface ProductSliceState {
  user: User | null;
  loading: boolean;
  error: null | object;
}

const initialState: ProductSliceState = {
  user: null,
  loading: false,
  error: null,
};

export const getUserBydId = createAsyncThunk(
  'users/:id',
  async (id: string | undefined) => {
    try {
      const res = await publicAxios.get(`/users/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (error) {}
  }
);

export const userDetailsSlice = createSlice({
  name: 'user-detail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserBydId.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(getUserBydId.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getUserBydId.rejected, (state) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function

export default userDetailsSlice;
