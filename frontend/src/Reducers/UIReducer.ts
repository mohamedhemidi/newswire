import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  search_modal: false,
};

const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    openSearchModal: (state) => {
      state.search_modal = true;
    },
    closeSearchModal: (state) => {
      state.search_modal = false;
    },
  },
});

export const { toggleTheme, openSearchModal,closeSearchModal } = UISlice.actions;
export default UISlice.reducer;
