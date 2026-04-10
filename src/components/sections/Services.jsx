import { motion } from 'framer-motion';
import AnimatedSection, { AnimatedItem } from '../ui/AnimatedSection';

const services = [
  {
    icon: 'smartphone',
    title: 'Mobile app development',
    description: 'Native and cross-platform mobile solutions designed for performance and intuitive user journeys.',
    features: ['iOS & Android Native', 'Flutter & React Native', 'Performance Optimization'],
    size: 'large'
  },
  {
    icon: 'language',
    title: 'Web app development',
    description: 'Scalable, secure, and highly-performant web applications that power modern business operations.',
    features: ['Progressive Web Apps', 'Interactive Dashboards', 'Enterprise Systems'],
    size: 'large'
  },
  {
    icon: 'desktop_windows',
    title: 'Desktop apps',
    description: 'Robust desktop solutions for Windows and macOS with native feel.',
    size: 'small'
  },
  {
    icon: 'cloud_done',
    title: 'SaaS Products',
    description: 'Multi-tenant architecture and subscription management platforms.',
    size: 'small'
  },
  {
    icon: 'integration_instructions',
    title: 'Business tools',
    description: 'Custom internal workflows and automation systems.',
    size: 'small'
  },
  {
    icon: 'draw',
    title: 'UI/UX Design',
    description: 'Editorial-grade aesthetics meeting rigorous user experience.',
    size: 'small'
  }
];

function ServiceCard({ icon, title, description, features, size }) {
  if (size === 'large') {
    return (
      <motion.div 
        className="md:col-span-2 p-10 bg-surface-container-lowest border border-outline/20 rounded-xl flex flex-col justify-between hover:bg-surface-container transition-all group cursor-pointer"
        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <motion.span 
            className="material-symbols-outlined text-4xl mb-8 inline-block"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.span>
          <h3 className="text-2xl font-bold tracking-tight mb-4 uppercase">{title}</h3>
          <p className="text-zinc-500 mb-8 max-w-md">{description}</p>
        </div>
        {features && (
          <ul className="space-y-3 font-bold text-xs uppercase tracking-tighter text-black">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-[0.5rem] mt-1">●</span> {feature}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="p-8 bg-surface-container-lowest border border-outline/20 rounded-xl hover:bg-surface-container transition-all cursor-pointer"
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <motion.span 
        className="material-symbols-outlined text-3xl mb-6 inline-block"
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.span>
      <h3 className="text-xl font-bold tracking-tight mb-3 uppercase">{title}</h3>
      <p className="text-sm text-zinc-500">{description}</p>
    </motion.div>
  );
}

export default function Services() {
  return (
    <div id="services" className="scroll-mt-24">
      {/* Hero Section */}
      <section className="px-8 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <AnimatedSection variant="fadeInUp">
              <span className="inline-block px-3 py-1 bg-surface-container-highest text-black font-bold text-[0.6875rem] uppercase tracking-widest mb-6 rounded-sm">Our Expertise</span>
              <h1 className="text-[3.5rem] md:text-[5rem] font-black leading-[0.9] tracking-[-0.04em] uppercase text-black mb-8">
                Capabilities
              </h1>
            </AnimatedSection>
          </div>
          <div className="md:col-span-4 md:pb-4">
            <AnimatedSection variant="fadeInUp" delay={0.2}>
              <p className="text-lg leading-relaxed text-zinc-600 max-w-sm">
                Architecting digital solutions that bridge the gap between technical rigor and creative expression. We build for the future of the web.
              </p>
            </AnimatedSection>
          </div>
        </div>
        <AnimatedSection variant="scaleIn" delay={0.3}>
          <motion.div 
            className="mt-16 w-full h-[400px] rounded-xl overflow-hidden grayscale contrast-125"
            whileHover={{ scale: 1.02, filter: 'grayscale(0%)' }}
            transition={{ duration: 0.4 }}
          >
            <img 
              alt="Modern architecture" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRluZFJ4487qBEWJaR_Agsn_PnbVCHHMqHDzTWV1tVq1fic9cDLvK0SZSfbMtIvYO2QxNwp3G-Oz5wYpfx2pSuxFDno-Q7Lm5BVAnDFpf9lRe2YXuF2ZdAarBMxRBu_LB73KJRMhOvXlPE-wwvftn8zDspzdNbP5uytCv7ySeRnWcrMHntcC4iwrTCAZAw8c8coCX0NaU6SCOioB28R20SMqesaLoePIRIcsOAuz9t04hLzIxLi9H3TDeisns6pxJWyfEX95Xvfvw"
            />
          </motion.div>
        </AnimatedSection>
      </section>

      {/* Service Detail Cards (Bento Grid) */}
      <section className="px-8 max-w-screen-2xl mx-auto mb-32">
        <AnimatedSection variant="staggerContainer">
          <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-6" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            {services.filter(s => s.size === 'large').map((service, index) => (
              <AnimatedItem key={index}>
                <ServiceCard {...service} />
              </AnimatedItem>
            ))}
            {services.filter(s => s.size === 'small').map((service, index) => (
              <AnimatedItem key={index}>
                <ServiceCard {...service} />
              </AnimatedItem>
            ))}
            
            {/* Backend/API Card */}
            <AnimatedItem>
              <motion.div 
                className="md:col-span-2 p-10 bg-black text-white rounded-xl flex items-center justify-between overflow-hidden relative cursor-pointer"
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-black uppercase mb-2">Backend/API</h3>
                  <p className="text-zinc-400 max-w-xs">The engine room: secure, lightning-fast data architecture.</p>
                </div>
                <span className="material-symbols-outlined text-[10rem] opacity-10 absolute -right-8 -bottom-8">database</span>
              </motion.div>
            </AnimatedItem>

            {/* Support/Maintenance Card */}
            <AnimatedItem>
              <motion.div 
                className="md:col-span-2 p-10 grainy-gradient-services rounded-xl flex items-center justify-between overflow-hidden relative cursor-pointer"
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-black uppercase mb-2 text-on-secondary-container">Support/Maintenance</h3>
                  <p className="text-on-secondary-fixed-variant max-w-xs">Ensuring longevity and constant evolution of your product.</p>
                </div>
                <span className="material-symbols-outlined text-[10rem] opacity-20 absolute -right-8 -bottom-8">rebase_edit</span>
              </motion.div>
            </AnimatedItem>
          </motion.div>
        </AnimatedSection>
      </section>
    </div>
  );
}
