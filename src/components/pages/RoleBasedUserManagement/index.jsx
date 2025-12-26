import Cookies from "js-cookie";
import { AdminUserManagement, TLUserManagement } from "../UserManagement";

const RoleBasedUserManagement = (props) => {
  const role = Cookies.get("bt_role") || "Developer";

  switch (role) {
    case "Admin":
    case "ProjectManager":
      return <AdminUserManagement {...props} />;

    case "TeamLeader":
      return <TLUserManagement {...props} />;

    default:
      return (
        <div className="p-8 text-center text-gray-500">
          You are not authorized to view this page.
        </div>
      );
  }
};

/* 🔥 ROLE-AWARE HEADER FORWARDING */
RoleBasedUserManagement.header = (headerProps) => {
  const role = Cookies.get("bt_role") || "Developer";

  switch (role) {
    case "Admin":
    case "ProjectManager":
      return AdminUserManagement.header?.(headerProps) || null;

    case "TeamLeader":
      return TLUserManagement.header?.(headerProps) || null;

    default:
      return null;
  }
};

export default RoleBasedUserManagement;
