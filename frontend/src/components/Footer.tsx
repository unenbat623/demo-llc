import { ArrowDownRight, Linkedin, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const { settings, t_site } = useSettings();

  return (
    <footer className="pt-24 pb-12 overflow-hidden relative" style={{ backgroundColor: 'var(--color-secondary, #fafafa)' }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          {/* Left Column */}
          <div className="lg:col-span-6">
             <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 border border-black/10 flex items-center justify-center rotate-45">
                   <div className="-rotate-45 w-1.5 h-1.5 bg-black/40" />
                </div>
                <div className="text-lg font-black tracking-tighter uppercase text-black/80">
                   {settings?.navbarLogo || 'TAVAN BOGD TECH'}
                </div>
             </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-[1.2] mb-8 text-black/90">
              {i18n.language === 'en' ? (settings?.footerCta_en || settings?.footerCta || t('footer.ready')) : (settings?.footerCta || t('footer.ready'))}
            </h2>
            <p className="text-sm text-black/40 max-w-md font-medium leading-relaxed italic border-l border-black/[0.05] pl-6">
              {i18n.language === 'en' ? (settings?.footerCtaSub_en || settings?.footerCtaSub || t('footer.buildTogether')) : (settings?.footerCtaSub || t('footer.buildTogether'))}
            </p>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="space-y-10">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/20 mb-6">{t('footer.menu')}</h4>
                <ul className="space-y-4">
                  {[
                    { name: t('nav.about'), href: '#about' },
                    { name: t('nav.team'), href: '#team' },
                  ].map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-black transition-all flex items-center gap-2 group">
                        <div className="w-0 h-px bg-black group-hover:w-4 transition-all" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/20 mb-6">Social</h4>
                <div className="flex flex-wrap gap-3">
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
                      className="w-10 h-10 border border-black/[0.05] flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500"
                    >
                      <social.icon size={14} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/20 mb-6">Details</h4>
              <div className="space-y-8">
                <div className="flex gap-4 group">
                  <div className="w-8 h-8 border border-black/[0.03] flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                     <Mail size={12} />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest leading-loose text-black/60 py-1">
                    {settings?.contactEmail}
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-8 h-8 border border-black/[0.03] flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                     <Phone size={12} />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest leading-loose text-black/60 py-1">
                    {settings?.contactPhone}
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-8 h-8 border border-black/[0.03] flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                     <MapPin size={12} />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest leading-loose text-black/40 py-1">
                    {i18n.language === 'en' ? settings?.address_en : settings?.address}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-black/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/20 order-2 md:order-1">
             {t_site('footerText')}
          </div>

          <div className="flex flex-col md:items-end gap-2 order-1 md:order-2">
            <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-black/30">
              © {new Date().getFullYear()} Tavan Bogd Tech. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
