import { createSlice } from "@reduxjs/toolkit";

export const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    leaveId: null,
  },
  reducers: {
    setLeaveId: (state, action) => {
      state.leaveId = action.payload;
    },
    clearLeaveId: (state) => {
      state.leaveId = null;
    },
  },
});

export const { setLeaveId, clearLeaveId } = leaveSlice.actions;
export const selectLeaveId = (state) => state.leave.leaveId;

export default leaveSlice.reducer;
