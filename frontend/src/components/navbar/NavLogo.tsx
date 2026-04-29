import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface NavLogoProps {
  isOpen: boolean;
  scrolled: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

import { useSettings } from '../../context/SettingsContext';

const NavLogo: React.FC<NavLogoProps> = ({ isOpen, scrolled, setIsOpen }) => {
  const { settings } = useSettings();
  const logoVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex-shrink flex items-center min-w-0 overflow-hidden">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.1 }}
      >
        <a
          href="#hero"
          onClick={() => setIsOpen(false)}
          className={`text-xl sm:text-2xl font-black tracking-tighter uppercase transition-colors duration-500 whitespace-nowrap flex items-center ${isOpen ? 'text-white' : scrolled ? 'text-black' : 'text-white'
            }`}
        >
          <motion.span variants={logoVariants} className="inline-block">
            {settings?.navbarLogo || 'TAVAN BOGD TECH'}
          </motion.span>
        </a>
      </motion.div>
    </div>
  );
};

export default NavLogo;
