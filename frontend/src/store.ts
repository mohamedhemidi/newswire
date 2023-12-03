import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import themeReducer from "./Reducers/UIReducer";

export const store = configureStore({
  reducer: {
    UI: themeReducer,
  },
  middleware: [thunkMiddleware],
});
