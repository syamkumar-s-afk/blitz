import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection, { AnimatedItem } from '../ui/AnimatedSection';

const projects = [
  {
    type: 'featured',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCynhPzIb-5s7EcjDdu1XKTTxVl37Yi-DQ4I1ShORTIgvB_x6q0-GC0GrYHmpVsB8CQEO2qVf_Ln6TxJKgTVoGzZVgXIwDsfwaO13-QkUK5JuhoNIAtGIQoF610M1nOR22JfSXdfFYCXqu6KZijl0PwzXjeCLkrIPKDKyx50kWzEQE4HFcg7S2Im4bt7cKnv68jcyPyeJ3pokLEwmxRIcvPZGfyb7jnpKrSr64W5B7FZ42W7IqQZn2rWHsgs88VjzOWMu2QNx872gA',
    category: 'FinTech • SaaS',
    title: 'VANTAGE PLATFORM',
    description: 'Architecting the future of institutional trading through minimalist clarity.',
    metric: '150%',
    metricLabel: 'Growth in UX Retention',
    tags: ['SaaS', 'Web']
  },
  {
    type: 'regular',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1o6B9nRgTU4LhZGgRGfF-b0qQ3IlwNufZNCVqw2J9oD8fySIK9ENuk7PVb_HnbsZU9TNreTsT48sVSA31jhFTBheQlzlIkruwlmdBwCISBJQjHqIIZV5hPkFXvv-D-vGh-UKCJvVyNVzrmOK_e47tBNXhsuusR4Fsb4lXP0W-gg5SBvyLHqJvTPkDFz3-YcwHeE93U0m9H-NsHyi7MY-tjarVSSu81TD6g-8UvkQwgjwt9555OW4Ywy6B9xnY_d3Tl6BzLWKRTLo',
    title: 'LUMINA MOBILE',
    category: 'Health & Wellness',
    metric: '1.2M',
    metricLabel: 'Active Installs',
    gradient: 'from-secondary-container to-secondary-fixed',
    tags: ['Mobile']
  },
  {
    type: 'regular',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtL6NvVXnAMo2StRhY4V587sxAjiJDjxJRVlRF-OhwxQc6kzqtLXjr2_pUuFLblZKyj14KuusTL2yVsDaCjzx9AO1x6kQZZaWQWy0VXA7DlgAI1bPKrynkjnLmjpxyIFpua_oFBgxZubFZS6hyZ4qsQ__G18Yu0qpDtbxj6Hsvu2zn6cQi-QamrfI1BFf7cnGpSRrwdW1JyG46wjp_n7Z3PDCcMGeP_bYA-grcp151maz_FuICVG9sJ6gpunoXdclP9BHB76x54ys',
    title: 'KINETIC WEB',
    category: 'Creative Portfolio',
    metric: '0.4s',
    metricLabel: 'Load Speed Average',
    gradient: 'from-tertiary-container to-tertiary-fixed',
    tags: ['Web']
  }
];

const filters = ['All Work', 'Mobile', 'Web', 'SaaS', 'Desktop'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All Work');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All Work') {
      return projects;
    }
    return projects.filter(project => project.tags?.includes(activeFilter));
  }, [activeFilter]);
  return (
    <div id="projects" className="scroll-mt-24">
      {/* Intro Hero Section */}
      <section className="px-8 max-w-screen-2xl mx-auto mb-32">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12">
          <div className="max-w-4xl">
            <AnimatedSection variant="fadeInUp">
              <span className="text-[0.6875rem] font-bold tracking-widest uppercase text-outline mb-4 block">Portfolio Vol. 04</span>
              <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] text-primary mb-12">
                Selected<br/>Work
              </h1>
            </AnimatedSection>
            <AnimatedSection variant="fadeInUp" delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <p className="text-xl leading-relaxed text-on-surface-variant font-medium">
                  We believe code is craft and pixels are poetry. Our philosophy is rooted in structural precision and emotional resonance.
                </p>
                <p className="text-lg leading-relaxed text-outline">
                  Every project is a collaboration in architectural thinking—building digital foundations that stand the test of evolving technology.
                </p>
              </div>
            </AnimatedSection>
          </div>
          <AnimatedSection variant="scaleIn" delay={0.3}>
            <div className="hidden lg:block text-right">
              <span className="material-symbols-outlined text-8xl text-surface-container-highest">architecture</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Buttons */}
      <AnimatedSection variant="fadeInUp">
        <section className="px-8 max-w-screen-2xl mx-auto mb-16">
          <div className="flex flex-wrap gap-4 items-center border-b border-outline-variant pb-8">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest transition-colors ${
                  activeFilter === filter
                    ? 'bg-primary text-white' 
                    : 'border border-outline-variant hover:border-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Featured Project Cards */}
      <section className="px-8 max-w-screen-2xl mx-auto space-y-24 mb-40">
        {/* Featured Project */}
        {filteredProjects.filter(p => p.type === 'featured').map((project, index) => (
          <AnimatedSection key={index} variant="fadeInUp">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <motion.div 
                className="md:col-span-8 group cursor-pointer overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-low grain-texture"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <motion.img 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale transition-all duration-700 scale-105" 
                    src={project.image}
                    whileHover={{ scale: 1, filter: 'grayscale(0%)' }}
                  />
                </div>
                <div className="p-12 flex justify-between items-end">
                  <div>
                    <span className="text-[0.6875rem] font-bold uppercase tracking-tighter text-secondary mb-2 block">{project.category}</span>
                    <h3 className="text-4xl font-extrabold tracking-tighter">{project.title}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-5xl font-black tracking-tighter text-primary">{project.metric}</span>
                    <p className="text-[0.6875rem] font-bold uppercase text-outline">{project.metricLabel}</p>
                  </div>
                </div>
              </motion.div>
              <div className="md:col-span-4 space-y-6">
                <p className="text-2xl font-bold tracking-tight leading-snug">{project.description}</p>
                <div className="pt-6 border-t border-outline-variant/30">
                  <motion.button 
                    className="flex items-center gap-4 group"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span 
                      className="w-12 h-12 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all"
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="material-symbols-outlined">arrow_outward</span>
                    </motion.span>
                    <span className="text-[0.6875rem] font-bold uppercase tracking-widest">View Case Study</span>
                  </motion.button>
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
            {filteredProjects.filter(p => p.type === 'regular').map((project, index) => (
              <AnimatedItem key={index}>
                <motion.div 
                  className="group cursor-pointer"
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`aspect-square rounded-xl overflow-hidden bg-gradient-to-br ${project.gradient} grain-texture mb-8 relative`}>
                    <motion.img 
                      alt={project.title}
                      className="absolute inset-12 object-contain drop-shadow-2xl" 
                      src={project.image}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-extrabold tracking-tighter">{project.title}</h3>
                      <p className="text-outline">{project.category}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold tracking-tighter">{project.metric}</span>
                      <p className="text-[0.6875rem] font-bold uppercase text-outline">{project.metricLabel}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedItem>
            ))}
          </motion.div>
        </AnimatedSection>
      </section>
    </div>
  );
}
