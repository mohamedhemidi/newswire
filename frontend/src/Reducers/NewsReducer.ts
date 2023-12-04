import { fetchNews } from "@Services/news.services";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  total: 0,
  data: [],
  next_page_url: "",
  per_page: 0,
  error: "",
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.total = payload.total;
        state.data = payload.data;
        state.next_page_url = payload.next_page_url;
        state.per_page = payload.per_page;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.loading = false;
        state.error = "An error has occured";
      });
  },
});

export default newsSlice.reducer;
