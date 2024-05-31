import { createSlice, isAnyOf } from "@reduxjs/toolkit";
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
  isLoading: false,
  setError: null,
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
      .addMatcher(
        isAnyOf(
          getCategoriesThunk.pending,
          getSummaryThunk.pending,
          getTransactionsThunk.pending,
          postTransactionThunk.pending,
          patchTransactionThunk.pending,
          deleteTransactionThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.setError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getCategoriesThunk.fulfilled,
          getSummaryThunk.fulfilled,
          getTransactionsThunk.fulfilled,
          postTransactionThunk.fulfilled,
          patchTransactionThunk.fulfilled,
          deleteTransactionThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getCategoriesThunk.rejected,
          getSummaryThunk.rejected,
          getTransactionsThunk.rejected,
          postTransactionThunk.rejected,
          patchTransactionThunk.rejected,
          deleteTransactionThunk.rejected
        ),
        (state, { action }) => {
          state.isLoading = false;
          state.setError = action;
        }
      );
  },
});

export const transactionsReducer = transactionsSlice.reducer;
