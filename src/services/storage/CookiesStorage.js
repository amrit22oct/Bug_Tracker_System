import Cookies from "js-cookie";

class CookieStorage {
  setLogin = (username, userId, remember = false, role, accessToken, studentId = null) => {
    let thirtyDays = remember ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60;

    const expirationDate = new Date(Date.now() + thirtyDays * 1000);
    const appPrefix = "vcsg_";

    Cookies.set(`${appPrefix}username`, username, { expires: expirationDate });
    Cookies.set(`${appPrefix}userId`, userId, { expires: expirationDate });
    Cookies.set(`${appPrefix}role`, role, { expires: expirationDate });
    Cookies.set(`${appPrefix}accessToken`, accessToken, { expires: expirationDate });

    // Store studentId if available
    if (studentId) {
      Cookies.set(`${appPrefix}studentId`, studentId, { expires: expirationDate });
    }
  };

  getLogin = () => {
    const appPrefix = "vcsg_";
    return Cookies.get(`${appPrefix}username`) && Cookies.get(`${appPrefix}userId`) && Cookies.get(`${appPrefix}role`) && Cookies.get(`${appPrefix}accessToken`);
  };

  // Get studentId from cookies
  getStudentId = () => {
    const appPrefix = "vcsg_";
    return Cookies.get(`${appPrefix}studentId`);
  };

  // Get token from cookies
  getToken = () => {
    const appPrefix = "vcsg_";
    return Cookies.get(`${appPrefix}accessToken`);
  };

  // Get user role
  getRole = () => {
    const appPrefix = "vcsg_";
    return Cookies.get(`${appPrefix}role`);
  };

  logout = () => {
    const appPrefix = "vcsg_";
    Cookies.remove(`${appPrefix}username`);
    Cookies.remove(`${appPrefix}userId`);
    Cookies.remove(`${appPrefix}role`);
    Cookies.remove(`${appPrefix}accessToken`);
    Cookies.remove(`${appPrefix}studentId`);
  };

  deleteAccount = () => {
    const appPrefix = "vcsg_";
    Cookies.remove(`${appPrefix}username`);
    Cookies.remove(`${appPrefix}userId`);
    Cookies.remove(`${appPrefix}role`);
    Cookies.remove(`${appPrefix}accessToken`);
    Cookies.remove(`${appPrefix}studentId`);
  };
}

export default CookieStorage;
