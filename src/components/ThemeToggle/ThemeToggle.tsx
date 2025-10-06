import React from "react";
import { useTheme } from "../../hooks/useTheme";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 flex h-8 w-16 items-center rounded-full bg-text-muted-more p-1 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <Sun
        className={`absolute left-1.5 top-1/2 h-5 w-5 -translate-y-1/2 z-1 ${
          isDark ? "text-text/80" : "text-text"
        }`}
      />
      <Moon
        className={`absolute right-1.5 top-1/2 h-5 w-5 -translate-y-1/2 z-1 ${
          isDark ? "text-text/80" : "text-text"
        }`}
      />
      <span
        className={`absolute top-1/2 h-6 w-6 -translate-y-1/2 transform rounded-full bg-bg shadow-md transition-transform duration-300 ease-in-out
        ${isDark ? "translate-x-8" : "translate-x-0"}
      `}
      />
    </button>
  );
};

export default ThemeToggle;
