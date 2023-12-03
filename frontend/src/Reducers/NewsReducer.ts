import { fetchNews } from "@Services/news.services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {

  },
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        console.log("FROM ERDUCED",state)
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        console.log(action)
      })
      .addCase(fetchNews.rejected, (state, action) => {
      })
    
  },
});

export default newsSlice.reducer;
