import { NavLink } from "react-router-dom";

function AppNav({ menu, onNavigate }) {
  const handleClick = () => {
    onNavigate?.();
  };

  return (
    <nav className="p-4 flex-1 space-y-3 overflow-y-auto">
      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={handleClick}
          className={({ isActive }) =>
            `
              group relative flex items-center gap-3 px-4 py-3 rounded-2xl
              transition-all duration-200 ease-out
              border border-[var(--primary)]
              ${
                isActive
                  ? "bg-[var(--primary)] text-[var(--accent-light)] shadow-md"
                  : "bg-[var(--accent-light)] text-[var(--primary)] hover:bg-[var(--primary)]/90 hover:text-(--accent-light) hover:shadow-lg"
              }
            `
          }
        >
          {/* Icon & Label */}
          <span className="flex items-center gap-3 w-full">
            <span className="text-lg transition-transform duration-200 group-hover:scale-110">
              {item.icon}
            </span>
            <span className="text-sm font-medium tracking-wide">
              {item.label}
            </span>
          </span>
        </NavLink>
      ))}
    </nav>
  );
}

export default AppNav;
