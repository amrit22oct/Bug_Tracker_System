import Cookies from "js-cookie";
import {
   AdminProjectPage,
   PmProjectPage,
   QaProjectPage,
   
 } from "../../organisms/Projects";


const ProjectsPage = (props) => {
  const role = Cookies.get("bt_role") || "Developer";

  switch (role) {
    case "Admin":
      return <AdminProjectPage {...props} />;

    case "ProjectManager":
      return <PmProjectPage {...props} />;

   //  case "TeamLeader":
   //    return <TLDashboard {...props} />;

    case "QA":
      return <QaProjectPage {...props} />;

   //  case "Developer":
    default:
      return <AdminProjectPage {...props} />;
  }
};

/* 🔥 ROLE-AWARE HEADER FORWARDING */
ProjectsPage.header = (headerProps) => {
  const role = Cookies.get("bt_role") || "Developer";

  switch (role) {
    case "Admin":
      return AdminProjectPage.header?.(headerProps) || null;

    case "ProjectManager":
      return PmProjectPage.header?.(headerProps) || null;

   //  case "TeamLeader":
   //    return TLDashboard.header?.(headerProps) || null;

    case "QA":
      return QaProjectPage.header?.(headerProps) || null;

   //  case "Developer":
    default:
      return AdminProjectPage.header?.(headerProps) || null;
  }
};

export default ProjectsPage;
