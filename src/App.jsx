import './index.css';
import {
  Navbar,
  Footer,
  Hero,
  ClientStrip,
  ValueProps,
  Services,
  EngagementModels,
  TechStack,
  FAQ,
  Projects,
  KPISection,
  Testimonials,
  About,
  Contact
} from './components';

export default function App() {
  return (
    <div className="bg-background text-on-background selection:bg-secondary-container selection:text-on-secondary-container scroll-smooth">
      <Navbar />

      <main>
        <Hero />
        <ClientStrip />
        <ValueProps />
        <Services />
        <EngagementModels />
        <TechStack />
        <FAQ />
        <Projects />
        <KPISection />
        <Testimonials />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
