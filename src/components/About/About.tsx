import React from "react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      rotate: -5,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="about" className="min-h-screen py-20 px-6 md:px-8 bg-[var(--color-bg)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[var(--color-primary-light)] rounded-full blur-2xl"></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}>
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-4">About Me</h2>
          <div className="w-24 h-1 bg-[var(--color-primary)] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image */}
          <motion.div className="relative" variants={imageVariants}>
            <div className="relative group">
              {/* Placeholder for photo - replace with actual image */}
            <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-2xl p-1 shadow-2xl">
                <div className="w-full h-full bg-[var(--color-bg-alt)] rounded-xl overflow-hidden group-hover:bg-[var(--color-bg)] transition-all duration-300 flex items-center justify-center">
                    <img
                        src="img/photomain.png"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-[var(--color-primary)] rounded-full opacity-20"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}></motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-16 h-16 border-4 border-[var(--color-primary)] rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}></motion.div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-6">My Programming Journey</h3>

              <div className="space-y-6 text-[var(--color-text-muted)] leading-relaxed">
                <p className="text-lg">
                  I started my programming journey out of fascination with the ability to create things that can impact people's lives. What
                  began as a hobby quickly turned into a passion.
                </p>

                <p>
                  I specialize in building modern web applications, where every line of code matters. I love the process from idea to
                  finished product—from UX/UI design to implementing advanced features.
                </p>
              </div>
            </div>

            {/* Skills/Tech stack */}
            <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-4" variants={itemVariants}>
              {["React", "TypeScript", "Node.js", "Python", "Firebase", "Tailwind"].map((tech, index) => (
                <motion.div
                  key={tech}
                  className="bg-[var(--color-bg-alt)] px-4 py-2 rounded-lg text-center text-[var(--color-text)] font-medium"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "var(--color-primary-light)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ animationDelay: `${index * 0.1}s` }}>
                  {tech}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
