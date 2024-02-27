import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employeeIds: [],
  },
  reducers: {
    addEmployeeId: (state, action) => {
      state.employeeIds.push(action.payload);
    },
    clearEmployeeIds: (state) => {
      state.employeeIds = [];
    },
  },
});

export const { addEmployeeId,clearEmployeeIds } = employeeSlice.actions;
export const selectEmployeeIds = (state) => state.employee.employeeIds;

export default employeeSlice.reducer;
