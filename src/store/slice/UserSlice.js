// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state) => state.user && state.user.user;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], 
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export default persistedReducer;
