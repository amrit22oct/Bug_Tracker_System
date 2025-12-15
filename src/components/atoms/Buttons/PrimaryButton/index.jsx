import React from "react";

const VARIANTS = {
  primary: `
    bg-[var(--primary)]
    text-white
  `,
  secondary: `
    bg-[var(--secondary)]
    text-black
  `,
  accent: `
    bg-[var(--accent)]
    text-black
  `,
  accentLight: `
    bg-[var(--accent-light)]
    text-black
  `,
  outline: `
    bg-transparent
    border border-[var(--primary)]
    text-[var(--primary)]
  `,
  flat: `
  bg-transparent
  border border-[var(--primary)]
  text-[var(--primary)]
`,
  disabled: `
    bg-gray-300
    text-black
    opacity-60
  `,
};

const PrimaryButton = ({
  title = "Submit",
  handler,
  disabled = false,
  type = "button",
  className = "",
  variant = "primary",
  icon: Icon,
  iconPosition = "left",
  iconSize = 18,
}) => {
  const variantClasses =
    variant === "disabled"
      ? VARIANTS.disabled
      : VARIANTS[variant] || VARIANTS.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : handler}
      className={`
        relative group
        w-full h-11 px-4
        rounded-xl font-medium text-sm
        flex items-center justify-center gap-2
        transition-all duration-200 ease-out
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${variantClasses}
        ${
          !disabled &&
          `
          transform-gpu
          shadow-[0_10px_0_rgba(0,0,0,0.25),_0_14px_30px_rgba(0,0,0,0.15)]
          hover:translate-y-[-2px]
          hover:shadow-[0_12px_0_rgba(0,0,0,0.22),_0_20px_40px_rgba(0,0,0,0.18)]
          active:translate-y-[4px]
          active:shadow-[0_4px_0_rgba(0,0,0,0.30)]
          `
        }
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--secondary)]
        focus-visible:ring-offset-2
        ${className}
      `}
    >
      {!disabled && (
        <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent" />
      )}

      {Icon && iconPosition === "left" && (
        <Icon
          size={iconSize}
          className="relative z-10 transition-transform group-hover:-translate-x-0.5"
        />
      )}

      <span className="relative z-10 select-none truncate">{title}</span>

      {Icon && iconPosition === "right" && (
        <Icon
          size={iconSize}
          className="relative z-10 transition-transform group-hover:translate-x-0.5"
        />
      )}
    </button>
  );
};

export default PrimaryButton;
