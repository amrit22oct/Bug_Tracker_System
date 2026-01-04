import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import teamService from "../../services/teamService";

export const fetchTeams = createAsyncThunk(
  "teams/fetchAll",
  async () => await teamService.getAllTeams()
);

const teamSlice = createSlice({
  name: "teams",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.list = action.payload.data;
    });
  },
});

export default teamSlice.reducer;
