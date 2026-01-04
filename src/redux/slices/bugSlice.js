import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bugService from "../../services/api/bug.service.js";

export const fetchAllBugs = createAsyncThunk(
  "bugs/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await bugService.getAllBugs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const createBug = createAsyncThunk(
  "bugs/create",
  async (data, thunkAPI) => {
    try {
      return await bugService.createBug(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const bugSlice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBugs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBugs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data || [];
      })
      .addCase(fetchAllBugs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBug.fulfilled, (state, action) => {
        state.list.unshift(action.payload.data);
      });
  },
});

export default bugSlice.reducer;
