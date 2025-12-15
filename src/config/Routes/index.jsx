import Dashboard from "@/components/pages/Dashboard";
import SimplePage from "@/components/pages/SimplePage";
import Login from "@/components/pages/Login";

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
    id: "LoginPage",
    path: "/login",
    component: <Login />,
    protectedRoute: false, 
  },
];
