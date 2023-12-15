import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PATH } from "constants/environments";

type Props = {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
};

export const userLogin = createAsyncThunk(
  "users/userLogin",
  async (credentials: Props) => {
    const response = await axios.post(PATH.userLogin, credentials);
    return response.data;
  }
);
export const userSignup = createAsyncThunk(
  "users/userSignup",
  async (credentials: Props) => {
    const response = await axios.post(PATH.userSignup, credentials);
    return response.data;
  }
);

export const userProfile = createAsyncThunk(
  "users/userProfile",
  async (credentials: string | null) => {
    const response = await axios.get(PATH.userProfile, {
      headers: {
        Authorization: `Bearer ${credentials}`,
      },
    });
    return response.data;
  }
);
