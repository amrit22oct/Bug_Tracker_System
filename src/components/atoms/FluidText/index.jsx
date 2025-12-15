"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

export default function FluidText({
  children,
  className = "",
  fontFamily = "", // <--- added
  maxScale = 1.25,
  maxWeight = 0.35,
  influenceRadius = 50,
}) {
  const letters = String(children).split("");
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Track mouse position relative to container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const move = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    const leave = () => {
      mouseX.set(-9999);
      mouseY.set(-9999);
    };

    container.addEventListener("mousemove", move);
    container.addEventListener("mouseleave", leave);

    return () => {
      container.removeEventListener("mousemove", move);
      container.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <span
      ref={containerRef}
      className={`inline-flex ${className}`}
      style={{
        cursor: "default",
        fontFamily, // <--- applied
      }}
    >
      {letters.map((char, i) => (
        <FluidLetter
          key={i}
          char={char}
          containerRef={containerRef}
          mouseX={mouseX}
          mouseY={mouseY}
          maxScale={maxScale}
          maxWeight={maxWeight}
          influenceRadius={influenceRadius}
          fontFamily={fontFamily} // <--- passed down
        />
      ))}
    </span>
  );
}

function FluidLetter({
  char,
  containerRef,
  mouseX,
  mouseY,
  maxScale,
  maxWeight,
  influenceRadius,
  fontFamily, // <--- added
}) {
  const elRef = useRef(null);

  const scale = useMotionValue(1);
  const weight = useMotionValue(0);

  // Smooth animated values
  const smoothScale = useSpring(scale, {
    stiffness: 90,
    damping: 16,
    mass: 0.7,
  });
  const smoothWeight = useSpring(weight, { stiffness: 100, damping: 20 });

  const scaleX = useTransform(
    smoothScale,
    (v) => v + 0.15 * smoothWeight.get()
  );
  const scaleY = useTransform(
    smoothScale,
    (v) => v - 0.03 * smoothWeight.get()
  );

  // Fake weight using layered text-shadow
  const shadow = useTransform(smoothWeight, (w) => {
    const px = (w * 4).toFixed(2);
    return `
      0 0 ${px}px rgba(0,0,0,0.25),
      0 0 ${px / 1.6}px rgba(0,0,0,0.15),
      0 0 ${px / 2}px rgba(0,0,0,0.1)
    `;
  });

  useEffect(() => {
    const el = elRef.current;
    if (!el || !containerRef.current) return;

    const animate = () => {
      const rect = el.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const cx = rect.left + rect.width / 2 - containerRect.left;
      const cy = rect.top + rect.height / 2 - containerRect.top;

      const dx = mouseX.get() - cx;
      const dy = mouseY.get() - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let factor = Math.max(0, 1 - dist / influenceRadius);
      factor = Math.pow(factor, 2.3);

      scale.set(1 + (maxScale - 1) * factor);
      weight.set(maxWeight * factor);

      requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animate);
  }, []);

  return (
    <motion.span
      ref={elRef}
      style={{
        display: "inline-block",
        scaleX,
        scaleY,
        textShadow: shadow,
        transformOrigin: "center center",
        willChange: "transform, text-shadow",
        fontFamily, 
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}
