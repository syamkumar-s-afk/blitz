import './index.css';
import { Route, Routes } from 'react-router-dom';
import { Footer, Navbar } from './components';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';

export default function App() {
  return (
    <div className="bg-background text-on-background selection:bg-secondary-container selection:text-on-secondary-container scroll-smooth">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      </Routes>

      <Footer />
    </div>
  );
}
