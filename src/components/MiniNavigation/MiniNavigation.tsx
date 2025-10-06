import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MiniNavigationProps {
  isVisible: boolean;
}

const MiniNavigation: React.FC<MiniNavigationProps> = ({ isVisible }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      const offset = -80; // Offset for better positioning

      window.scrollTo({
        top: offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navigationItems = [
    { id: "hero", label: "Home", onClick: scrollToTop },
    { id: "about", label: "About", onClick: () => scrollToSection("about") },
    { id: "experience", label: "Experience", onClick: () => scrollToSection("experience") },
    { id: "projects", label: "Projects", onClick: () => scrollToSection("projects") },
    { id: "contact", label: "Contact", onClick: () => scrollToSection("contact") },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-[var(--color-bg)] border border-[var(--color-text-muted)] rounded-full px-6 py-3 shadow-lg backdrop-blur-md bg-opacity-90">
            <div className="flex items-center gap-6">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={item.onClick}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200 text-sm font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}>
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default MiniNavigation;
