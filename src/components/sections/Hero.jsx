import { FiArrowRight, FiBriefcase } from 'react-icons/fi';
import AnimatedSection from '../ui/AnimatedSection';
import EcosystemConstellationDemo from '../ui/ecosystem-constellation-demo';

export default function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-24 pt-24 pb-14 md:pt-32 md:pb-20 px-8 max-w-screen-2xl mx-auto relative overflow-hidden bg-[#f9f9f9]"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-[2rem] md:rounded-[3rem]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f9f9f9_0%,#f4f2ee_100%)]" />
        <div className="absolute right-[-8%] top-0 h-[52%] w-[88%] overflow-hidden rounded-bl-[2.5rem] opacity-22 sm:h-[58%] sm:w-[84%] sm:opacity-26 md:right-0 md:h-[76%] md:w-[58%] md:rounded-bl-[4rem] md:opacity-40">
          <img
            src="/images/herobg.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(249,249,249,0.18)_0%,rgba(249,249,249,0.52)_100%)] md:bg-[linear-gradient(90deg,rgba(249,249,249,0.08)_0%,rgba(249,249,249,0.42)_100%)]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,200,187,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(212,227,255,0.22),transparent_32%)]" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:asym-grid-cols gap-12 items-center rounded-[2rem] md:rounded-[3rem] px-0 py-8 md:py-10">
        <div className="space-y-12">
          <AnimatedSection variant="fadeInUp">
            <h1 className="text-[40px] leading-[44px] tracking-[-0.04em] font-black text-primary sm:text-[48px] sm:leading-[52px] md:text-[64px] md:leading-[68px] lg:text-[82px] lg:leading-[86px] xl:text-[104px] xl:leading-[104px]">
              Build software
              <br />
              beyond limits
            </h1>
          </AnimatedSection>
          <AnimatedSection variant="fadeInUp" delay={0.2}>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-[1px] bg-primary"></div>
                <p className="text-[15px] leading-[24px] tracking-[-0.01em] font-medium text-neutral-600 max-w-md sm:text-[16px] sm:leading-[26px] md:text-[18px] md:leading-[30px] lg:text-[20px] lg:leading-[32px]">
                  A focused product studio for teams that need strong execution, honest communication,
                  and systems that can grow with the business.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-md">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold tracking-tight text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 sm:text-[15px]"
                >
                  <FiArrowRight aria-hidden="true" className="text-base" />
                  <span>Contact Us</span>
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-bold tracking-tight text-black transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:bg-zinc-50 sm:text-[15px]"
                >
                  <FiBriefcase aria-hidden="true" className="text-base" />
                  <span>Our Services</span>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
        
      </div>
    </section>
  );
}
