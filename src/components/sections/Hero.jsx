import { motion } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-24 pt-32 pb-20 px-8 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 lg:asym-grid-cols gap-12 items-center">
        <div className="space-y-12">
          <AnimatedSection variant="fadeInUp">
            <h1 className="text-[5rem] md:text-[7rem] leading-[0.9] font-black tracking-[-0.05em] text-primary">
              Build software<br />beyond limits
            </h1>
          </AnimatedSection>
          <AnimatedSection variant="fadeInUp" delay={0.2}>
            <div className="flex items-center gap-6">
              <div className="w-16 h-[1px] bg-primary"></div>
              <p className="text-xl max-w-md font-medium text-on-surface-variant">
                An architectural approach to digital engineering. We craft high-performance systems for the
                next generation of industry leaders.
              </p>
            </div>
          </AnimatedSection>
        </div>
        <AnimatedSection variant="scaleIn" delay={0.3}>
          <motion.div 
            className="relative h-[600px] rounded-3xl overflow-hidden grainy-gradient border border-outline/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              className="w-full h-full object-cover mix-blend-overlay"
              alt="Abstract 3D geometric shapes"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR-XONMeZHvWDhvtS_UgIMpfHKF-cDRV6HWygPFTm4aLoc4rH7WIkZCX7OViskUFtfR2ZR1LHOhkK33wi1aXk7sVN2umQRNcj4SUSQ-yq4LSsxj4tqYnlEdTmMhHWBKD7iDj04ODZp9F0lrdrbg8g8SLSkI3j1tq7LJVveulJve2Iq1O2hatX5OFp1HeyyRTy9kZG0WagedyFiHpmsLwjhFQCO0e8L-OgPNvqzUlk-qCaHNZuwI0oPa0H4hHl1NkjsidHq4PmqJVc" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-[120px] text-primary/10">deployed_code</span>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
