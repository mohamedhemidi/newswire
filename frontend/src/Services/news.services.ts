import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PATH } from "constants/environments";

type Props = {
  query: unknown;
  page?: number;
  credentials?: string | null;
};

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ query = {}, page = 1, credentials }: Props) => {
    try {
      const response = await axios.post(
        `${PATH.fetchNews}?page=${page}`,
        query,
        {
          headers: {
            Authorization: `Bearer ${credentials}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchArticle = createAsyncThunk(
  "news/fetchArticle",
  async (id: unknown) => {
    try {
      const response = await axios.get(`${PATH.fetchArticle}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
