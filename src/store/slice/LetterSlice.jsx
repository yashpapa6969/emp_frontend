import { createSlice } from "@reduxjs/toolkit";

export const letterSlice = createSlice({
  name: "letter",
  initialState: {
    letterId: null,
  },
  reducers: {
    setLetterId: (state, action) => {
      state.letterId = action.payload;
    },
    clearLetterId: (state) => {
      state.letterId = null;
    },
  },
});

export const { setLetterId, clearLetterId } = letterSlice.actions;
export const selectLetterId= (state) => state.letter.letterId;

export default letterSlice.reducer;
