import Cookies from "js-cookie";
import {
   AdminBugPage,
   PmBugPage,
   QaBugPage,
   TlBugPage,
   
 } from "../../organisms/Bugs";
import DeveloperBugPage from "../../organisms/Bugs/DeveloperBugPage";


const BugPage = (props) => {
  const role = Cookies.get("bt_role") || "Developer";

  switch (role) {
    case "Admin":
      return <AdminBugPage {...props} />;

    case "ProjectManager":
      return <PmBugPage {...props} />;

    case "TeamLeader":
      return <TlBugPage {...props} />;

    case "QA":
      return <QaBugPage {...props} />;

    case "Developer":
      return <DeveloperBugPage {...props} />;
    default:
      return <AdminBugPage {...props} />;
  }
};

/* 🔥 ROLE-AWARE HEADER FORWARDING */
BugPage.header = (headerProps) => {
  const role = Cookies.get("bt_role") || "Developer";

  switch (role) {
    case "Admin":
      return AdminBugPage.header?.(headerProps) || null;

    case "ProjectManager":
      return PmBugPage.header?.(headerProps) || null;

    case "TeamLeader":
      return TlBugPage.header?.(headerProps) || null;

    case "QA":
      return QaBugPage.header?.(headerProps) || null;

    case "Developer":
      return DeveloperBugPage.header?.(headerProps) || null;
    default:
      return AdminBugPage.header?.(headerProps) || null;
  }
};

export default BugPage;
