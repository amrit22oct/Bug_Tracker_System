import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaBug, FaProjectDiagram, FaChartBar, FaCog, FaTimes } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import AppNav from "../../molecules/AppNav";
import { showSuccess } from "@/utils/Toast.jsx";

function AppSidebar({ setIsAuth, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Dashboard", path: "/", icon: <FaHome /> },
    { label: "Simple Page", path: "/simple", icon: <FaBug /> },
    { label: "Bugs", path: "/bugs", icon: <FaBug /> },
    { label: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
    { label: "Reports", path: "/reports", icon: <FaChartBar /> },
    { label: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsAuth(false);
    showSuccess("Logged out successfully!");
    navigate("/login", { replace: true });
    onClose?.();
  };

  return (
    <div
      className="flex flex-col h-full bg-[var(--accent-light)] w-full sm:w-64 lg:w-72 rounded-2xl shadow-lg p-2 z-[9999]"
      onClick={(e) => e.stopPropagation()} // prevents overlay click from closing
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-(--primary) font-bold text-xl text-[var(--primary)] select-none">
        Bug Tracker
        {/* Close button for mobile */}
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 rounded-md hover:bg-[var(--primary)]/20">
            <FaTimes className="text-[var(--primary)]" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <AppNav
        menu={menu.map((item) => ({
          ...item,
          active: location.pathname === item.path,
        }))}
        onNavigate={onClose}
      />

      {/* Logout */}
      <div className="p-4 mt-auto">
        <PrimaryButton
          title="Logout"
          handler={handleLogout}
          variant="outline"
          icon={BiLogOut}
          className="w-full flex items-center justify-center gap-2 hover:bg-(--primary) hover:text-(--accent-light)"
        />
      </div>
    </div>
  );
}

export default AppSidebar;
