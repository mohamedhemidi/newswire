import { userLogin, userProfile, userSignup } from "services/users.services";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  user: "",
  token: "",
  error: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.data.token;
        localStorage.setItem("token", payload.data.token);
      })
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
        state.error = "An error has occured";
      })
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userSignup.rejected, (state) => {
        state.loading = false;
        state.error = "An error has occured";
      })
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(userProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(userProfile.rejected, (state) => {
        state.loading = false;
        state.error = "An error has occured";
      });
  },
});

export default userSlice.reducer;
