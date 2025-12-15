import React from "react";

const PressedContainer = ({
  children,
  className = "",
  as: Component = "div",
  ...props
}) => {
  return (
    <Component
      className={`
        relative w-full
        rounded-3xl
        border
        shadow-[inset_0_4px_6px_rgba(0,0,0,0.3)]
        transform translate-y-[2px]
        transition-all duration-150 ease-out
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

export default PressedContainer;
