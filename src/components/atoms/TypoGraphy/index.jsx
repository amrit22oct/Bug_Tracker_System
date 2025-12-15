import React from "react";
import { motion } from "framer-motion";

/**
 * Typography3D
 * Props:
 * - text: string to display
 * - fontSize: px
 * - color: base text color
 * - depth: number of shadow layers
 * - offset: pixel offset per layer
 * - tilt: hover tilt angle in degrees
 */
export default function Typography3D({
  text = "3D Text",
  fontSize = 48,
  color = "#61dafb",
  depth = 8,
  offset = 1.5,
  tilt = 8,
}) {
  const layers = Array.from({ length: depth }).map((_, i) => depth - 1 - i);

  // Function to darken the text color for back layers
  const darken = (hex, amt) => {
    const h = hex.replace("#", "");
    const long = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const num = parseInt(long, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    const factor = 1 - amt;
    r = Math.max(0, Math.min(255, Math.round(r * factor)));
    g = Math.max(0, Math.min(255, Math.round(g * factor)));
    b = Math.max(0, Math.min(255, Math.round(b * factor)));
    return `rgb(${r},${g},${b})`;
  };

  return (
    <motion.div
      style={{
        display: "inline-block",
        perspective: 800,
      }}
      whileHover={{ rotateX: -tilt, rotateY: tilt, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      <div style={{ position: "relative", transformStyle: "preserve-3d" }}>
        {/* Create the depth layers */}
        {layers.map((i) => {
          const layerColor = darken(color, 0.05 + (i / depth) * 0.6);
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                transform: `translate3d(${i * offset}px, ${i * offset}px, ${-i}px)`,
                fontSize,
                fontWeight: "bold",
                color: layerColor,
                whiteSpace: "pre",
              }}
            >
              {text}
            </span>
          );
        })}

        {/* Front layer */}
        <span
          style={{
            position: "absolute",
            fontSize,
            fontWeight: "bold",
            color,
            whiteSpace: "pre",
          }}
        >
          {text}
        </span>

        {/* Optional soft highlight overlay */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0))",
            mixBlendMode: "soft-light",
          }}
        />
      </div>
    </motion.div>
  );
}
