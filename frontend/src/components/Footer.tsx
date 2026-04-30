import { ArrowDownRight, Linkedin, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const { settings, t_site } = useSettings();

  return (
    <footer className="text-white pt-20 pb-10 overflow-hidden relative" style={{ backgroundColor: 'var(--color-primary, #000)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight mb-8 italic">
              {i18n.language === 'en' ? (settings?.footerCta_en || settings?.footerCta || t('footer.ready')) : (settings?.footerCta || t('footer.ready'))}
            </h2>
            <p className="text-base text-gray-400 mb-12 max-w-xl font-medium leading-relaxed tracking-tight">
              {i18n.language === 'en' ? (settings?.footerCtaSub_en || settings?.footerCtaSub || t('footer.buildTogether')) : (settings?.footerCtaSub || t('footer.buildTogether'))}
            </p>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-6">{t('footer.menu')}</h4>
                <ul className="space-y-3">
                  {[
                    { name: t('nav.about'), href: '#about' },
                    { name: t('nav.team'), href: '#team' },
                  ].map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                        <div className="w-0 h-px bg-white group-hover:w-3 transition-all" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-6">Social Connect</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'linkedin', icon: Linkedin, url: settings?.linkedin },
                    { id: 'facebook', icon: Facebook, url: settings?.facebook },
                    { id: 'twitter', icon: Twitter, url: settings?.twitter },
                    { id: 'instagram', icon: Instagram, url: settings?.instagram },
                  ].filter(s => s.url && s.url !== '#').map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
                    >
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-6">Office Details</h4>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <Mail size={14} className="text-gray-500 shrink-0" />
                  <div className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    {settings?.contactEmail}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone size={14} className="text-gray-500 shrink-0" />
                  <div className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    {settings?.contactPhone}
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin size={14} className="text-gray-500 shrink-0" />
                  <div className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    {i18n.language === 'en' ? settings?.address_en : settings?.address}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-white/20 flex items-center justify-center rotate-45">
              <div className="-rotate-45 w-1.5 h-1.5 bg-white" />
            </div>
            <div className="text-xl font-black tracking-tighter uppercase leading-none">
              {settings?.navbarLogo || 'TAVAN BOGD TECH'}
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-1">
            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
              {t_site('footerText')}
            </div>
            <div className="text-[8px] font-medium uppercase tracking-[0.1em] text-gray-700">
              © {new Date().getFullYear()} Tavan Bogd Tech.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
