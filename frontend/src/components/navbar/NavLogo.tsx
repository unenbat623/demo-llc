import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../context/SettingsContext';

interface NavLogoProps {
  isOpen: boolean;
  scrolled: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavLogo: React.FC<NavLogoProps> = ({ isOpen, scrolled, setIsOpen }) => {
  const { settings } = useSettings();
  
  return (
    <div className="flex-shrink flex items-center min-w-0 overflow-hidden">
      <a
        href="#hero"
        onClick={() => setIsOpen(false)}
        className={`group flex items-center gap-3 transition-all duration-500 ${
          isOpen ? 'text-white' : scrolled ? 'text-black' : 'text-white'
        }`}
      >
        <div className={`w-8 h-8 border-2 flex items-center justify-center transform rotate-45 transition-all duration-700 group-hover:rotate-[225deg] ${
          isOpen ? 'border-white' : scrolled ? 'border-black' : 'border-white'
        }`}>
          <div className="-rotate-45 group-hover:-rotate-[225deg] transition-all duration-700">
            <div className={`w-2 h-2 ${
              isOpen ? 'bg-white' : scrolled ? 'bg-black' : 'bg-white'
            }`} />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase leading-none">
            {settings?.navbarLogo || 'TAVAN BOGD TECH'}
          </span>
          <div className={`h-0.5 w-0 group-hover:w-full transition-all duration-500 ${
            isOpen ? 'bg-white' : scrolled ? 'bg-black' : 'bg-white'
          }`} />
        </div>
      </a>
    </div>
  );
};

export default NavLogo;
