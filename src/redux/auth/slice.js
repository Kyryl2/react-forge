import { createSlice } from "@reduxjs/toolkit";
import {
  getBalance,
  userLoginThunk,
  userLogoutThunk,
  userRefreshThunk,
  userRegisterThunk,
} from "./operations";
import { postTransactionThunk } from "../transactions/operations";

const initialState = {
  user: {
    username: null,
    email: null,
    balance: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userRegisterThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(userLoginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(getBalance.fulfilled, (state, {payload}) => {
        state.user.balance = payload
      })
      .addCase(postTransactionThunk.fulfilled, (state, {payload}) => {
        state.user.balance = payload.balanceAfter
      })
      .addCase(userLogoutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(userRefreshThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(userRefreshThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(userRefreshThunk.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
