import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

// Roles:
// Admin | ProjectManager | Developer | QA

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

  /* ---------------- PUBLIC ROUTES ---------------- */
  if (!protectedRoute) {
    if (isLoggedIn) {
      // 🔥 ALWAYS GO TO "/" — RoleBasedDashboard decides
      return <Navigate to="/" replace />;
    }
    return component;
  }

  /* ---------------- PROTECTED ROUTES ---------------- */
  if (protectedRoute) {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    if (!allowedRoles || allowedRoles.length === 0) {
      return component;
    }

    if (allowedRoles.includes(userRole)) {
      return component;
    }

    // ❌ role not allowed → go back to dashboard
    return <Navigate to="/" replace />;
  }

  return component;
};
