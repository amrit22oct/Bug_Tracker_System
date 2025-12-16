import { NavLink } from "react-router-dom";

function AppNav({ menu, onNavigate }) {
  const handleClick = (e, path) => {
    // You can prevent default if needed, but usually NavLink handles routing
    onNavigate?.(); // Close mobile sidebar
  };

  return (
    <nav className="p-4 flex-1 space-y-3 overflow-y-auto perspective-[1500px]">
      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={(e) => handleClick(e, item.path)} // <-- call onNavigate
          className={({ isActive }) => {
            return `
              group relative flex items-center gap-3 px-4 py-3 rounded-2xl
              transform-gpu will-change-transform
              transition-all duration-300 ease-out
              border border-(--primary)
              ${
                isActive
                  ? "bg-[rgba(var(--secondary-rgb),0.8)] backdrop-blur-none text-[var(--primary)] shadow-[inset_4px_4px_8px_rgba(var(--primary-rgb),0.25),inset_-4px_-4px_8px_rgba(255,255,255,0.5),"
                  : "bg-[rgba(var(--secondary-hover-rgb),0.43)] backdrop-blur-md text-[var(--primary)] shadow-[6px_6px_14px_rgba(var(--primary-rgb),0.56),-6px_-6px_14px_rgba(255,255,255,0.55)] hover:bg-[rgba(var(--secondary-hover-rgb),0.7)] hover:backdrop-blur-none hover:translate-z-[8px] hover:rotateX-[2deg] hover:shadow-[4px_4px_20px_rgba(var(--primary-rgb),0.18),-4px_-4px_20px_rgba(255,255,255,0.75)] z-0 hover:z-10 transition-[backdrop-filter,background-color,transform,box-shadow] duration-300"
              }
            `;
          }}
        >
          {/* Frosted glass background */}
          <span
            className="
              pointer-events-none absolute inset-0 rounded-2xl
              bg-[rgba(var(--secondary-hover-rgb),0.25)]
              backdrop-blur-md
              transition-[backdrop-filter,background-color] duration-300
              group-hover:bg-[rgba(var(--secondary-hover-rgb),0.7)]
              group-hover:backdrop-blur-none
            "
          />

          {/* Icon & Label */}
          <span className="relative flex items-center gap-3 w-full">
            <span className="text-lg drop-shadow-[0_1px_2px_rgba(var(--primary-rgb),0.3)] transition-transform duration-200 group-hover:translate-z-[10px]">
              {item.icon}
            </span>
            <span className="text-sm font-medium tracking-wide transition-transform duration-200 group-hover:translate-z-[8px]">
              {item.label}
            </span>
          </span>

          {/* Glass sheen / reflection */}
          <span
            className="
              pointer-events-none absolute inset-0 rounded-2xl
              bg-gradient-to-br from-white/25 via-transparent to-white/10
              opacity-0 group-hover:opacity-50
              transition-opacity duration-300
            "
          />
        </NavLink>
      ))}
    </nav>
  );
}

export default AppNav;
