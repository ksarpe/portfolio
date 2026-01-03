import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function MiniNavigation() {
  const [activeId, setActiveId] = useState<string | undefined>("hero");

  useEffect(() => {
    const onChange = (event: Event) => {
      const custom = event as CustomEvent<{ id?: string; index?: number }>;
      setActiveId(custom.detail?.id);
    };

    window.addEventListener("fullpage:change", onChange as EventListener);
    return () => {
      window.removeEventListener("fullpage:change", onChange as EventListener);
    };
  }, []);

  const goTo = (id: string) => {
    window.dispatchEvent(new CustomEvent("fullpage:goto", { detail: { id } }));
  };

  const navigationItems = [
    { id: "hero", label: "Home", onClick: () => goTo("hero") },
    { id: "about", label: "About", onClick: () => goTo("about") },
    { id: "experience", label: "Experience", onClick: () => goTo("experience") },
    { id: "projects", label: "Projects", onClick: () => goTo("projects") },
  ];

  return (
    <AnimatePresence>
      {activeId !== "hero" && (
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
}
