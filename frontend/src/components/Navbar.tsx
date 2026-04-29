import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';

// Components
import NavLogo from './navbar/NavLogo';
import DesktopMenu from './navbar/DesktopMenu';
import MobileMenu from './navbar/MobileMenu';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { settings, t_site } = useSettings();
  
  useEffect(() => {
    if (settings) {
      document.title = t_site('siteTitle');
    }
  }, [settings, i18n.language]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 outline-none ${isOpen
        ? 'bg-transparent py-6'
        : scrolled
          ? 'bg-white/80 backdrop-blur-2xl border-b border-black/5 py-4'
          : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-full">
          <NavLogo isOpen={isOpen} scrolled={scrolled} setIsOpen={setIsOpen} />
          <DesktopMenu scrolled={scrolled} navLinks={navLinks} />

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center relative z-[70] ml-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors rounded-sm ${isOpen ? 'text-white' : scrolled ? 'text-black' : 'text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} navLinks={navLinks} />
    </nav>
  );
}
