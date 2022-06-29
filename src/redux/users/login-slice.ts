import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { setError } from '../../utils/error';
import publicAxios from '../../utils/public-axios';

type User = {
  email: string;
  password: string;
};

type UserInfo = {
  _id: string;
  email: string;
  name: string;
  isAdmin: Boolean;
  createdAt: Date;
};

export interface UserSliceState {
  userInfo?: UserInfo | null;
  loading: boolean;
  error: null | object;
}

const initialState: UserSliceState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const userLogin = createAsyncThunk(
  'users/login',
  async (user: User, thunkAPI) => {
    try {
      const res = await publicAxios.post('/users/login', user);
      if (res.data) {
        toast.success(`Bienvenue 👏 ${res.data.name}`);
        return res.data;
      }
    } catch (error) {
      const message = setError(error);
      toast.error(message);
      thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginSlice = createSlice({
  name: 'auth-login',
  initialState,
  reducers: {
    userLogout: (state: UserSliceState) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { userLogout } = loginSlice.actions;

export default loginSlice;
