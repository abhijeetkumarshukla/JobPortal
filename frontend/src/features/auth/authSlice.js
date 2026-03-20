import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI, registerUserAPI } from "./authAPI";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data) => {
    return await loginUserAPI(data);
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data) => {
    return await registerUserAPI(data);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user"); // ✅ FIX
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {

    builder.addCase(loginUser.fulfilled, (state, action) => {

      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("token", action.payload.token);

      // ✅ IMPORTANT FIX
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      // optional (not needed if using user)
      localStorage.setItem("role", action.payload.user.role);

    });

    builder.addCase(registerUser.fulfilled, (state) => {
      // optional
    });

  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;