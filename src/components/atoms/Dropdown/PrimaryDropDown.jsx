import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const PrimaryDropdown = ({
  label = "Select option",
  options = [],
  value,
  onChange,
  disabled = false,
  zIndex = 9999, // base z-index
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div
      ref={ref}
      className="relative w-full max-w-md sm:max-w-full "
      style={{ perspective: "1500px", zIndex: open ? 9999 : zIndex }}
    >
      {/* Trigger */}
      <button
        disabled={disabled}
        onClick={() => !disabled && setOpen((p) => !p)}
        className={`
          relative w-full h-14 px-4 sm:px-5 rounded-2xl
          flex items-center justify-between font-semibold text-sm sm:text-base
          bg-(--primary) text-white
          shadow-[0_10px_0_rgba(0,0,0,0.25),_0_14px_30px_rgba(0,0,0,0.15)]
          transition-all duration-300 transform-gpu
          ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer hover:-translate-y-[3px] hover:rotateX-[3deg] hover:shadow-[0_10px_0_rgba(0,0,0,0.25),_0_14px_30px_rgba(0,0,0,0.15)]"
          }
          active:translate-y-[2px] active:rotateX-[-3deg] active:shadow-[0_4px_0_rgba(0,0,0,0.35)]
        `}
      >
        <span className="relative z-10 truncate">
          {selected?.label || label}
        </span>
        <FaChevronDown
          className={`relative z-10 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
        {!disabled && (
          <>
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
            <span className="absolute bottom-0 left-0 right-0 h-[35%] rounded-b-2xl bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
          </>
        )}
      </button>

      {/* Dropdown */}
      <ul
        className={`
          absolute mt-4 w-full
          rounded-2xl
          transform-gpu
          transition-all duration-400
          ${
            open
              ? "opacity-100 scale-100 rotateX-0 pointer-events-auto"
              : "opacity-0 scale-95 -rotateX-10 pointer-events-none"
          }
        `}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {options.map((opt, index) => {
          const active = value === opt.value;
          return (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              style={{ transitionDelay: `${index * 50}ms` }}
              className={`
                relative group cursor-pointer select-none
                px-4 sm:px-5 py-3 rounded-xl font-medium text-sm sm:text-base
                mb-2 last:mb-0 hover:bg-(--secondary)
                transition-all duration-300 gap-1
                ${
                  active
                    ? "bg-[var(--secondary)] text-white"
                    : "bg-[var(--accent-light)] text-black"
                }
                shadow-[0_6px_0_var(--primary-hover)]
                hover:-translate-y-[1px] hover:rotateX-[2deg] hover:shadow-[0_2px_0_var(--primary-hover)]
                active:translate-y-[1px] active:rotateX-[-2deg] active:shadow-[0_4px_0_var(--primary-hover)]
              `}
            >
              <span className="absolute inset-x-0 top-0 h-1/2 rounded-xl bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              <span className="relative z-10 truncate">{opt.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PrimaryDropdown;
