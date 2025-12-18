import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

// Roles:
// Admin | ProjectManager | Developer | QA
// Default role: Developer

export const bugTrackerRouteController = (
  component,
  protectedRoute = false,
  redirectLoggedInPath = "/",
  allowedRoles = []
) => {
  const appPrefix = "bt_";

  const isLoggedIn = !!(
    Cookies.get(`${appPrefix}userId`) &&
    Cookies.get(`${appPrefix}username`) &&
    Cookies.get(`${appPrefix}accessToken`)
  );

  const userRole = Cookies.get(`${appPrefix}role`) || "Developer";

  // -----------------------------
  // Public routes (e.g. /auth)
  // -----------------------------
  if (!protectedRoute) {
    if (isLoggedIn) {
      switch (userRole) {
        case "Admin":
          return <Navigate to="/admin/dashboard" replace />;
        case "ProjectManager":
          return <Navigate to="/projects" replace />;
        case "QA":
          return <Navigate to="/qa/bugs" replace />;
        case "Developer":
        default:
          return <Navigate to={redirectLoggedInPath || "/bugs"} replace />;
      }
    }
    return component;
  }

  // -----------------------------
  // Protected routes
  // -----------------------------
  if (protectedRoute) {
    // Not logged in
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    // No role restriction
    if (!allowedRoles || allowedRoles.length === 0) {
      return component;
    }

    // Role allowed
    if (allowedRoles.includes(userRole)) {
      return component;
    }

    // Role NOT allowed → redirect by role
    switch (userRole) {
      case "Admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "ProjectManager":
        return <Navigate to="/projects" replace />;
      case "QA":
        return <Navigate to="/qa/bugs" replace />;
      case "Developer":
      default:
        return <Navigate to="/bugs" replace />;
    }
  }

  return component;
};
