import HeaderProfile from "./HeaderProfile.jsx";
import { FaBars } from "react-icons/fa";

const AppHeader = ({ headerContent, setIsAuth, toggleMobileSidebar }) => {
  return (
    <header className="w-full h-full px-6 flex items-center bg-[var(--accent-light)] rounded-2xl relative">
      <div className="flex items-center justify-between w-full gap-6">
        
        {/* LEFT SIDE: Page Content */}
        <div className="flex items-center gap-4 flex-1">
          {/* PAGE HEADER CONTENT */}
          {headerContent}
        </div>

        {/* RIGHT SIDE: Hamburger + Profile */}
        <div className="flex items-center gap-4">
          {/* Hamburger button only visible on mobile */}
          {toggleMobileSidebar && (
            <button
              className="lg:hidden p-2 rounded-xl bg-[var(--accent-light)] shadow-lg"
              onClick={toggleMobileSidebar}
            >
              <FaBars size={35} />
            </button>
          )}

          {/* PROFILE: hidden on mobile, visible from lg screens */}
          <div className="hidden lg:flex">
            <HeaderProfile setIsAuth={setIsAuth} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
