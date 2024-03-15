import { createSlice } from "@reduxjs/toolkit";

export const leadSlice = createSlice({
  name: "lead",
  initialState: {
    leadId: null,
  },
  reducers: {
    setLeadId: (state, action) => {
      state.leadId = action.payload;
    },
    clearLeadId: (state) => {
      state.leadId = null;
    },
  },
});

export const { setLeadId, clearLeadId } = leadSlice.actions;
export const selectLeadId = (state) => state.lead.leadId;

export default leadSlice.reducer;
