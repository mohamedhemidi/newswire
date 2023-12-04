import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import themeReducer from "@Reducers/UIReducer";
import newsReducer from "@Reducers/NewsReducer";
import userReducer from "@Reducers/UserReducer";

export const store = configureStore({
  reducer: {
    UI: themeReducer,
    news: newsReducer,
    users: userReducer,
  },
  middleware: [thunkMiddleware],
});
