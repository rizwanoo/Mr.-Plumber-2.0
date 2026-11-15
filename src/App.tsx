import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkAboutPage } from './pages/WorkAboutPage';
import { ContactPage } from './pages/ContactPage';
import type { PageRoute } from './data/plumbingData';

const PAGE_TITLES: Record<PageRoute, string> = {
  home: 'Mr. Plumber 2.0 – Plumbing & Pipe Systems in Charlottesville, VA',
  services: 'Plumbing Services & Materials | Mr. Plumber 2.0 – Charlottesville, VA',
  'work-about': 'Our Work & About | Mr. Plumber 2.0 – Charlottesville, VA',
  contact: 'Contact & Service Inquiry | Mr. Plumber 2.0 – Charlottesville, VA',
};

function parseRouteFromPath(): { page: PageRoute; hash?: string } {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash ? window.location.hash.slice(1) : undefined;
  if (path.startsWith('/services')) return { page: 'services', hash };
  if (path.startsWith('/work') || path.startsWith('/about')) {
    return { page: 'work-about', hash: hash || (path.startsWith('/about') ? 'about' : 'work') };
  }
  if (path.startsWith('/contact')) return { page: 'contact', hash };
  return { page: 'home', hash };
}

export default function App() {
  const initial = parseRouteFromPath();
  const [currentPage, setCurrentPage] = useState<PageRoute>(initial.page);
  const [anchorHash, setAnchorHash] = useState<string | undefined>(initial.hash);
  const [prefillMaterial, setPrefillMaterial] = useState<string | undefined>(undefined);

  useEffect(() => {
    document.title = PAGE_TITLES[currentPage];
  }, [currentPage]);

  useEffect(() => {
    const onPopState = () => {
      const next = parseRouteFromPath();
      setCurrentPage(next.page);
      setAnchorHash(next.hash);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = (page: PageRoute, hash?: string, material?: string) => {
    const urlPath =
      page === 'home'
        ? '/'
        : page === 'services'
          ? '/services'
          : page === 'work-about'
            ? '/work-about'
            : '/contact';
    const fullUrl = hash ? `${urlPath}#${hash}` : urlPath;

    if (window.location.pathname + window.location.hash !== fullUrl) {
      window.history.pushState({}, '', fullUrl);
    }

    setPrefillMaterial(material);
    setCurrentPage(page);
    setAnchorHash(hash);

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#34414A]">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'services' && (
          <ServicesPage onNavigate={handleNavigate} initialAnchor={anchorHash} />
        )}
        {currentPage === 'work-about' && (
          <WorkAboutPage onNavigate={handleNavigate} initialAnchor={anchorHash} />
        )}
        {currentPage === 'contact' && <ContactPage prefillMaterial={prefillMaterial} />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
