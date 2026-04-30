import { motion } from 'motion/react';
import { CalendarDays, Users2, Rocket, Handshake, Target, Compass } from 'lucide-react';
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
    <section id="about" className="py-20 overflow-hidden relative" style={{ backgroundColor: 'var(--color-secondary, #fff)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">{settings?.aboutBadge || 'Компанийн тухай'}</span>
                <div className="w-8 h-px bg-black/10" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight mb-8" style={{ color: 'var(--color-primary, #000)' }}>
                {t_site('aboutTitle')}
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary, #000)', color: 'var(--color-secondary, #fff)' }}>
                  <Rocket size={24} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black">{settings?.aboutTagline || 'Innovation First'}</div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 lg:pt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-black/60 text-base leading-relaxed max-w-xl font-medium tracking-tight whitespace-pre-wrap">
                {t_site('aboutDescription')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-black/5 bg-gray-50/50">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 group border-b sm:border-r border-black/5 last:border-b-0 lg:last:border-r-0 hover:bg-white transition-colors duration-300"
            >
              <div className="text-2xl font-black text-black tracking-tighter mb-2">{stat.value}</div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black mb-1">{stat.label}</h4>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{stat.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Vision & Mission */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 border border-black/5 rounded-sm relative group"
          >
            <div className="flex items-center gap-3 mb-6">
              <Target size={18} className="text-black" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-black">{t_site('visionTitle')}</h3>
            </div>
            <p className="text-lg font-black text-black leading-snug tracking-tight whitespace-pre-wrap">
              {t_site('visionText')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 border border-black/5 rounded-sm relative group"
          >
            <div className="flex items-center gap-3 mb-6">
              <Compass size={18} className="text-black" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-black">{t_site('missionTitle')}</h3>
            </div>
            <p className="text-lg font-black text-black leading-snug tracking-tight whitespace-pre-wrap">
              {t_site('missionText')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
