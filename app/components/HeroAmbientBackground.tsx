"use client";

import { motion } from "framer-motion";

export default function HeroAmbientBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(820px 380px at 18% 8%, rgba(250,204,21,0.16), transparent 64%), radial-gradient(700px 340px at 84% 10%, rgba(34,197,94,0.09), transparent 66%), linear-gradient(180deg, rgba(11,15,20,0.16), rgba(11,15,20,0.72))",
        }}
      />

      <motion.div
        initial={{ opacity: 0.42, x: -10, y: -4 }}
        animate={{ opacity: [0.34, 0.46, 0.34], x: [-10, 14, -10], y: [-4, 10, -4] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: "-8% -6% 8% -6%",
          background:
            "radial-gradient(520px 260px at 28% 20%, rgba(250,204,21,0.12), transparent 68%), radial-gradient(420px 220px at 68% 24%, rgba(56,189,248,0.06), transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0.16, x: 8, y: 6 }}
        animate={{ opacity: [0.12, 0.2, 0.12], x: [8, -10, 8], y: [6, -8, 6] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: "6% -4% -10% -4%",
          background:
            "radial-gradient(420px 220px at 76% 12%, rgba(34,197,94,0.10), transparent 72%), radial-gradient(560px 260px at 24% 84%, rgba(250,204,21,0.08), transparent 76%)",
          filter: "blur(12px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.22) 0.55px, transparent 0.55px)",
          backgroundSize: "3px 3px",
          mixBlendMode: "soft-light",
        }}
      />
    </div>
  );
}
