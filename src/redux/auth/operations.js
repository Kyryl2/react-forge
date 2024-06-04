import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  clearAuthHeader,
  goitApi,
  updateAuthHeader,
} from "../../config/goitApi";

export const userRegisterThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await goitApi.post("auth/sign-up", credentials);
      updateAuthHeader(data.token);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const userLoginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await goitApi.post("auth/sign-in", credentials);
      updateAuthHeader(data.token);

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
      await goitApi.delete("auth/sign-out");
      clearAuthHeader();
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
export const getBalance = createAsyncThunk(
  "auth/getBalance",
  async (_, thunkAPI) => {
    try {

 


      const { data } = await goitApi.get("users/current");

      return data.balance;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
