import './index.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Footer, Navbar } from './components';
import AiChatbot from './components/ui/AiChatbot';
import AdminPage from './pages/AdminPage';
import CareersPage from './pages/CareersPage';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1);

      requestAnimationFrame(() => {
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });

      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="bg-background text-on-background selection:bg-secondary-container selection:text-on-secondary-container scroll-smooth">
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      </Routes>

      <Footer />
      <AiChatbot />
    </div>
  );
}
