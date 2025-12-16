import { useNavigate } from "react-router-dom";
import { FaHome, FaBug, FaTimes } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import AppNav from "../../molecules/AppNav";
import { showSuccess } from "@/utils/Toast.jsx";

function AppSidebar({ setIsAuth, onClose }) {
  const navigate = useNavigate();

  const menu = [
    { label: "Dashboard", path: "/", icon: <FaHome /> },
    { label: "Simple Page", path: "/simple", icon: <FaBug /> },
    { label: "Bugs", path: "/bugs", icon: <FaBug /> },
    { label: "Reports", path: "/reports", icon: <FaBug /> },
    { label: "Logs", path: "/logs", icon: <FaBug /> },
    { label: "Settings", path: "/settings", icon: <FaBug /> },
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
  className="flex flex-col h-full bg-[var(--accent-light)] w-full rounded-2xl shadow-lg p-2 z-[9999]"
  onClick={(e) => e.stopPropagation()} // prevents overlay click from closing when clicking inside
>
  {/* Header */}
  <div className="h-16 flex items-center justify-between px-4 border-b border-(--primary) font-bold text-xl text-[var(--primary)] select-none">
    Bug Tracker

    {/* Close button for mobile */}
    {onClose && (
      <button onClick={onClose} className="lg:hidden p-1 rounded-md">
        <FaTimes />
      </button>
    )}
  </div>

  {/* Navigation */}
  <AppNav menu={menu} onNavigate={onClose} />

  {/* Logout */}
  <div className="p-4">
    <PrimaryButton
      title="Logout"
      handler={handleLogout}
      variant="outline"
      icon={BiLogOut}
      className="w-full hover:bg-(--primary) hover:text-(--accent-light)"
    />
  </div>
</div>

  );
}

export default AppSidebar;
