import { combineReducers } from "redux";
import authSlice from "./slice/authSlice";
import userSlice from "./slice/UserSlice";
import employeeSlice from "./slice/EmployeeSlice";
import clientSlice from "./slice/ClientSlice";
import projectSlice from "./slice/ProjectSlice";
import leadSlice from "./slice/LeadSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  employee: employeeSlice,
  client: clientSlice,
  project: projectSlice,
  lead: leadSlice, 
});

export default rootReducer;
