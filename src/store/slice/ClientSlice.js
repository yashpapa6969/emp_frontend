import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    clientIds: [],
  },
  reducers: {
    addClientId: (state, action) => {
      state.clientIds.push(action.payload);
    },
    clearClientIds: (state) => {
      state.clientIds = [];
    },
  },
});

export const { addClientId, clearClientIds } = clientSlice.actions;
export const selectClientIds = (state) => state.client.clientIds;

export default clientSlice.reducer;
