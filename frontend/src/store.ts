import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import themeReducer from "@Reducers/UIReducer";
import newsReducer from "@Reducers/NewsReducer";

export const store = configureStore({
  reducer: {
    UI: themeReducer,
    news: newsReducer,
  },
  middleware: [thunkMiddleware],
});
