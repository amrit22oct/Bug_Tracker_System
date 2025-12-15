import React from "react";
import Container3D from "@/components/atoms/Container3D";

const Toast3D = ({ message, type }) => {
  const bgColor =
    type === "success"
      ? "var(--accent)"
      : type === "error"
      ? "#FF5F5F"
      : "var(--accent-light)";

  const textColor =
    type === "success" || type === "error"
      ? "var(--primary)"
      : "var(--primary)";

  return (
    <Container3D
      width="320px"
      height="auto"
      background={bgColor}
      borderRadius={20}
      className="px-6 py-4 flex items-center justify-center text-center select-none"
      shadowColor="0, 0, 0"
      shadowBlur={24}
    >
      <span style={{ color: textColor, fontWeight: 500 }}>{message}</span>
    </Container3D>
  );
};

export default Toast3D;
