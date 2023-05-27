import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import authAxios from "../../utils/auth-axios";
import { setError } from "../../utils/error";
import { User } from "../../utils/interfaces";

interface ProductSliceState {
  users: User[];
  loading: boolean;
  error: null | object;
  pages: number;
  page: number;
}

const initialState: ProductSliceState = {
  users: [],
  pages: 1,
  page: 1,
  loading: false,
  error: null,
};

export const getUsersList = createAsyncThunk(
  "users/list",
  async (filter: any) => {
    try {
      const res = await authAxios.get(
        `/users?query=${filter.query}&page=${filter.page}`
      );
      if (res.data) {
        return res.data;
      }
    } catch (error: any) {
      const message = setError(error);
      toast.error(message);
    }
  }
);

export const userListSlice = createSlice({
  name: "user-list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    });
    builder.addCase(getUsersList.rejected, (state) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function

export default userListSlice;
