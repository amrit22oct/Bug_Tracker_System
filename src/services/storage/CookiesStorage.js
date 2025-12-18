import Cookies from "js-cookie";

class BugTrackerCookieStorage {
  setLogin = (
    username,
    userId,
    name,       // New
    email,      // New
    remember = false,
    role,
    accessToken,
    organizationId = null,
    projectId = null
  ) => {
    const maxAgeSeconds = remember ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60;
    const expirationDate = new Date(Date.now() + maxAgeSeconds * 1000);
    const appPrefix = "bt_";

    Cookies.set(`${appPrefix}username`, username, { expires: expirationDate });
    Cookies.set(`${appPrefix}userId`, userId, { expires: expirationDate });
    Cookies.set(`${appPrefix}role`, role, { expires: expirationDate });
    Cookies.set(`${appPrefix}accessToken`, accessToken, { expires: expirationDate });

    // New cookies for name and email
    if (name) Cookies.set(`${appPrefix}name`, name, { expires: expirationDate });
    if (email) Cookies.set(`${appPrefix}email`, email, { expires: expirationDate });

    if (organizationId) {
      Cookies.set(`${appPrefix}organizationId`, organizationId, { expires: expirationDate });
    }

    if (projectId) {
      Cookies.set(`${appPrefix}projectId`, projectId, { expires: expirationDate });
    }
  };

  // Store bug-related context (can be updated independently)
  setBugContext = (
    bugId,
    bugStatus = null,
    priority = null,
    severity = null,
    assigneeId = null
  ) => {
    const appPrefix = "bt_";

    if (bugId) Cookies.set(`${appPrefix}bugId`, bugId);
    if (bugStatus) Cookies.set(`${appPrefix}bugStatus`, bugStatus);
    if (priority) Cookies.set(`${appPrefix}priority`, priority);
    if (severity) Cookies.set(`${appPrefix}severity`, severity);
    if (assigneeId) Cookies.set(`${appPrefix}assigneeId`, assigneeId);
  };

  isLoggedIn = () => {
    const appPrefix = "bt_";
    return (
      !!Cookies.get(`${appPrefix}username`) &&
      !!Cookies.get(`${appPrefix}userId`) &&
      !!Cookies.get(`${appPrefix}role`) &&
      !!Cookies.get(`${appPrefix}accessToken`)
    );
  };

  // Auth & user getters
  getToken = () => Cookies.get("bt_accessToken");
  getRole = () => Cookies.get("bt_role");
  getUserId = () => Cookies.get("bt_userId");
  getUsername = () => Cookies.get("bt_username");
  getName = () => Cookies.get("bt_name");      // New
  getEmail = () => Cookies.get("bt_email");    // New

  // Organization & project
  getOrganizationId = () => Cookies.get("bt_organizationId");
  getProjectId = () => Cookies.get("bt_projectId");

  // Bug context getters
  getBugId = () => Cookies.get("bt_bugId");
  getBugStatus = () => Cookies.get("bt_bugStatus");
  getPriority = () => Cookies.get("bt_priority");
  getSeverity = () => Cookies.get("bt_severity");
  getAssigneeId = () => Cookies.get("bt_assigneeId");

  clearBugContext = () => {
    const appPrefix = "bt_";
    Cookies.remove(`${appPrefix}bugId`);
    Cookies.remove(`${appPrefix}bugStatus`);
    Cookies.remove(`${appPrefix}priority`);
    Cookies.remove(`${appPrefix}severity`);
    Cookies.remove(`${appPrefix}assigneeId`);
  };

  logout = () => {
    const appPrefix = "bt_";
    Cookies.remove(`${appPrefix}username`);
    Cookies.remove(`${appPrefix}userId`);
    Cookies.remove(`${appPrefix}role`);
    Cookies.remove(`${appPrefix}accessToken`);
    Cookies.remove(`${appPrefix}name`);       // Remove name
    Cookies.remove(`${appPrefix}email`);      // Remove email
    Cookies.remove(`${appPrefix}organizationId`);
    Cookies.remove(`${appPrefix}projectId`);
    this.clearBugContext();
  };

  deleteAccount = () => {
    this.logout();
  };
}

export default BugTrackerCookieStorage;
