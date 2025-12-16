// Import all pages from your centralized pages export
import {
  Dashboard,
  SimplePage,
  Login,
  BugPage,
  ProjectsPage,
  ReportsPage,
  Settings,
} from "@/components/pages";

export const routes = [
  {
    id: "Dashboard",
    path: "/",
    component: <Dashboard />,
    protectedRoute: true,
  },
  {
    id: "SimplePage",
    path: "/simple",
    component: <SimplePage />,
    protectedRoute: true,
  },
  {
    id: "Bugs",
    path: "/bugs",
    component: <BugPage />,
    protectedRoute: true,
  },
  {
    id: "Projects",
    path: "/projects",
    component: <ProjectsPage />,
    protectedRoute: true,
  },
  {
    id: "Reports",
    path: "/reports",
    component: <ReportsPage />,
    protectedRoute: true,
  },
  {
    id: "Settings",
    path: "/settings",
    component: <Settings />,
    protectedRoute: true,
  },  
  {
    id: "Login",
    path: "/login",
    component: <Login />,
    protectedRoute: false,
  },
];
