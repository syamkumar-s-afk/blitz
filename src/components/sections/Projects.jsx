import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import AnimatedSection, { AnimatedItem } from "../ui/AnimatedSection";

const projects = [
  {
    type: "featured",
    image: "https://dental-henna-one.vercel.app/assets/hero_background.png",
    category: "Healthcare • Dental",
    title: "AURA DENTAL",
    description:
      "Premium dental care experience combining advanced technology with gentle patient-centered approach.",
    metric: "500",
    metricLabel: "Happy Patients",
    website: "https://dental-henna-one.vercel.app/",
    tags: ["Healthcare", "Web"],
  },
  {
    type: "regular",
    image: "/images/lumina-mobile.png",
    title: "LUMINA MOBILE",
    category: "Health & Wellness",
    metric: "1.2M",
    metricLabel: "Active Installs",
    gradient: "from-secondary-container to-secondary-fixed",
    tags: ["Mobile"],
  },
  {
    type: "regular",
    image: "/images/creativepluz.png",
    title: "CREATIVEPLUZ",
    category: "Personal / Professional Portfolios",
    metric: "2013",
    metricLabel: "Year Established",
    website: "https://creativepluz-gamma.vercel.app/",
    gradient: "from-tertiary-container to-tertiary-fixed",
    tags: ["Web"],
  },
];

const filters = ["All Work", "Mobile", "Web", "SaaS", "Desktop"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All Work");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All Work") {
      return projects;
    }
    return projects.filter((project) => project.tags?.includes(activeFilter));
  }, [activeFilter]);
  return (
    <div id="projects" className="scroll-mt-24">
      {/* Intro Hero Section */}
      <section className="px-8 max-w-screen-2xl mx-auto mb-32">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12">
          <div className="max-w-4xl">
            <AnimatedSection variant="fadeInUp">
              <span className="text-[0.6875rem] font-bold tracking-widest uppercase text-outline mb-4 block">
                Our Projects
              </span>
              <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] text-primary mb-12">
                Our
                <br />
                Work
              </h1>
            </AnimatedSection>
            <AnimatedSection variant="fadeInUp" delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <p className="text-xl leading-relaxed text-on-surface-variant font-medium">
                  We believe code is craft and pixels are poetry. Our philosophy
                  is rooted in structural precision and emotional resonance.
                </p>
                <p className="text-lg leading-relaxed text-outline">
                  Every project is a collaboration in architectural
                  thinking—building digital foundations that stand the test of
                  evolving technology.
                </p>
              </div>
            </AnimatedSection>
          </div>
          <AnimatedSection variant="scaleIn" delay={0.3}>
            <div className="hidden lg:block text-right">
              <span className="material-symbols-outlined text-8xl text-surface-container-highest">
                architecture
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Project Cards */}
      <section className="px-8 max-w-screen-2xl mx-auto space-y-24 mb-40">
        {/* Featured Project */}
        {filteredProjects
          .filter((p) => p.type === "featured")
          .map((project, index) => (
            <AnimatedSection key={index} variant="fadeInUp">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md:col-span-8"
                >
                  <motion.div
                    className="group cursor-pointer overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-low grain-texture"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <motion.img
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700"
                        src={project.image}
                      />
                    </div>
                    <div className="p-12 flex justify-between items-end">
                      <div>
                        <span className="text-[0.6875rem] font-bold uppercase tracking-tighter text-secondary mb-2 block">
                          {project.category}
                        </span>
                        <h3 className="text-4xl font-extrabold tracking-tighter">
                          {project.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-5xl font-black tracking-tighter text-primary">
                          {project.metric}
                        </span>
                        <p className="text-[0.6875rem] font-bold uppercase text-outline">
                          {project.metricLabel}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </a>
                <div className="md:col-span-4 space-y-6">
                  <p className="text-2xl font-bold tracking-tight leading-snug">
                    {project.description}
                  </p>
                  <div className="pt-6 border-t border-outline-variant/30">
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group no-underline"
                    >
                      <motion.span
                        className="w-12 h-12 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all"
                        whileHover={{ scale: 1.1, rotate: 45 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="material-symbols-outlined">
                          arrow_outward
                        </span>
                      </motion.span>
                      <span className="text-[0.6875rem] font-bold uppercase tracking-widest">
                        Open Website
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}

        {/* Regular Projects Grid */}
        <AnimatedSection variant="staggerContainer">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {filteredProjects
              .filter((p) => p.type === "regular")
              .map((project, index) => {
                const isLumina = project.title === "LUMINA MOBILE";
                const isCreativePluz = project.title === "CREATIVEPLUZ";
                const isKinetic = project.tags?.includes("Web");
                const usePlainImageCard = isLumina || (isKinetic && !isCreativePluz);

                return (
                  <AnimatedItem key={index}>
                    <motion.div
                      className="group cursor-pointer"
                      whileHover={usePlainImageCard ? undefined : { y: -12 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`aspect-square rounded-xl overflow-hidden mb-8 relative ${
                          usePlainImageCard
                            ? "bg-transparent"
                            : `bg-gradient-to-br ${project.gradient} grain-texture`
                        }`}
                      >
                        {isLumina ? (
                          <img
                            alt={project.title}
                            className="w-full h-full object-cover saturate-125 contrast-110"
                            src={project.image}
                          />
                        ) : (
                          <motion.img
                            alt={project.title}
                            className={`w-full h-full ${
                              isKinetic ? "object-cover" : "object-contain"
                            }`}
                            src={project.image}
                            whileHover={
                              isCreativePluz ? { scale: 1.15 } : isKinetic ? undefined : { scale: 1.05, rotate: 2 }
                            }
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-extrabold tracking-tighter">
                            {project.title}
                          </h3>
                          <p className="text-outline">{project.category}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-3xl font-bold tracking-tighter">
                            {project.metric}
                          </span>
                          <p className="text-[0.6875rem] font-bold uppercase text-outline">
                            {project.metricLabel}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatedItem>
                );
              })}
          </motion.div>
        </AnimatedSection>
      </section>
    </div>
  );
}
