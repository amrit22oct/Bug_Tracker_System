import { useState, useRef, useEffect } from "react";
import {
  IoChevronDown,
  IoPersonOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import ProfilePic from "../../atoms/Profile/ProfilePic";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import { showSuccess } from "@/utils/Toast";

const HeaderProfile = ({ setIsAuth }) => {
  const [open, setOpen] = useState(false);
  const [pressed, setPressed] = useState(false); // for 3D press effect
  const ref = useRef(null);
  const navigate = useNavigate();

  const name = "John Doe";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsAuth(false);
    showSuccess("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0">
      {/* Profile Button with increased width */}
      <button
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-3 px-4 py-2 rounded-2xl
          bg-[var(--accent-light)]
          border border-[var(--primary)] border-2
          min-w-[260px] justify-start
          transition-all duration-150 ease-out
          ${
            pressed
              ? "shadow-[inset_0_4px_6px_rgba(0,0,0,0.3)] transform translate-y-[2px]"
              : "shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
          }
        `}
      >
        <ProfilePic name={name} size={40} bgColor="#10B981" textColor="#fff" />
        <span className="text-sm font-semibold text-[var(--primary)] truncate">
          {name}
        </span>
        <IoChevronDown
          className={`ml-auto transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          size={18}
        />
      </button>

      {/* Dropdown remains unchanged */}
      {open && (
        <div
          className={`
            absolute right-0 mt-2 w-52 bg-(--accent-light) rounded-2xl max-w-[180px] p-2
            shadow-xl border border-(--primary-hover) p-2 z-50
            flex flex-col gap-2 animate-slide-down
          `}
        >
          <button
            onClick={() => navigate("/profile")}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium  rounded-xl  transition-colors hover:bg-(--primary) cursor-pointer hover:text-(--accent-light) "
          >
            <IoPersonOutline size={18} />
            View Profile
          </button>

          <div className="border-t border-(--primary-hover) my-1" />

          <PrimaryButton
            title={
              <span className="flex items-center gap-2">
                <IoLogOutOutline size={18} />
                Logout
              </span>
            }
            variant="outline"
            className="w-full h-10 text-sm rounded-xl mb-2  hover:bg-(--primary) hover:text-(--accent-light)"
            handler={handleLogout}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes slide-down {
          0% {
            opacity: 0;
            transform: translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HeaderProfile;
