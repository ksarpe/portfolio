import { motion } from "framer-motion";
import React from "react";

import { Button } from "../ui";

type ProjectLink = {
  label: string;
  href: string;
};

type ProjectCard = {
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  imageSrc?: string;
  imageSrcMobile?: string;
  imageSrcDesktop?: string;
  liveUrl?: string;
  repoUrl?: string;
  links?: ProjectLink[];
  layoutClassName: string;
};

const openInNewTab = (href: string) => {
  window.open(href, "_blank", "noopener,noreferrer");
};

const Projects: React.FC = () => {
  const projects: ProjectCard[] = [
    {
      title: "Kredytomaniak",
      subtitle: "Business project",
      description:
        "Project for a mortgage comparison and advisory platform. Full-stack application with payments integration, premium features and user accounts. Liked by hundreds of users.",
      tags: ["Next.js", "PostgreSQL", "TypeScript"],
      imageSrc: "img/projects/kredytomaniak.png",
      liveUrl: "https://kredytomaniak.pl",
      repoUrl: "",
      layoutClassName: "col-span-12 md:col-span-6 md:row-span-3",
    },
    {
      title: "Planemy",
      subtitle: "Work in progress",
      description:
        "Modern planning full-stack app with real-time collaboration, task management, and calendar integration. Built in Next.js for frontend and Golang for backend. Project not yet launched. Beta version soon.",
      tags: ["Next.js", "GoLang", "PostgreSQL"],
      imageSrc: "img/projects/planemy.png",
      liveUrl: "https://planemy.com",
      repoUrl: "",
      layoutClassName: "col-span-12 md:col-span-6 md:row-span-2 ",
    },
    {
      title: "SkinSoClean",
      subtitle: "Beauty Brand",
      description:
        "E-commerce website for a skincare brand. Lead all aspects from design to deployment. Integrated with Shopper CMS for easy product management. Branding, graphics, and marketing materials also created on my side.",
      tags: ["Shopper CMS", "E-commerce", "Graphic Design"],
      imageSrc: "img/projects/skinsoclean.png",
      liveUrl: "https://skinsoclean.com",
      repoUrl: "",
      layoutClassName: "col-span-12 md:col-span-6 md:row-span-2 md:mt-2",
    },
    {
      title: "Robkas",
      subtitle: "Business project",
      description:
        "Landing page for a local construction company. Built with a headless CMS for easy content updates and SEO optimization.",
      tags: ["Next.js", "Headless CMS", "TypeScript"],
      imageSrc: "img/projects/robkas.png",
      liveUrl: "https://robkas.pl",
      repoUrl: "",
      layoutClassName: "col-span-12 md:col-span-6 md:row-span-3",
    },
    {
      title: "Personal ERP",
      subtitle: "For different projects",
      description:
        "Without link as it is personal system with limited access, used to manage various business projects, clients, invoices, and tasks. Custom-built to fit my workflow perfectly. Integrates lot of platforms like Allegro, Baselinker, Apaczka via APIs. Real-time package tracking and automated invoice generation included.",
      tags: ["Vue.js", "Firestore", "TypeScript"],
      imageSrc: "img/projects/personal-erp.png",
      liveUrl: "",
      repoUrl: "",
      layoutClassName: "col-span-12 md:col-span-6 md:row-span-3",
    },
    {
      title: "PlatformaJM",
      subtitle: "Scientific project",
      description:
        "I've led the development team of an AI real-time educational platform for learning sign language, featuring interactive lessons and video content.",
      tags: ["Vue.js", "PyTorch", "Flask"],
      imageSrc: "img/projects/migowy.png",
      liveUrl: "",
      repoUrl: "",
      layoutClassName: "col-span-12 md:col-span-6 md:row-span-2",
    },
  ];

  return (
    <section id="projects" className="h-screen bg-bg relative overflow-hidden">
      <div data-scrollable="true" className="h-full overflow-y-auto scrollbar-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[240px] md:auto-rows-[160px] gap-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 * index }}
                tabIndex={0}
                className={
                  `group relative overflow-hidden rounded-[32px] ` +
                  `bg-[var(--color-bg-alt)] ` +
                  `transition-transform duration-300 hover:-translate-y-1 ${project.layoutClassName}`
                }>
                {project.imageSrc || project.imageSrcDesktop || project.imageSrcMobile ? (
                  <picture className="absolute inset-0 w-full h-full">
                    {project.imageSrcMobile && <source media="(max-width: 768px)" srcSet={project.imageSrcMobile} />}
                    {project.imageSrcDesktop && <source media="(min-width: 769px)" srcSet={project.imageSrcDesktop} />}
                    <img
                      src={project.imageSrcDesktop ?? project.imageSrc ?? project.imageSrcMobile ?? ""}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      draggable={false}
                    />
                  </picture>
                ) : (
                  <div className="absolute inset-0 bg-[var(--color-bg-alt)]" />
                )}

                <div className="absolute inset-0 bg-[var(--color-bg)] opacity-0 transition-opacity duration-300 group-hover:opacity-10 group-focus-within:opacity-10" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div
                    className={
                      "rounded-2xl border border-[var(--color-text-muted-more)] bg-[var(--color-bg)] bg-opacity-90 backdrop-blur-md overflow-hidden " +
                      "transition-all duration-300 max-h-20 group-hover:max-h-[420px] group-focus-within:max-h-[420px]"
                    }>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-medium text-text-muted tracking-wide">{project.subtitle ?? ""}</p>
                          <h3 className="text-2xl font-bold text-text leading-tight mt-1">{project.title}</h3>
                        </div>
                        <div className="hidden sm:flex flex-wrap gap-2 justify-end">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-bg-alt)] text-text border border-[var(--color-text-muted-more)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
                        <p className="text-text-muted leading-relaxed">{project.description}</p>

                        {project.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2 sm:hidden">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-bg-alt)] text-text border border-[var(--color-text-muted-more)]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {project.links && project.links.length > 0 && (
                          <div className="mt-6 flex flex-wrap gap-6">
                            {project.links.map((link) => (
                              <Button key={link.href} className="text-sm" secondText="Open" onClick={() => openInNewTab(link.href)}>
                                {link.label}
                              </Button>
                            ))}
                          </div>
                        )}

                        {(project.liveUrl || project.repoUrl) && (
                          <div className="mt-6 flex flex-wrap gap-6">
                            {project.liveUrl && (
                              <Button className="text-sm" secondText="Open" onClick={() => openInNewTab(project.liveUrl!)}>
                                Live preview
                              </Button>
                            )}
                            {project.repoUrl && (
                              <Button className="text-sm" secondText="Open" onClick={() => openInNewTab(project.repoUrl!)}>
                                Code
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
