import { fetchCategories, fetchSources } from "@Services/settings.services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  data: {
    categories: [],
    sources: [],
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data.categories = payload.categories;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
        state.error = "An error has occured";
      })
      .addCase(fetchSources.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSources.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data.sources = payload.sources;

      })
      .addCase(fetchSources.rejected, (state) => {
        state.loading = false;
        state.error = "An error has occured";
      });
  },
});

export default settingsSlice.reducer;
