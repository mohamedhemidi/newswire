import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PATH } from "@Constants/environements";

export const fetchNews = createAsyncThunk("news/fetchNews", async (query) => {
  const response = await axios.post(PATH.fetchNews, query);
  return response.data;
});
