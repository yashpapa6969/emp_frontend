// ProjectSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    projectId: null,
  },
  reducers: {
    setProjectId: (state, action) => {
      state.projectId = action.payload;
    },
    clearProjectId: (state) => {
      state.projectId = null;
    },
  },
});

export const { setProjectId, clearProjectId } = projectSlice.actions;
export const selectProjectId = (state) => state.project.projectId;

export default projectSlice.reducer;
