import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || null,
};

// Define the asynchronous thunk for updating the password
export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async ({ employee_id, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://185.199.53.202:3000/api/admin/updatePassword', {
        employee_id,
        newPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.userData = null;
      localStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePassword.fulfilled, (state, action) => {
        // Handle successful password update if needed
      })
      .addCase(updatePassword.rejected, (state, action) => {
        // Handle error
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user.userData;

export default userSlice.reducer;
