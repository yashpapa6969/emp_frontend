import { combineReducers } from "redux";
import authSlice from "./slice/authSlice";
import userSlice from "./slice/UserSlice";
import employeeSlice from "./slice/EmployeeSlice";
import clientSlice from "./slice/ClientSlice";
import projectSlice from "./slice/ProjectSlice";
import leadSlice from "./slice/LeadSlice";
import leaveSlice from "./slice/LeaveSlice"; // Import the leaveSlice

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  employee: employeeSlice,
  client: clientSlice,
  project: projectSlice,
  lead: leadSlice,
  leave: leaveSlice, // Include the leaveSlice in the root reducer
});

export default rootReducer;
