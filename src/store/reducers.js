
import { combineReducers } from "redux";
import authSlice from "./slice/authSlice";
import userSlice from "./slice/UserSlice" 

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice, 
});

export default rootReducer;
