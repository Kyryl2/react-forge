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
  isLoading: false,
  setError: null,
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

      .addMatcher(
        isAnyOf(
          userRegisterThunk.pending,
          userLoginThunk.pending,
          userLogoutThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.setError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          userRegisterThunk.fulfilled,
          userLoginThunk.fulfilled,
          userLogoutThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          userRegisterThunk.rejected,
          userLoginThunk.rejected,
          userLogoutThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.setError = payload;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
