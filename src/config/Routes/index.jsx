// Centralized route configuration for Bug Tracker system
// Roles: Admin | ProjectManager | Developer | QA

import {
  Dashboard,
  SimplePage,
  Login,
  BugPage,
  ProjectsPage,
  ReportsPage,
  Settings,
} from "@/components/pages";

import AddBug from "@/components/organisms/AddBug";
import AddProject from "@/components/organisms/AddProject";
import BugDetail from "@/components/organisms/BugDetail";
import ProjectDetail from "@/components/organisms/ProjectDetails";

export const routes = [
  // ---------------- DASHBOARD ----------------
  {
    id: "Dashboard",
    path: "/",
    component: <Dashboard />,
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
    id: "Bug-Detail",
    path: "/view-bug-detail/:id",
    component: <BugDetail />,
    protectedRoute: true,
    allowedRoles: ["Developer", "QA", "ProjectManager", "Admin"],
  },
  {
    id: "Add Bug",
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
    id: "Project-Detail",
    path: "/view-project-detail/:id",
    component: <ProjectDetail />,
    protectedRoute: true,
    allowedRoles: ["ProjectManager", "Admin"],
  },
  {
    id: "Add Project",
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