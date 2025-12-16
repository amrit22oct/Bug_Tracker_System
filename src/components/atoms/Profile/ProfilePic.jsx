import React from "react";
import { motion } from "framer-motion";

const ProfilePic = ({
  name = "John Doe",
  size = 60,
  bgColor = "#4F46E5",
  textColor = "#FFFFFF",
  className = "",
}) => {
  const getInitials = (fullName) => {
    const names = fullName.trim().split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <motion.div
      className={`relative flex items-center justify-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        color: textColor,
        fontSize: size / 2.2,
        fontWeight: 700,
        userSelect: "none",
        perspective: 1400,
      }}
      animate={{
        rotateX: [0, 2, -2, 0],
        rotateY: [0, -2, 2, 0],
        y: [0, -2, 2, 0],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration: 6,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.08,
        rotateX: -15,
        rotateY: 15,
        transition: { type: "spring", stiffness: 250, damping: 18 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Top highlight */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom shadow */}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          borderRadius: "50%",
          background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent)",
          pointerEvents: "none",
        }}
      />
      {/* Initials */}
      <span
        className="relative z-10"
        style={{
          transform: "translateZ(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {initials}
      </span>
    </motion.div>
  );
};

export default ProfilePic;
