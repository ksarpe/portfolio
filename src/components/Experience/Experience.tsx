import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  tech: string[];
};

const timeline: TimelineItem[] = [
  {
    year: "2016",
    title: "Programming journey begins",
    description:
      "First projects, books, and simple web pages with HTML/CSS/JS. Started to create small applications, used later on daily basis in school, with friends etc. Some automations.",
    tech: ["C++", "HTML", "CSS", "PHP", "Java"],
  },
  {
    year: "2019",
    title: "Own Web Development business",
    description:
      "Re-building websites for local businesses, creating custom themes and plugins for WordPress. Helping with SEO and online presence.",
    tech: ["WordPress", "CSS", "Graphic Design", "JavaScript"],
  },
  {
    year: "2021",
    title: "Bachelor's in Computer Science",
    description:
      "Specialization in Databases. Thesis about real-time regatta tracking system using GPS and mobile networks. Focus on algorithms, data structures, databases, and software engineering principles.",
    tech: ["Python", "Java", "SQL", "API"],
  },
  {
    year: "2021",
    title: "Full-time job in Ericsson",
    description:
      "Working on telecom software, focusing on performance optimization and scalability. Collaborating in an agile team environment. In the meantime, managing other freelance projects - mainly web development.",
    tech: ["C++", "Git", "Agile", "Golang", "Docker", "K8s"],
  },
  {
    year: "2024",
    title: "Master's in Computer Science",
    description:
      "Specializing in Artificial Intelligence and Machine Learning. Master's thesis on deep learning techniques for computer vision tasks, achieving state-of-the-art results on benchmark datasets. Managing school project developing AI sign language application.",
    tech: ["Vue.js", "Tailwind CSS", "Python", "PyTorch"],
  },
  {
    year: "Now",
    title: "Ericsson + Freelance Web Development",
    description:
      "Working full-time in Ericsson, focusing on big telcom projects. In the meantime, doing freelance web development projects for various clients and personal businesses.",
    tech: ["Next.js", "Tailwind CSS", "Three.js", "Typescript", "Golang", "C++", "Python"],
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const WHEEL_STEP_THRESHOLD = 40;

const Experience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActiveSection, setIsActiveSection] = useState(false);

  const activeIndexRef = useRef(0);
  const wheelAccumRef = useRef(0);

  const lastIndex = timeline.length - 1;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const onSectionChange = (event: Event) => {
      const custom = event as CustomEvent<{ id?: string; index?: number }>;
      if (custom.detail?.id !== "experience") return;
      wheelAccumRef.current = 0;
      setActiveIndex(0);
      setIsActiveSection(true);
    };

    window.addEventListener("fullpage:change", onSectionChange as EventListener);
    return () => window.removeEventListener("fullpage:change", onSectionChange as EventListener);
  }, []);

  useEffect(() => {
    const onSectionChange = (event: Event) => {
      const custom = event as CustomEvent<{ id?: string; index?: number }>;
      setIsActiveSection(custom.detail?.id === "experience");
      if (custom.detail?.id !== "experience") wheelAccumRef.current = 0;
    };
    window.addEventListener("fullpage:change", onSectionChange as EventListener);
    return () => window.removeEventListener("fullpage:change", onSectionChange as EventListener);
  }, []);

  useEffect(() => {
    const onWheelCapture = (event: WheelEvent) => {
      if (!isActiveSection) return;
      if (event.ctrlKey) return;

      const current = activeIndexRef.current;

      // At boundaries, let ScrollContainer handle section navigation.
      if ((event.deltaY > 0 && current >= lastIndex) || (event.deltaY < 0 && current <= 0)) {
        wheelAccumRef.current = 0;
        return;
      }

      // Otherwise: block page/section scroll and step through timeline points.
      event.preventDefault();
      event.stopPropagation();

      wheelAccumRef.current += event.deltaY;
      if (Math.abs(wheelAccumRef.current) < WHEEL_STEP_THRESHOLD) return;

      const delta = wheelAccumRef.current;
      wheelAccumRef.current = 0;

      setActiveIndex((prev) => {
        const next = prev + (delta > 0 ? 1 : -1);
        return Math.max(0, Math.min(lastIndex, next));
      });
    };

    window.addEventListener("wheel", onWheelCapture, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", onWheelCapture as EventListener, { capture: true } as AddEventListenerOptions);
  }, [isActiveSection, lastIndex]);

  const item = timeline[activeIndex];

  return (
    <section id="experience" className="h-screen flex flex-col justify-center px-4 md:px-12 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 h-full flex items-center">
        <div className="flex-1 flex items-center justify-center h-full">
          <div className="w-full max-w-5xl">
            <div className="relative grid grid-cols-[24px_1fr] md:grid-cols-[32px_1fr] gap-6 md:gap-10 items-stretch min-h-[60vh]">
              {/* Left vertical timeline with dots (static; only highlight changes) */}
              <div className="relative flex flex-col items-center justify-between py-6">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-text-muted/30" />

                {timeline.map((t, idx) => {
                  const isActive = idx === activeIndex;

                  return (
                    <div key={`${t.year}-${t.title}-${idx}`} className="relative z-10">
                      <div
                        className={`rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-5 h-5 md:w-6 md:h-6 bg-primary ring-4 ring-primary/20"
                            : "w-3.5 h-3.5 md:w-4 md:h-4 bg-white/10 ring-1 ring-text-muted/30"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Content (animated only) */}
              <motion.div
                key={item.year}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="rounded-3xl bg-bg-alt/40 backdrop-blur-sm p-6 sm:p-8 md:p-16 min-h-[40vh] flex flex-col justify-center">
                <div className="inline-flex items-center gap-3 md:gap-4 mb-4 flex-wrap">
                  <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/15 text-primary text-sm md:text-base font-semibold">
                    {item.year}
                  </span>
                  <h3 className="text-text text-3xl sm:text-4xl md:text-4xl font-bold leading-tight">{item.title}</h3>
                </div>

                <p className="text-text-muted leading-relaxed mt-4 md:mt-6 text-base sm:text-lg md:text-2xl">{item.description}</p>

                <div className="mt-5 md:mt-6 flex flex-wrap gap-2 md:gap-3">
                  {item.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm md:text-base">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
