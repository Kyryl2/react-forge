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
  
    categories: [],
    transactions: [],
    summary: {},
  
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
        state.summary = payload;
      })
      .addCase(getTransactionsThunk.fulfilled, (state, { payload }) => {
        state.transactions = payload;
      })
      .addCase(postTransactionThunk.fulfilled, (state, { payload }) => {
        state.transactions.push(payload);
        
      })
      .addCase(patchTransactionThunk.fulfilled, (state, { payload }) => {
        const index = state.transactions.findIndex(
          (transaction) => transaction.id === payload.id
        );
        state.transactions[index] = payload;
      })
      .addCase(deleteTransactionThunk.fulfilled, (state, { payload }) => {
        const index = state.transactions.findIndex(
          (transaction) => transaction.id === payload
        );
        state.transactions.splice(index, 1);
      })
      .addCase(userLogoutThunk.fulfilled, () => {
        return initialState;
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
export const selectCategories = (state) =>
  state.transactions.categories;
export const selectTransactions = (state) =>
  state.transactions.transactions;
export const selectSummary = (state) => state.transactions.summary;
