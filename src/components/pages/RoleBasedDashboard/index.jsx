import Cookies from "js-cookie";
import {
  Dashboard,
  DeveloperDashboard,
  PmDashboard,
  QaDashboard,
} from "@/components/pages";

const RoleBasedDashboard = (props) => {
  const role = Cookies.get("bt_role") || "Developer";

  switch (role) {
    case "Admin":
      return <Dashboard {...props} />;

    case "ProjectManager":
      return <PmDashboard {...props} />;

    case "QA":
      return <QaDashboard {...props} />;

    case "Developer":
    default:
      return <DeveloperDashboard {...props} />;
  }
};

/* 🔥 ROLE-AWARE HEADER FORWARDING */
RoleBasedDashboard.header = (headerProps) => {
  const role = Cookies.get("bt_role") || "Developer";

  switch (role) {
    case "Admin":
      return Dashboard.header?.(headerProps) || null;

    case "ProjectManager":
      return PmDashboard.header?.(headerProps) || null;

    case "QA":
      return QaDashboard.header?.(headerProps) || null;

    case "Developer":
    default:
      return DeveloperDashboard.header?.(headerProps) || null;
  }
};

export default RoleBasedDashboard;
