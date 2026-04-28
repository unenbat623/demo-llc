import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface NavLogoProps {
  isOpen: boolean;
  scrolled: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavLogo: React.FC<NavLogoProps> = ({ isOpen, scrolled, setIsOpen }) => {
  const { t } = useTranslation();
  const logoVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex-shrink-0 min-w-[200px] flex items-center">
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
          <motion.span variants={logoVariants} className="inline-block">{t('hero.brand1')}</motion.span>
          <motion.span variants={logoVariants} className="inline-block px-1.5 sm:px-2 text-gray-400">{t('hero.brand2')}</motion.span>
          <motion.span variants={logoVariants} className="inline-block">{t('hero.brand3')}</motion.span>
        </a>
      </motion.div>
    </div>
  );
};

export default NavLogo;
