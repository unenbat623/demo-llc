import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
  isDark?: boolean;
}

export default function LanguageSwitcher({ isScrolled, isDark }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'mn' ? 'en' : 'mn';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('language', nextLang);
  };

  const isMN = i18n.language === 'mn';

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
        isDark || !isScrolled ? 'text-white' : 'text-black'
      }`}
    >
      <span className={isMN ? 'opacity-100' : 'opacity-30 hover:opacity-100 transition-opacity'}>MN</span>
      <span className="opacity-20">/</span>
      <span className={!isMN ? 'opacity-100' : 'opacity-30 hover:opacity-100 transition-opacity'}>EN</span>
    </button>
  );
}
