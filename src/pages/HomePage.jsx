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
import MobileAdPopup from '../components/ui/MobileAdPopup';

export default function HomePage() {
  return (
    <main>
      <MobileAdPopup />
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
