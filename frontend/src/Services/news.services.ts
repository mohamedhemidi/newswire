import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PATH } from "@Constants/environements";

type Props = {
  query: unknown;
  page: number;
};

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ query, page }: Props) => {
    try {
      const response = await axios.post(
        `${PATH.fetchNews}?page=${page}`,
        query
      );
      return response.data.data[0];
    } catch (error) {
      console.log(error);
    }
  }
);
