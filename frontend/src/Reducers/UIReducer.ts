import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  sidebar_collapsed: true,
};

const UISlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    toggleSidebar: (state) => {
      state.sidebar_collapsed = !state.sidebar_collapsed;
    },
  },
});

export const { toggleTheme, toggleSidebar } = UISlice.actions;
export default UISlice.reducer;
