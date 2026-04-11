"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  href: string;
  style: CSSProperties;
  children: ReactNode;
  hoverShadow: string;
};

export default function HeroMotionLink({ href, style, children, hoverShadow }: Props) {
  return (
    <motion.a
      href={href}
      style={style}
      whileHover={{ y: -2, boxShadow: hoverShadow }}
      transition={{ duration: 0.18 }}
    >
      {children}
    </motion.a>
  );
}
