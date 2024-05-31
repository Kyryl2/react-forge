import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  setError: null,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(
        ({ type }) => type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.setError = null;
        }
      )
      .addMatcher(
        ({ type }) => type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        ({ type }) => type.endsWith("/rejected"),
        (state, { error }) => {
          state.isLoading = false;
          state.setError = error.message;
        }
      );
  },
});

export const statusReducer = statusSlice.reducer;
