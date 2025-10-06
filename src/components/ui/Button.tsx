import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface ButtonProps {
  children: string;
  className?: string;
  secondText?: string;
  onClick?: () => void;
}

const firstTextVariant: Variants = {
  initial: {
    x: 0,
  },
  hover: {
    x: "-100%",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const secondTextVariant: Variants = {
  initial: {
    x: "800%",
  },
  hover: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  animate: {
    x: "800%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const Button: React.FC<ButtonProps> = ({ children, secondText = "Explore", className = "", onClick }) => {
  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      animate="animate"
      onClick={onClick}
      className={`py-2 text-left font-semibold border-b border-text cursor-pointer hover:border-primary text-text overflow-hidden ${className}`}>
      <div className="relative">
        <motion.span variants={firstTextVariant} className="block whitespace-nowrap">
          {children}
        </motion.span>
        <motion.span variants={secondTextVariant} className="absolute top-0 left-0 whitespace-nowrap text-text" aria-hidden>
          {secondText}
        </motion.span>
      </div>
    </motion.button>
  );
};
