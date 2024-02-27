import { combineReducers } from "redux";
import authSlice from "./slice/authSlice";
import userSlice from "./slice/UserSlice";
import employeeSlice from "./slice/EmployeeSlice";
import clientSlice from "./slice/ClientSlice"; 

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  employee: employeeSlice,
  client: clientSlice, 
});

export default rootReducer;
