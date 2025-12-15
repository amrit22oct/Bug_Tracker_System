import React from "react";
import { FaSearch } from "react-icons/fa";

const PrimarySearchBar = ({
  value = "",
  onChange,
  onSearch,
  placeholder = "Search...",
  disabled = false,
  className = "",
}) => {
  const handleSearch = () => {
    if (!disabled && value?.trim() && onSearch) {
      onSearch();
    }
  };

  return (
    <div
      className={`relative max-w-md sm:max-w-md ${className}`}
      style={{ perspective: "1200px" }}
    >
      <div
        className={`
          relative flex items-center
         
          px-3 sm:px-4
          rounded-2xl
        boder border-2
          transform-gpu
          transition-all duration-300 ease-out
          overflow-hidden
          ${
            disabled
              ? "opacity-60"
              : `
                shadow-[0_8px_0_rgba(0,0,0,0.25),_0_20px_40px_rgba(0,0,0,0.15)]
                
                focus-within:rotateX-[2deg]
                focus-within:shadow-[0_10px_0_rgba(0,0,0,0.22),_0_28px_55px_rgba(0,0,0,0.18)]
              `
          }
        `}
      >
        {/* Top highlight */}
        {!disabled && (
          <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 to-transparent" />
        )}

        {/* Input */}
        <input
          type="text"
          disabled={disabled}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder={placeholder}
          spellCheck={false}
          className="
            relative z-10 flex-1 bg-transparent
            outline-none border-none
            text-sm sm:text-sm md:text-base p-1
            text-[var(--primary)]
            placeholder:text-(--primary)
            caret-[var(--primary)]
            selection:bg-[var(--accent)]
          "
        />

        {/* Search button */}
        <button
          disabled={disabled}
          onClick={handleSearch}
          className={`
            relative z-10 ml-2 mb-2!
            w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10
            rounded-xl
            flex items-center justify-center
            text-black
            transition-all duration-200 ease-out
            ${
              disabled
                ? "cursor-not-allowed"
                : `
                    cursor-pointer
                    shadow-[0_5px_0_var(--primary)]
                    hover:-translate-y-[1px]
                    hover:shadow-[0_6px_0_var(--primary)]
                    active:translate-y-[1px]
                    active:shadow-[-1_0_0_var(--primary-hover)]
                  `
            }
          `}
          aria-label="Search"
        >
          <FaSearch size={14} className="sm:scale-100 md:scale-100" />
        </button>

        {/* Bottom depth */}
        {!disabled && (
          <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-[35%] rounded-b-2xl bg-gradient-to-t from-black/25 to-transparent" />
        )}
      </div>
    </div>
  );
};

export default PrimarySearchBar;
