import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    clientId: null,
  },
  reducers: {
    setClientId: (state, action) => {
      state.clientId = action.payload;
    },
    clearClientId: (state) => {
      state.clientId = null;
    },
  },
});

export const { setClientId, clearClientId } = clientSlice.actions;
export const selectClientId = (state) => state.client.clientId;

export default clientSlice.reducer;
