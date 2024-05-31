import { createAsyncThunk } from "@reduxjs/toolkit";
import { goitApi, updateAuthHeader } from "../../config/goitApi";

export const getCategoriesThunk = createAsyncThunk(
  "transaction/getCategories",
  async (_, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();

      updateAuthHeader(auth.token);

      const { data } = await goitApi.get("transaction-categories");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSummaryThunk = createAsyncThunk(
  "transaction/getSummary",
  async (_, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();

      updateAuthHeader(auth.token);

      const { data } = await goitApi.get("transactions-summary");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
