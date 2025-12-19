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
import BugReportDetail from "../../components/BugReportDetail";

export const routes = [
  // ---------------- DASHBOARD ----------------
  {
    id: "Dashboard",
    path: "/",
    component: <RoleBasedDashboard />,
    protectedRoute: true,
    allowedRoles: ["Admin", "ProjectManager", "Developer", "QA"],
  },
  

  // ---------------- SIMPLE PAGE ----------------
  {
    id: "SimplePage",
    path: "/simple",
    component: <SimplePage />,
    protectedRoute: true,
    allowedRoles: ["Admin", "ProjectManager"],
  },

  // ---------------- BUGS ----------------
  {
    id: "Bugs",
    path: "/bugs",
    component: <BugPage />,
    protectedRoute: true,
    allowedRoles: ["Developer", "QA", "ProjectManager", "Admin"],
  },
  {
    id: "BugDetail",
    path: "/view-bug-detail/:id",
    component: <BugDetail />,
    protectedRoute: true,
    allowedRoles: ["Developer", "QA", "ProjectManager", "Admin"],
  },
  {
    id: "BugReport",
    path: "/bug-report",
    component: <BugReportPage />,
    protectedRoute: true,
    allowedRoles: ["Developer", "QA", "ProjectManager", "Admin"],
  },
  {
    id: "BugDetail",
    path: "/view-report-detail/:id",
    component: <BugReportDetail />,
    protectedRoute: true,
    allowedRoles: ["Developer", "QA", "ProjectManager", "Admin"],
  },
  {
    id: "AddBug",
    path: "/add-bug",
    component: <AddBug />,
    protectedRoute: true,
    allowedRoles: ["QA", "ProjectManager", "Admin"],
  },

  // ---------------- PROJECTS ----------------
  {
    id: "Projects",
    path: "/projects",
    component: <ProjectsPage />,
    protectedRoute: true,
    allowedRoles: ["ProjectManager", "Admin"],
  },
  {
    id: "ProjectDetail",
    path: "/view-project-detail/:id",
    component: <ProjectDetail />,
    protectedRoute: true,
    allowedRoles: ["ProjectManager", "Admin"],
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
