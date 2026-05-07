import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import AnimatedSection, { AnimatedItem } from '../ui/AnimatedSection';
import ImageLightbox from '../ui/ImageLightbox';
import { projectCategories, projects } from '../../data/projects';

const MotionDiv = motion.div;
const MotionImage = motion.img;

function ProjectAction({ project, compact = false }) {
  const baseClasses = compact
    ? 'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-[0.52rem] sm:px-3 sm:py-2 sm:text-[0.58rem] tracking-[0.14em] sm:tracking-[0.16em]'
    : 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-[0.62rem] md:px-5 md:py-3 md:text-[0.72rem] tracking-[0.16em] md:tracking-[0.18em]';

  if (project.action.type === 'demo') {
    return (
      <a
        href={project.action.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} border-black bg-black font-bold uppercase text-white transition-colors hover:bg-zinc-800`}
      >
        <FiArrowUpRight aria-hidden="true" />
        {compact ? 'View Demo' : project.action.label}
      </a>
    );
  }

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`${baseClasses} border-black/10 bg-white font-bold uppercase text-black transition-colors hover:bg-zinc-50`}
    >
      {compact ? 'View Details' : project.action.label}
    </Link>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All Work');
  const [previewImage, setPreviewImage] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All Work') {
      return projects;
    }

    return projects.filter((project) => project.tags?.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div id="projects" className="scroll-mt-24">
      <ImageLightbox
        isOpen={Boolean(previewImage)}
        src={previewImage?.src}
        alt={previewImage?.alt}
        onClose={() => setPreviewImage(null)}
      />

      <section className="px-3.5 sm:px-5 md:px-8 max-w-screen-2xl mx-auto mb-7 md:mb-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-5 md:gap-8">
          <div className="max-w-2xl">
            <AnimatedSection variant="fadeInUp">
              <span className="text-[0.625rem] md:text-[0.6875rem] font-bold tracking-widest uppercase text-outline mb-3 md:mb-4 block">
                Selected Work
              </span>
              <h1 className="text-[30px] leading-[30px] sm:text-[34px] sm:leading-[34px] md:text-[72px] md:leading-[72px] font-extrabold tracking-[-0.05em] text-primary mb-3 md:mb-6">
                Projects
              </h1>
            </AnimatedSection>
            <AnimatedSection variant="fadeInUp" delay={0.2}>
              <p className="max-w-xl text-[13px] leading-[1.45] sm:text-[14px] sm:leading-6 md:text-[18px] md:leading-[30px] font-medium text-zinc-600">
                A tighter project system built to support demos now and detailed case-study pages as the portfolio grows.
              </p>
            </AnimatedSection>
          </div>
          <AnimatedSection variant="scaleIn" delay={0.3}>
            <div className="hidden lg:block text-right">
              <span className="material-symbols-outlined text-7xl text-surface-container-highest">
                architecture
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="px-3.5 sm:px-5 md:px-8 max-w-screen-2xl mx-auto mb-5 md:mb-12">
        <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
          {projectCategories.map((filter) => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 text-[10px] sm:text-[11px] md:text-sm font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] md:tracking-widest transition-colors ${
                  isActive ? 'bg-black text-white' : 'bg-surface-container text-zinc-600 hover:text-black'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-3.5 sm:px-5 max-w-screen-2xl mx-auto mb-10 md:hidden">
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {filteredProjects.map((project) => (
            <AnimatedSection key={`${project.slug}-mobile`} variant="fadeInUp">
              <div className="h-full overflow-hidden rounded-[0.95rem] sm:rounded-[1.15rem] border border-black/8 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.035)]">
                <div
                  className={`aspect-[4/4.3] sm:aspect-[4/4.6] overflow-hidden bg-gradient-to-br ${
                    project.gradient || 'from-zinc-100 to-zinc-200'
                  } grain-texture`}
                >
                  <MotionImage
                    alt={project.title}
                    className="h-full w-full cursor-zoom-in object-cover"
                    onClick={() => setPreviewImage({ src: project.image, alt: project.title })}
                    src={project.image}
                  />
                </div>

                <div className="p-2.5 sm:p-3.5">
                  <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
                    <span className="text-[0.48rem] sm:text-[0.55rem] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-zinc-400">
                      {project.category}
                    </span>
                    <span className="rounded-full bg-surface-container-low px-1.5 py-[0.3rem] sm:px-2 sm:py-1 text-[0.46rem] sm:text-[0.5rem] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-zinc-500">
                      {project.tags[0]}
                    </span>
                  </div>

                  <h3 className="text-[0.88rem] leading-[1.05] sm:text-[1rem] sm:leading-[1.1] font-black tracking-[-0.04em] text-black">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 min-h-[3.1rem] sm:min-h-[3.75rem] text-[0.66rem] leading-[1.05rem] sm:text-[0.74rem] sm:leading-5 text-zinc-600">
                    {project.summary}
                  </p>

                  <div className="mt-2.5 flex justify-start pt-2.5 sm:mt-3 sm:pt-3 border-t border-black/6">
                    <ProjectAction project={project} compact />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="hidden md:block px-5 md:px-8 max-w-screen-2xl mx-auto mb-12 md:mb-32">
        <AnimatedSection variant="staggerContainer">
          <MotionDiv
            className="grid grid-cols-2 gap-5 xl:gap-6"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {filteredProjects.map((project) => (
              <AnimatedItem key={project.slug}>
                <div className="rounded-[1.5rem] xl:rounded-[1.75rem] border border-black/8 bg-white p-5 xl:p-6 h-full">
                  <MotionDiv
                    className="group cursor-pointer"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`aspect-[4/3] rounded-[1rem] xl:rounded-[1.25rem] overflow-hidden mb-4 xl:mb-5 relative bg-gradient-to-br ${
                        project.gradient || 'from-zinc-100 to-zinc-200'
                      } grain-texture`}
                    >
                      <MotionImage
                        alt={project.title}
                        className="w-full h-full cursor-zoom-in object-cover"
                        onClick={() => setPreviewImage({ src: project.image, alt: project.title })}
                        src={project.image}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    <div className="space-y-4 xl:space-y-5">
                      <div className="flex items-center justify-between gap-3 xl:gap-4">
                        <span className="text-[0.62rem] xl:text-[0.6875rem] font-bold uppercase tracking-[0.18em] xl:tracking-[0.2em] text-zinc-400">
                          {project.category}
                        </span>
                        <span className="w-fit rounded-full border border-black/8 bg-surface-container-low px-3 py-1.5 xl:py-2 text-[0.58rem] xl:text-[0.65rem] font-bold uppercase tracking-[0.16em] xl:tracking-[0.18em] text-zinc-500">
                          {project.tags[0]}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-[1.55rem] leading-[1.02] xl:text-[1.8rem] xl:leading-[1.08] font-black tracking-[-0.04em] text-black">
                          {project.title}
                        </h3>
                        <p className="mt-2.5 xl:mt-3 text-[0.92rem] leading-6 xl:text-[1rem] xl:leading-7 text-zinc-600">
                          {project.summary}
                        </p>
                      </div>

                      <div className="pt-4 xl:pt-5 border-t border-black/8">
                        <ProjectAction project={project} />
                      </div>
                    </div>
                  </MotionDiv>
                </div>
              </AnimatedItem>
            ))}
          </MotionDiv>
        </AnimatedSection>
      </section>
    </div>
  );
}
