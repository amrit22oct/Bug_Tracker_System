import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bugReportService from "../../services/bugReportService";

export const fetchBugReports = createAsyncThunk(
  "bugReports/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await bugReportService.getAllReports();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const bugReportSlice = createSlice({
  name: "bugReports",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBugReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBugReports.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      });
  },
});

export default bugReportSlice.reducer;
