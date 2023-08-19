import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken,
    isLoggedIn: !!initialToken,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = action.payload;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;