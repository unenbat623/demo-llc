import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navLinks: { name: string; href: string }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, navLinks }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 bg-black flex flex-col justify-between p-8 sm:p-12 overflow-hidden"
        >
          <div className="mt-20 sm:mt-24 space-y-12">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.8em] text-gray-600">{t('common.language')}</span>
              <div className="flex-shrink-0">
                <LanguageSwitcher isDark />
              </div>
            </div>
            <div className="flex flex-col space-y-2 sm:space-y-4">
              {[
                { name: t('nav.home'), href: '#hero' },
                ...navLinks,
                { name: t('nav.team'), href: '#team' }
              ].map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tighter hover:italic transition-all duration-300 flex items-center group py-2"
                >
                  <span className="group-hover:translate-x-4 transition-transform duration-500">{item.name}</span>
                  <ArrowRight className="ml-6 opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:block" size={48} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end border-t border-white/10 pt-12">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 block mb-4">{t('footer.contact')}</span>
              <a href="mailto:hello@tavanbogd.tech" className="text-xl font-bold text-white uppercase tracking-tighter border-b border-white/20 pb-1 hover:text-gray-400 transition-colors">
                hello@tavanbogd.tech
              </a>
            </div>
            <div className="flex flex-col sm:items-end gap-4">
              <div className="flex space-x-6 text-gray-500">
                <a href="#" className="hover:text-white transition-colors">LN</a>
                <a href="#" className="hover:text-white transition-colors">FB</a>
                <a href="#" className="hover:text-white transition-colors">TW</a>
                <a href="#" className="hover:text-white transition-colors">IG</a>
              </div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-800">
                © 2026 TBT
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
