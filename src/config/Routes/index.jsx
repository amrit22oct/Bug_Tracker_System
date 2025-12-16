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
import AddBug from "../../components/organisms/AddBug";
import AddProject from "../../components/organisms/AddProject";
import BugDetail from "../../components/organisms/BugDetail";
import ProjectDetail from "../../components/organisms/ProjectDetails";

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
    id: "Bug-Detail",
    path: "/view-bug-detail/:id",
    component: <BugDetail />,
    protectedRoute: true,
  }, 
  {
    id: "Projects",
    path: "/projects",
    component: <ProjectsPage />,
    protectedRoute: true,
  },

{
  id: "Project-Detail",
  path: "/view-project-detail/:id",
  component: <ProjectDetail />,
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
    id: "Add Bug",
    path: "/add-bug",
    component: <AddBug />,
    protectedRoute: true,
  },  

  {
    id: "Add Project",
    path: "/add-project",
    component: <AddProject />,
    protectedRoute: true,
  },  
  {
    id: "Login",
    path: "/login",
    component: <Login />,
    protectedRoute: false,
  },
];
