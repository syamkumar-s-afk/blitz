import { motion } from 'framer-motion';
import AnimatedSection, { AnimatedItem } from '../ui/AnimatedSection';

const MotionDiv = motion.div;
const MotionSpan = motion.span;

const services = [
  {
    icon: 'smartphone',
    title: 'Mobile apps',
    description:
      'Native and cross-platform products with careful performance, clear UX, and release discipline.',
    features: ['iOS and Android', 'React Native or Flutter', 'App store launch support'],
    size: 'large',
  },
  {
    icon: 'language',
    title: 'Web platforms',
    description:
      'Fast, maintainable web apps for dashboards, internal tools, customer portals, and revenue products.',
    features: ['Product UX', 'Frontend systems', 'Backend integration'],
    size: 'large',
  },
  {
    icon: 'desktop_windows',
    title: 'Desktop software',
    features: ['Electron or native', 'Performance optimization', 'OS-level integration'],
    description: 'Operational tools for teams that need native-feeling workflows on larger screens.',
    size: 'small',
  },
  {
    icon: 'cloud_done',
    title: 'SaaS systems',
    description: 'Multi-tenant applications with clean admin flows, billing paths, and scalable foundations.',
    features: ['Multi-tenant architecture', 'Billing integration', 'Scalable infrastructure'],
    size: 'small',
  },
  {
    icon: 'integration_instructions',
    title: 'Internal tools',
    description: 'Custom workflows that remove repetitive work and give teams better operational visibility.',
    size: 'small',
  },
  {
    icon: 'draw',
    title: 'Product design',
    description: 'Interface design that clarifies the product instead of decorating it.',
    size: 'small',
  },
];

function ServiceCard({ icon, title, description, features, size }) {
  if (size === 'large') {
    return (
      <MotionDiv
        className="md:col-span-2 rounded-[1rem] md:rounded-xl border border-outline/20 bg-surface-container-lowest p-4 sm:p-5 md:p-10 transition-all group cursor-pointer hover:bg-surface-container flex flex-col justify-between"
        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <MotionSpan
            className="material-symbols-outlined mb-4 sm:mb-5 md:mb-8 inline-block text-[1.7rem] sm:text-3xl md:text-4xl"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </MotionSpan>
          <h3 className="mb-2.5 sm:mb-3 md:mb-4 text-[1.05rem] leading-[1.1] sm:text-[1.2rem] md:text-2xl font-bold tracking-tight uppercase">
            {title}
          </h3>
          <p className="mb-4 sm:mb-5 md:mb-8 max-w-md text-[0.84rem] leading-5 sm:text-sm md:text-base text-zinc-500">
            {description}
          </p>
        </div>
        {features && (
          <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 text-[0.62rem] sm:text-[0.68rem] md:text-xs font-bold uppercase tracking-tight md:tracking-tighter text-black">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span className="mt-1 text-[0.42rem]">•</span>
                {feature}
              </li>
            ))}
          </ul>
        )}
      </MotionDiv>
    );
  }

  return (
    <MotionDiv
      className="rounded-[1rem] md:rounded-xl border border-outline/20 bg-surface-container-lowest p-4 sm:p-5 md:p-8 transition-all cursor-pointer hover:bg-surface-container"
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <MotionSpan
        className="material-symbols-outlined mb-3 sm:mb-4 md:mb-6 inline-block text-[1.5rem] sm:text-[1.7rem] md:text-3xl"
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </MotionSpan>
      <h3 className="mb-2 sm:mb-2.5 md:mb-3 text-[0.98rem] leading-[1.1] sm:text-[1.05rem] md:text-xl font-bold tracking-tight uppercase">
        {title}
      </h3>
      <p className="text-[0.82rem] leading-5 sm:text-sm md:text-base text-zinc-500">{description}</p>
    </MotionDiv>
  );
}

export default function Services() {
  return (
    <div id="services" className="scroll-mt-24">
      <section className="px-4 sm:px-5 md:px-8 max-w-screen-2xl mx-auto mb-8 sm:mb-10 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 md:gap-8 items-end">
          <div className="md:col-span-8">
            <AnimatedSection variant="fadeInUp">
              <span className="inline-block rounded-sm bg-surface-container-highest px-2.5 py-1 sm:px-3 text-[0.6rem] sm:text-[0.6875rem] font-bold uppercase tracking-[0.16em] sm:tracking-widest text-black mb-4 sm:mb-5 md:mb-6">
                What We Build
              </span>
              <h1 className="mb-4 sm:mb-5 md:mb-8 text-[2.2rem] leading-[0.92] sm:text-[2.7rem] md:text-[5rem] font-black tracking-[-0.04em] uppercase text-black">
                Capabilities
              </h1>
            </AnimatedSection>
          </div>
          <div className="md:col-span-4 md:pb-4">
            <AnimatedSection variant="fadeInUp" delay={0.2}>
              <p className="max-w-sm text-[0.92rem] leading-6 sm:text-base md:text-lg md:leading-relaxed text-zinc-600">
                We help teams ship digital products with sharper scope, stronger execution, and
                fewer handoff problems.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-5 md:px-8 max-w-screen-2xl mx-auto mb-12 sm:mb-16 md:mb-32">
        <AnimatedSection variant="staggerContainer">
          <MotionDiv
            className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {services.filter((service) => service.size === 'large').map((service) => (
              <AnimatedItem key={service.title}>
                <ServiceCard {...service} />
              </AnimatedItem>
            ))}
            {services.filter((service) => service.size === 'small').map((service) => (
              <AnimatedItem key={service.title}>
                <ServiceCard {...service} />
              </AnimatedItem>
            ))}

            <AnimatedItem>
              <MotionDiv
                className="md:col-span-2 rounded-[1rem] md:rounded-xl bg-black p-4 sm:p-5 md:p-10 text-white flex items-start md:items-center justify-between overflow-hidden relative cursor-pointer"
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative z-10">
                  <h3 className="mb-2 text-[1rem] leading-[1.1] sm:text-[1.15rem] md:text-2xl font-black uppercase">
                    Backend and APIs
                  </h3>
                  <p className="max-w-xs pr-8 md:pr-0 text-[0.82rem] leading-5 sm:text-sm md:text-base text-zinc-400">
                    Secure, documented systems that keep frontend speed matched by backend reliability.
                  </p>
                </div>
                <span className="material-symbols-outlined absolute -right-4 sm:-right-6 md:-right-8 -bottom-4 sm:-bottom-6 md:-bottom-8 text-[5.5rem] sm:text-[7rem] md:text-[10rem] opacity-10">
                  database
                </span>
              </MotionDiv>
            </AnimatedItem>

            <AnimatedItem>
              <MotionDiv
                className="md:col-span-2 rounded-[1rem] md:rounded-xl grainy-gradient-services p-4 sm:p-5 md:p-10 flex items-start md:items-center justify-between overflow-hidden relative cursor-pointer"
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative z-10">
                  <h3 className="mb-2 text-[1rem] leading-[1.1] sm:text-[1.15rem] md:text-2xl font-black uppercase text-on-secondary-container">
                    Support and iteration
                  </h3>
                  <p className="max-w-xs pr-8 md:pr-0 text-[0.82rem] leading-5 sm:text-sm md:text-base text-on-secondary-fixed-variant">
                    Ongoing product support, refinement, and maintenance once the first release is live.
                  </p>
                </div>
                <span className="material-symbols-outlined absolute -right-4 sm:-right-6 md:-right-8 -bottom-4 sm:-bottom-6 md:-bottom-8 text-[5.5rem] sm:text-[7rem] md:text-[10rem] opacity-20">
                  rebase_edit
                </span>
              </MotionDiv>
            </AnimatedItem>
          </MotionDiv>
        </AnimatedSection>
      </section>
    </div>
  );
}
