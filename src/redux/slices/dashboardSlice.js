import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "../../services/dashboardService";

export const fetchAdminDashboard = createAsyncThunk(
  "dashboard/fetchAdmin",
  async (_, thunkAPI) => {
    try {
      return await dashboardService.getAdminDashboard();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      });
  },
});

export default dashboardSlice.reducer;
