import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PATH } from "@Constants/environements";

type Props = {
  query: unknown;
  page?: number;
  credentials?: string | null
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
      return response.data.data[0];
    } catch (error) {
      console.log(error);
    }
  }
);
