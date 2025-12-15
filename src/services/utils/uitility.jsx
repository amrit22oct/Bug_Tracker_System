import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const routeController = (component, protectedRoute = false, redirectLoggedInPath = "/", allowedRoles = []) => {
  const appPrefix = "vcsg_";

  const isLoggedIn = Cookies.get(`${appPrefix}userId`) && Cookies.get(`${appPrefix}username`);
  const userRole = Cookies.get(`${appPrefix}role`);

  // Handle public routes (like /auth)
  if (!protectedRoute) {
    if (isLoggedIn) {
      // Redirect logged-in users away from auth page
      // Students go to /dashboard, admins go to their default path
      if (userRole === "student") {
        return <Navigate to="/dashboard" replace />;
      }
      return <Navigate to={redirectLoggedInPath} replace />;
    } else {
      return component;
    }
  }

  // Handle protected routes
  if (protectedRoute) {
    // Not logged in - redirect to auth
    if (!isLoggedIn) {
      return <Navigate to="/auth" replace />;
    }

    // Logged in - check role-based access
    // If no roles specified, allow all logged-in users
    if (!allowedRoles || allowedRoles.length === 0) {
      return component;
    }

    // Check if user's role is allowed
    if (allowedRoles.includes(userRole)) {
      return component;
    }

    // Role not allowed - redirect based on role
    if (userRole === "student") {
      // Students can only access /dashboard
      return <Navigate to="/dashboard" replace />;
    }

    // For other unauthorized roles, redirect to auth
    return <Navigate to="/auth" replace />;
  }

  return component;
};
