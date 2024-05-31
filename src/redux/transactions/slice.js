import { createSlice } from "@reduxjs/toolkit";
import { userLogoutThunk } from "../auth/operations";
import {
  deleteTransactionThunk,
  getCategoriesThunk,
  getSummaryThunk,
  getTransactionsThunk,
  patchTransactionThunk,
  postTransactionThunk,
} from "./operations";

const initialState = {
  transactions: {
    categories: [],
    transactions: [],
    summary: {},
  },
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.fulfilled, (state, { payload }) => {
        state.transactions.categories = payload;
      })
      .addCase(getSummaryThunk.fulfilled, (state, { payload }) => {
        state.transactions.summary = payload;
      })
      .addCase(getTransactionsThunk.fulfilled, (state, { payload }) => {
        state.transactions.transactions = payload;
      })
      .addCase(postTransactionThunk.fulfilled, (state, { payload }) => {
        state.transactions.transactions.push(payload);
      })
      .addCase(patchTransactionThunk.fulfilled, (state, { payload }) => {
        const index = state.transactions.transactions.findIndex(
          (transaction) => transaction.id === payload.id
        );
        state.transactions.transactions[index] = payload;
      })
      .addCase(deleteTransactionThunk.fulfilled, (state, { payload }) => {
        const index = state.transactions.transactions.findIndex(
          (transaction) => transaction.id === payload.id
        );
        state.transactions.transactions.splice(index, 1);
      })
      .addCase(userLogoutThunk.fulfilled, () => {
        return initialState;
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
