import {
  About,
  ClientStrip,
  Contact,
  EngagementModels,
  FAQ,
  Hero,
  KPISection,
  Projects,
  Services,
  TechStack,
  Testimonials,
  ValueProps,
} from '../components';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ClientStrip />
      <ValueProps />
      <Services />
      <EngagementModels />
      <TechStack />
      <Projects /><Contact />
      <FAQ />
      <KPISection />
      <Testimonials />
      {/* <About /> */}
      
    </main>
  );
}
