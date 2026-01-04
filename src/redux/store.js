import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import bugReducer from "./slices/bugSlice.js";
// import bugReportReducer from "./slices/bugReportSlice";
// import dashboardReducer from "./slices/dashboardSlice";
// import projectReducer from "./slices/projectSlice";
// import teamReducer from "./slices/teamSlice";
// import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bugs: bugReducer,
   //  bugReports: bugReportReducer,
   //  dashboard: dashboardReducer,
   //  projects: projectReducer,
   //  teams: teamReducer,
   //  users: userReducer,
  },
});
