import { motion } from 'motion/react';
import { CalendarDays, Users2, Rocket, Handshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';

export default function About() {
  const { t, i18n } = useTranslation();
  const { settings, t_site } = useSettings();

  const getStatIcon = (index: number) => {
    switch (index) {
      case 0: return CalendarDays;
      case 1: return Users2;
      case 2: return Rocket;
      case 3: return Handshake;
      default: return Rocket;
    }
  };

  const stats = settings ? [
    { 
      value: settings.stats1Value, 
      label: i18n.language === 'en' ? settings.stats1Label_en : settings.stats1Label,
      detail: i18n.language === 'en' ? settings.stats1Detail_en : settings.stats1Detail,
      icon: getStatIcon(0) 
    },
    { 
      value: settings.stats2Value, 
      label: i18n.language === 'en' ? settings.stats2Label_en : settings.stats2Label,
      detail: i18n.language === 'en' ? settings.stats2Detail_en : settings.stats2Detail,
      icon: getStatIcon(1) 
    },
    { 
      value: settings.stats3Value, 
      label: i18n.language === 'en' ? settings.stats3Label_en : settings.stats3Label,
      detail: i18n.language === 'en' ? settings.stats3Detail_en : settings.stats3Detail,
      icon: getStatIcon(2) 
    },
    { 
      value: settings.stats4Value, 
      label: i18n.language === 'en' ? settings.stats4Label_en : settings.stats4Label,
      detail: i18n.language === 'en' ? settings.stats4Detail_en : settings.stats4Detail,
      icon: getStatIcon(3) 
    },
  ] : [];

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Section: Heading and Description */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-black uppercase tracking-[0.5em] text-gray-400 mb-5 block">{t('about.subtitle')}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black uppercase tracking-tighter leading-[0.9] mb-6">
                {t_site('aboutTitle')}
              </h2>
              <div className="w-20 h-1.5 bg-black" />
            </motion.div>
          </div>

          <div className="lg:col-span-6 lg:pt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl whitespace-pre-wrap">
                {t_site('aboutDescription')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-black/5">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="py-10 lg:py-12 group border-b border-black/5 sm:border-r last:border-b-0 sm:even:border-r-0 lg:even:border-r lg:last:border-r-0 lg:px-8 first:pl-0 last:pr-0"
            >
              <div className="flex items-center gap-3 mb-2 group-hover:translate-x-2 transition-transform duration-500">
                <stat.icon size={20} strokeWidth={2.5} className="text-black" />
                <div className="text-3xl font-black text-black tracking-tighter">{stat.value}</div>
              </div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-black mb-0.5">{stat.label}</div>
              <div className="text-xs font-medium uppercase tracking-[0.1em] text-gray-400">{stat.detail}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-px bg-black/5 border border-black/5">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-10 sm:p-12 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-black mb-6 flex items-center">
                <span className="w-6 h-px bg-black mr-3" />
                {t_site('visionTitle')}
              </h3>
              <p className="text-lg text-black font-bold leading-snug tracking-tight whitespace-pre-wrap">
                {t_site('visionText')}
              </p>
            </div>
            <div className="absolute -bottom-6 -right-6 text-[80px] font-black text-black/[0.02] leading-none select-none group-hover:text-black/[0.05] transition-colors duration-700">
              01
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#f8f8f8] p-10 sm:p-12 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-black mb-6 flex items-center">
                <span className="w-6 h-px bg-black mr-3" />
                {t_site('missionTitle')}
              </h3>
              <p className="text-lg text-black font-bold leading-snug tracking-tight whitespace-pre-wrap">
                {t_site('missionText')}
              </p>
            </div>
            <div className="absolute -bottom-6 -right-6 text-[80px] font-black text-black/[0.02] leading-none select-none group-hover:text-black/[0.05] transition-colors duration-700">
              02
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
