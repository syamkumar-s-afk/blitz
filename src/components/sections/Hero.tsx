import { motion } from "framer-motion";
import AnimatedSection from "../ui/AnimatedSection";
import EcosystemConstellationDemo from "../ui/ecosystem-constellation-demo";

export default function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-24 pt-32 pb-20 px-8 max-w-screen-2xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:asym-grid-cols gap-12 items-center">
        <div className="space-y-12">
          <AnimatedSection variant="fadeInUp">
            <h1 className="text-[5rem] md:text-[7rem] leading-[0.9] font-black tracking-[-0.05em] text-primary">
              Build software
              <br />
              beyond limits
            </h1>
          </AnimatedSection>
          <AnimatedSection variant="fadeInUp" delay={0.2}>
            <div className="flex items-center gap-6">
              <div className="w-16 h-[1px] bg-primary"></div>
              <p className="text-xl max-w-md font-medium text-on-surface-variant">
                An architectural approach to digital engineering. We craft
                high-performance systems for the next generation of industry
                leaders.
              </p>
            </div>
          </AnimatedSection>
        </div>
        <AnimatedSection variant="scaleIn" delay={0.3}>
          <div className="relative">
            <EcosystemConstellationDemo />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
