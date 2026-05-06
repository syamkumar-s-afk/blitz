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
        className="md:col-span-2 p-10 bg-surface-container-lowest border border-outline/20 rounded-xl flex flex-col justify-between hover:bg-surface-container transition-all group cursor-pointer"
        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <MotionSpan
            className="material-symbols-outlined text-4xl mb-8 inline-block"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </MotionSpan>
          <h3 className="text-2xl font-bold tracking-tight mb-4 uppercase">{title}</h3>
          <p className="text-zinc-500 mb-8 max-w-md">{description}</p>
        </div>
        {features && (
          <ul className="space-y-3 font-bold text-xs uppercase tracking-tighter text-black">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span className="text-[0.5rem] mt-1">•</span>
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
      className="p-8 bg-surface-container-lowest border border-outline/20 rounded-xl hover:bg-surface-container transition-all cursor-pointer"
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <MotionSpan
        className="material-symbols-outlined text-3xl mb-6 inline-block"
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </MotionSpan>
      <h3 className="text-xl font-bold tracking-tight mb-3 uppercase">{title}</h3>
      <p className="text-sm text-zinc-500">{description}</p>
    </MotionDiv>
  );
}

export default function Services() {
  return (
    <div id="services" className="scroll-mt-24">
      <section className="px-8 max-w-screen-2xl mx-auto mb-14 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <AnimatedSection variant="fadeInUp">
              <span className="inline-block px-3 py-1 bg-surface-container-highest text-black font-bold text-[0.6875rem] uppercase tracking-widest mb-6 rounded-sm">
                What We Build
              </span>
              <h1 className="text-[3.5rem] md:text-[5rem] font-black leading-[0.9] tracking-[-0.04em] uppercase text-black mb-8">
                Capabilities
              </h1>
            </AnimatedSection>
          </div>
          <div className="md:col-span-4 md:pb-4">
            <AnimatedSection variant="fadeInUp" delay={0.2}>
              <p className="text-lg leading-relaxed text-zinc-600 max-w-sm">
                We help teams ship digital products with sharper scope, stronger execution, and
                fewer handoff problems.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="px-8 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <AnimatedSection variant="staggerContainer">
          <MotionDiv
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
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
                className="md:col-span-2 p-10 bg-black text-white rounded-xl flex items-center justify-between overflow-hidden relative cursor-pointer"
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-black uppercase mb-2">Backend and APIs</h3>
                  <p className="text-zinc-400 max-w-xs">
                    Secure, documented systems that keep frontend speed matched by backend reliability.
                  </p>
                </div>
                <span className="material-symbols-outlined text-[10rem] opacity-10 absolute -right-8 -bottom-8">
                  database
                </span>
              </MotionDiv>
            </AnimatedItem>

            <AnimatedItem>
              <MotionDiv
                className="md:col-span-2 p-10 grainy-gradient-services rounded-xl flex items-center justify-between overflow-hidden relative cursor-pointer"
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-black uppercase mb-2 text-on-secondary-container">
                    Support and iteration
                  </h3>
                  <p className="text-on-secondary-fixed-variant max-w-xs">
                    Ongoing product support, refinement, and maintenance once the first release is live.
                  </p>
                </div>
                <span className="material-symbols-outlined text-[10rem] opacity-20 absolute -right-8 -bottom-8">
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
