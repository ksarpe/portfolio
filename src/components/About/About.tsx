import { motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";

type ChipPosition = {
  left: number;
  top: number;
  rotate: number;
  floatAmplitude: number;
  floatDuration: number;
  floatDelay: number;
  radius: number;
};

type ChipSize = {
  width: number;
  height: number;
};

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: "easeOut" as const,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      y: 14,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const tech = [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Firebase",
    "PostgreSQL",
    "REST API",
    "Git",
    "Docker",
    "Kubernetes",
    "C++",
    "Python",
    "Golang",
    "SQL",
    "JavaScript",
    "HTML",
    "CSS",
    "CMS",
    "Canva",
    "Graphic Design",
    "UI/UX",
    "Agile Methodologies",
    "System Design",
    "RCA",
    "Vue.js"
  ];

  const areaRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [chipPositions, setChipPositions] = useState<ChipPosition[]>([]);

  const rand = useMemo(() => {
    const seed = Math.floor(Math.random() * 2 ** 31);
    let state = seed;
    return (min: number, max: number) => {
      state = (state * 1103515245 + 12345) % 2 ** 31;
      const normalized = state / 2 ** 31;
      return min + normalized * (max - min);
    };
  }, []);

  const measureChipSizes = (): ChipSize[] | null => {
    const sizes: ChipSize[] = [];
    for (let i = 0; i < tech.length; i++) {
      const el = chipRefs.current[i];
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      sizes.push({ width: rect.width, height: rect.height });
    }
    return sizes;
  };

  const generateChipPositions = (sizes?: ChipSize[] | null) => {
    const area = areaRef.current;
    if (!area) return;

    const rect = area.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (width <= 0 || height <= 0) return;

    const isMobile = width < 768;
    const margin = isMobile ? 14 : 24;
    const minDistance = isMobile ? 12 : 18;

    // Keep the middle relatively clear so chips don't sit on top of the photo.
    const avoidW = isMobile ? 260 : 430;
    const avoidH = isMobile ? 260 : 430;
    const avoidRect = {
      left: width / 2 - avoidW / 2,
      right: width / 2 + avoidW / 2,
      top: height / 2 - avoidH / 2,
      bottom: height / 2 + avoidH / 2,
    };

    const positions: ChipPosition[] = [];

    const fallbackSize: ChipSize = { width: isMobile ? 120 : 150, height: isMobile ? 32 : 36 };
    const getSize = (index: number) => sizes?.[index] ?? fallbackSize;

    const isInsideAvoid = (x: number, y: number, size: ChipSize) => {
      const left = x - size.width / 2;
      const right = x + size.width / 2;
      const top = y - size.height / 2;
      const bottom = y + size.height / 2;
      return right > avoidRect.left && left < avoidRect.right && bottom > avoidRect.top && top < avoidRect.bottom;
    };

    const isTooClose = (x: number, y: number, radius: number) =>
      positions.some((p) => {
        const dx = x - p.left;
        const dy = y - p.top;
        return Math.hypot(dx, dy) < minDistance + p.radius + radius;
      });

    for (let i = 0; i < tech.length; i++) {
      let placed = false;

      const size = getSize(i);
      const radius = Math.max(size.width, size.height) / 2;
      const xMin = margin + size.width / 2;
      const xMax = width - margin - size.width / 2;
      const yMin = margin + size.height / 2;
      const yMax = height - margin - size.height / 2;

      for (let attempt = 0; attempt < 120; attempt++) {
        const x = xMax > xMin ? rand(xMin, xMax) : width / 2;
        const y = yMax > yMin ? rand(yMin, yMax) : height / 2;

        if (isInsideAvoid(x, y, size)) continue;
        if (positions.length > 0 && isTooClose(x, y, radius)) continue;

        positions.push({
          left: x,
          top: y,
          rotate: rand(-4, 4),
          floatAmplitude: rand(4, isMobile ? 8 : 10),
          floatDuration: rand(2.8, 4.4),
          floatDelay: rand(0, 0.6),
          radius,
        });
        placed = true;
        break;
      }

      if (!placed) {
        positions.push({
          left: xMax > xMin ? rand(xMin, xMax) : width / 2,
          top: yMax > yMin ? rand(yMin, yMax) : height / 2,
          rotate: rand(-3, 3),
          floatAmplitude: rand(4, isMobile ? 8 : 10),
          floatDuration: rand(2.8, 4.4),
          floatDelay: rand(0, 0.6),
          radius,
        });
      }
    }

    setChipPositions(positions);
  };

  useEffect(() => {
    let raf = 0;
    const regenerate = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        const sizes = measureChipSizes();
        generateChipPositions(sizes);
      });
    };

    regenerate();

    window.addEventListener("resize", regenerate);

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => regenerate()) : null;
    if (ro && areaRef.current) ro.observe(areaRef.current);

    return () => {
      window.removeEventListener("resize", regenerate);
      if (ro) ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="about" className="h-screen flex flex-col justify-center px-6 md:px-8 bg-bg relative overflow-hidden">
      <motion.div className="absolute inset-0">
        <div ref={areaRef} className="absolute inset-0">
          {tech.map((label, index) => {
            const pos = chipPositions[index];

            return (
              <div
                key={label}
                className="absolute"
                style={{
                  left: pos ? pos.left : "50%",
                  top: pos ? pos.top : "50%",
                  transform: "translate(-50%, -50%)",
                  visibility: pos ? "visible" : "hidden",
                }}>
                <motion.div
                  className="px-4 py-2 rounded-full bg-bg-alt/80 backdrop-blur-sm border border-text-muted/20 text-text font-semibold text-xs sm:text-sm whitespace-nowrap"
                  ref={(el) => {
                    chipRefs.current[index] = el;
                  }}
                  style={{ transform: `rotate(${pos?.rotate ?? 0}deg)` }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: [0, -(pos?.floatAmplitude ?? 6), 0] }}
                  transition={{
                    opacity: { duration: 0.35, ease: "easeOut", delay: index * 0.05 },
                    y: { duration: pos?.floatDuration ?? 3.2, repeat: Infinity, ease: "easeInOut", delay: pos?.floatDelay ?? 0 },
                  }}
                  whileHover={{ y: -10, scale: 1.08, rotate: (pos?.rotate ?? 0) + (index % 2 === 0 ? -2 : 2) }}
                  whileTap={{ scale: 0.98 }}
                  >
                  {label}
                </motion.div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div className="max-w-7xl mx-auto relative z-10" variants={containerVariants} initial="hidden" animate="visible">
        <div className="flex flex-col items-center gap-10">
          <motion.div variants={imageVariants}>
            <div className="w-[200px] h-[200px] md:w-[320px] md:h-[320px] rounded-full shadow-2xl bg-bg-alt overflow-hidden">
              <img src="img/photomain.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Spacer so the center content still animates in nicely */}
          <motion.div className="hidden" variants={itemVariants} />
        </div>
      </motion.div>
    </section>
  );
};

export default About;
