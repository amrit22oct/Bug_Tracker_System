export default function Input({
  id,
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  rightAction = null, // 🔥 generic conditional action
}) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Input */}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 rounded-xl
          ${rightAction ? "pr-11" : ""}
         
          text-[var(--primary)]
          border border-[var(--primary)]
          focus:outline-none focus:ring-1 focus:ring-[var(--primary)]
          transition-all duration-200
        `}
      />

      {/* Right action (eye / clear / copy / etc.) */}
      {rightAction?.show && (
        <button
          type="button"
          onClick={rightAction.onClick}
          aria-label={rightAction.ariaLabel}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-[var(--primary)]
            opacity-60 hover:opacity-100
          "
        >
          <rightAction.icon size={18} />
        </button>
      )}
    </div>
  );
}
