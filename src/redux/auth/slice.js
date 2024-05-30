import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  userLoginThunk,
  userLogoutThunk,
  userRefreshThunk,
  userRegisterThunk,
} from "./operations";

const initialState = {
  user: {
    username: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isError: false,
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
      .addCase(userLogoutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(userRefreshThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
      })
      .addCase(userRefreshThunk.rejected, (state) => {
        state.isRefreshing = false;
        state.isError = true;
      })
      .addMatcher(
        isAnyOf(
          userRegisterThunk.pending,
          userLoginThunk.pending,
          userLogoutThunk.pending,
          userRefreshThunk.pending
        ),
        (state) => {
          state.isRefreshing = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          userRegisterThunk.fulfilled,
          userLoginThunk.fulfilled,
          userLogoutThunk.fulfilled,
          userRefreshThunk.fulfilled
        ),
        (state) => {
          state.isRefreshing = false;
        }
      )
      .addMatcher(
        isAnyOf(
          userRegisterThunk.rejected,
          userLoginThunk.rejected,
          userLogoutThunk.rejected
        ),
        (state) => {
          state.isRefreshing = false;
          state.isError = true;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
