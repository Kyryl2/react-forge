import { createAsyncThunk } from "@reduxjs/toolkit";
import { goitApi, updateAuthHeader } from "../../config/goitApi";

export const userRegisterThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await goitApi.post("auth/sign-up", credentials);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userLoginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await goitApi.post("auth/sign-in", credentials);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userLogoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();

      updateAuthHeader(auth.token);

      const { data } = await goitApi.delete("auth/sign-out");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userRefreshThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();

      if (auth.token === null) {
        return thunkAPI.rejectWithValue("Unable to fetch user");
      }

      updateAuthHeader(auth.token);

      const { data } = await goitApi.get("users/current");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
