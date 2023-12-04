import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PATH } from "@Constants/environements";

type Props = {
  credentials: string | null;
  data: {
    categories: string[];
    sources: string[];
  };
};

export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async ({ data, credentials }: Props) => {
    const response = await axios.post(PATH.updateSettings, data, {
      headers: {
        Authorization: `Bearer ${credentials}`,
      },
    });
    return response.data;
  }
);
export const fetchCategories = createAsyncThunk(
  "settings/fetchCategories",
  async () => {
    const response = await axios.get(PATH.fetchCategories);
    return response.data;
  }
);
export const fetchSources = createAsyncThunk(
  "settings/fetchSources",
  async () => {
    const response = await axios.get(PATH.fetchSources);
    return response.data;
  }
);
