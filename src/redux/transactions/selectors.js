export const selectCategories = (state) =>
  state.transactions.transactions.categories;
export const selectTransactions = (state) =>
  state.transactions.transactions.transactions;
export const selectSummary = (state) => state.transactions.transactions.summary;