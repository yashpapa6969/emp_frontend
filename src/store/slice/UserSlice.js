// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: JSON.parse(sessionStorage.getItem("userData")) || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      sessionStorage.setItem("userData", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.userData = null;
      sessionStorage.removeItem("userData");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user.userData;
export default userSlice.reducer;
