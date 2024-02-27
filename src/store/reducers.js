import { combineReducers } from "redux";
import authSlice from "./slice/authSlice";
import userSlice from "./slice/UserSlice";
import employeeSlice from "./slice/EmployeeSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  employee: employeeSlice,
});

export default rootReducer;
