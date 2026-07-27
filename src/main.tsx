import {StrictMode, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.tsx';
import About from './pages/About';
import Contact from './pages/Contact';
import RequestProposal from './pages/RequestProposal';
import ServicePage, { ServicesIndex } from './pages/services/ServicePage';
import Pricing from './pages/Pricing';
import Franchise from './pages/Franchise';
import BusDemo from './pages/BusDemo';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // page-home hides scrollbar; page-inner shows thin scrollbar on inner pages
    if (pathname === '/') {
      document.documentElement.classList.add('page-home');
      document.documentElement.classList.remove('page-inner');
    } else {
      document.documentElement.classList.remove('page-home');
      document.documentElement.classList.add('page-inner');
    }
  }, [pathname]);

  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request-proposal" element={<RequestProposal />} />
        <Route path="/services" element={<ServicesIndex />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/bus-demo" element={<BusDemo />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
