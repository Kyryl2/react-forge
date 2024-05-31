export const selectCategories = (state) =>
  state.transactions.transactions.categories;
export const selectTransactions = (state) =>
  state.transactions.transactions.transactions;
export const selectSummary = (state) =>
  state.transactions.transactions.transactionsSummary;
export const selectIsLoading = (state) => state.transactions.isLoading;
export const selectSetError = (state) => state.transactions.setError;
