import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import { useSettings } from '../../context/SettingsContext';
import { SiteSettings } from '../../types/admin';

interface DesktopMenuProps {
  scrolled: boolean;
  navLinks: { name: string; href: string }[];
  t_site: (key: keyof SiteSettings) => string;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ scrolled, navLinks, t_site }) => {
  const { t } = useTranslation();

  return (
    <div className="hidden md:flex items-center justify-end flex-1 space-x-12">
      <div className="flex space-x-10 items-center justify-end min-w-[120px]">
        {navLinks.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.3 }}
            className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 hover:opacity-50 relative group whitespace-nowrap ${scrolled ? 'text-black' : 'text-white'
              }`}
          >
            {link.name}
            <span className={`absolute -bottom-2 left-0 w-0 h-px transition-all duration-500 group-hover:w-full ${scrolled ? 'bg-black' : 'bg-white'
              }`} />
          </motion.a>
        ))}
      </div>

      <div className="flex items-center space-x-6">
        <LanguageSwitcher isScrolled={scrolled} />

        <motion.a
          href="#team"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className={`group relative overflow-hidden px-8 py-3 transition-all duration-500 border rounded-sm min-w-[140px] text-center ${scrolled
            ? 'bg-black text-white border-black hover:text-black'
            : 'bg-white text-black border-white hover:text-white'
            }`}
        >
          <div className={`absolute inset-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1] -translate-x-full group-hover:translate-x-0 ${scrolled ? 'bg-white' : 'bg-black'
            }`} />
          <span className="relative text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap">
            {t_site('navTeam') || t('nav.team')}
          </span>
        </motion.a>
      </div>
    </div>
  );
};

export default DesktopMenu;
