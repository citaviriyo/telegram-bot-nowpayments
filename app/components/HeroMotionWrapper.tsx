"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  delay?: number;
};

export default function HeroMotionWrapper({ children, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
