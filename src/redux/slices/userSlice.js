import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/userService";

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async () => await userService.getAllUsers()
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.list = action.payload.data;
    });
  },
});

export default userSlice.reducer;
