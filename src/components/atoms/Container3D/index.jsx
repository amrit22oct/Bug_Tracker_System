import React from "react";

/**
 * Container3D
 * Props:
 * - width, height: px or %
 * - background: background color
 * - borderRadius: px
 * - shadowColor: color of shadow
 * - shadowBlur: blur radius
 * - children: content inside
 * - className: extra classes or styles
 */
export default function Container3D({
  width = 300,
  height = 200,
  background = "#ffffff",
  borderRadius = 16,
  shadowColor = "0, 0, 0",
  shadowBlur = 20,
  children,
  className = "",
}) {
  return (
    <div
      style={{
        width,
        height,
        background,
        borderRadius,
        transformStyle: "preserve-3d",
        perspective: 800,
        // Use multiple layered shadows to simulate soft ambient 3D lighting
        boxShadow: `
          0 4px 6px rgba(${shadowColor}, 0.1),
          0 10px 20px rgba(${shadowColor}, 0.12),
          0 20px 40px rgba(${shadowColor}, 0.08)
        `,
        position: "relative",
        
      }}
      className={`relative flex items-center justify-center ${className}`}
    >
      {/* Optional subtle highlight on top-left for lighting */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius,
          pointerEvents: "none",
          background: `linear-gradient(145deg, rgba(255,255,255,0.08), transparent)`,
          mixBlendMode: "soft-light",
        }}
      />
      {children}
    </div>
  );
}
