import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  categories: "",
  sources: "",
};

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.keyword = action.payload.keyword;
      state.categories = action.payload.categories;
      state.sources = action.payload.sources;
    },
  },
});

export const { setSearch } = SearchSlice.actions;
export default SearchSlice.reducer;
