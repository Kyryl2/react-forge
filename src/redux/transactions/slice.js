import { createSlice } from "@reduxjs/toolkit";
import { getCategoriesThunk, getSummaryThunk } from "./operations";

const initialState = {
  categories: [],
  transactions: [],
  transactionsSummary: {},
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.fulfilled, (state, { payload }) => {
        state.categories = payload;
      })
      .addCase(getSummaryThunk.fulfilled, (state, { payload }) => {
        state.transactionsSummary = payload;
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
