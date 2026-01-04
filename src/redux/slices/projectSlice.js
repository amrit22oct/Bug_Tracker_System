import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "../../services/projectService";

export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async () => await projectService.getAllProjects()
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      });
  },
});

export default projectSlice.reducer;
