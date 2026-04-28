import { ArrowDownRight, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-black text-white py-20 pb-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-20 sm:mb-24">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-8 sm:mb-12">
              {t('footer.ready')}
            </h2>
            <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 max-w-sm">
              {t('footer.buildTogether')}
            </p>
            <a
              href="mailto:contact@tavanbogd.tech"
              className="inline-flex items-center space-x-4 sm:space-x-6 text-xl font-black uppercase tracking-tighter group relative pb-4"
            >
              <span className="relative z-10">{t('footer.startConversation')}</span>
              <ArrowDownRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500 relative z-10" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500 mb-6 sm:mb-8">{t('footer.menu')}</h4>
              <ul className="space-y-4">
                {[
                  { name: t('nav.about'), href: '#about' },
                  { name: t('nav.team'), href: '#team' },
                ].map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500 mb-6 sm:mb-8">{t('footer.contact')}</h4>
              <div className="flex flex-col space-y-4">
                <a href="#" className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-all group">
                  <span className="p-2 border border-white/10 group-hover:border-white/40 transition-colors rounded-sm">
                    <Linkedin size={16} />
                  </span>
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-all group">
                  <span className="p-2 border border-white/10 group-hover:border-white/40 transition-colors rounded-sm">
                    <Facebook size={16} />
                  </span>
                  <span>Facebook</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-all group">
                  <span className="p-2 border border-white/10 group-hover:border-white/40 transition-colors rounded-sm">
                    <Twitter size={16} />
                  </span>
                  <span>Twitter</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-all group">
                  <span className="p-2 border border-white/10 group-hover:border-white/40 transition-colors rounded-sm">
                    <Instagram size={16} />
                  </span>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="text-lg font-black tracking-tighter uppercase">
            {t('hero.brand1')} <span className="text-gray-500">{t('hero.brand2')} {t('hero.brand3')}</span>
          </div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 max-w-xs sm:max-w-none">
            {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
}
