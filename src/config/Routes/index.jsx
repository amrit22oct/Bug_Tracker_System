import {
  SimplePage,
  Login,
  BugPage,
  ProjectsPage,
  ReportsPage,
  Settings,
  RoleBasedDashboard,
} from "@/components/pages";

import AddBug from "@/components/organisms/AddBug";
import AddProject from "@/components/organisms/AddProject";
import BugDetail from "@/components/organisms/BugDetail";
import ProjectDetail from "@/components/organisms/ProjectDetails";
import { BugReportPage } from "../../components/pages";
import BugReportDetail from "../../components/organisms/BugReportDetail";
import Users from "../../components/pages/UserMangement";
import AddBugReport from "../../components/organisms/AddBugReport";

export const routes = [
  // ---------------- DASHBOARD ----------------
  {
    id: "Dashboard",
    path: "/",
    component: <RoleBasedDashboard />,
    protectedRoute: true,
    allowedRoles: ["Admin", "ProjectManager", "TeamLeader", "Developer", "QA"],
  },

  // ---------------- SIMPLE PAGE ----------------
  {
    id: "SimplePage",
    path: "/simple",
    component: <SimplePage />,
    protectedRoute: true,
    allowedRoles: ["Admin", "ProjectManager", "TeamLeader"],
  },

  // ---------------- BUGS ----------------
  {
    id: "Bugs",
    path: "/bugs",
    component: <BugPage />,
    protectedRoute: true,
    allowedRoles: ["Developer", "QA", "TeamLeader", "ProjectManager", "Admin"],
  },
  {
    id: "BugDetail",
    path: "/view-bug-detail/:id",
    component: <BugDetail />,
    protectedRoute: true,
    allowedRoles: ["Developer", "QA", "TeamLeader", "ProjectManager", "Admin"],
  },
  {
    id: "BugReport",
    path: "/bug-report",
    component: <BugReportPage />,
    protectedRoute: true,
    allowedRoles: ["Developer", "QA", "TeamLeader", "ProjectManager", "Admin"],
  },
  {
    id: "BugReportDetail",
    path: "/view-report-detail/:id",
    component: <BugReportDetail />,
    protectedRoute: true,
    allowedRoles: ["Developer", "QA", "TeamLeader", "ProjectManager", "Admin"],
  },
  {
    id: "AddBug",
    path: "/add-bug",
    component: <AddBug />,
    protectedRoute: true,
    allowedRoles: ["QA", "TeamLeader", "ProjectManager", "Admin"],
  },

  // ---------------- PROJECTS ----------------
  {
    id: "Projects",
    path: "/projects",
    component: <ProjectsPage />,
    protectedRoute: true,
    allowedRoles: ["TeamLeader", "ProjectManager", "Admin"],
  },
  {
    id: "ProjectDetail",
    path: "/view-project-detail/:id",
    component: <ProjectDetail />,
    protectedRoute: true,
    allowedRoles: ["TeamLeader", "ProjectManager", "Admin"],
  },
  {
    id: "AddProject",
    path: "/add-project",
    component: <AddProject />,
    protectedRoute: true,
    allowedRoles: ["Admin"],
  },

  // ---------------- REPORTS ----------------
  {
    id: "Reports",
    path: "/reports",
    component: <ReportsPage />,
    protectedRoute: true,
    allowedRoles: ["TeamLeader", "ProjectManager", "Admin"],
  },
  {
    id: "AddReports",
    path: "/add-bug-report",
    component: <AddBugReport />,
    protectedRoute: true,
    allowedRoles: ["TeamLeader", "ProjectManager", "Admin"],
  },

  // ---------------- USER MANAGEMENT ----------------
  {
    id: "UserManagement",
    path: "/user-mangement",
    component: <Users />,
    protectedRoute: true,
    allowedRoles: ["ProjectManager", "Admin"],
  },

  // ---------------- SETTINGS ----------------
  {
    id: "Settings",
    path: "/settings",
    component: <Settings />,
    protectedRoute: true,
    allowedRoles: ["Admin"],
  },

  // ---------------- AUTH ----------------
  {
    id: "Login",
    path: "/login",
    component: <Login />,
    protectedRoute: false,
    hideSidebar: true,
  },
];

