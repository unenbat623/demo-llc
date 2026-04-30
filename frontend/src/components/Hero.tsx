import { motion } from 'motion/react';
import { ArrowDownRight, Globe, Shield, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';

export default function Hero() {
  const { t } = useTranslation();
  const { settings, t_site } = useSettings();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20" style={{ backgroundColor: 'var(--color-primary, #000)' }}>
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 opacity-60" />
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {settings?.heroBgUrl?.includes('mp4') || settings?.heroBgUrl?.includes('data:video') ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale opacity-40 scale-105"
            key={settings?.heroBgUrl}
          >
            <source src={settings?.heroBgUrl} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={settings?.heroBgUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"} 
            className="w-full h-full object-cover grayscale opacity-30 scale-105"
            alt="Background"
          />
        )}

        {/* Grid Texture */}
        <div 
          className="absolute inset-0 opacity-[0.15] z-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
              <span className="px-3 py-1 text-[10px] font-black uppercase tracking-[0.4em] rounded-sm" style={{ backgroundColor: 'var(--color-secondary, #fff)', color: 'var(--color-primary, #000)' }}>
                {t_site('siteTitle')}
              </span>
              <div className="h-px w-12" style={{ backgroundColor: 'var(--color-secondary, #fff)', opacity: 0.3 }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">{settings?.heroBadge || 'Tech Solutions'}</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight uppercase mb-6"
            >
              {t_site('heroTitle')}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-xl text-base text-white/60 mb-8 leading-relaxed font-medium tracking-tight"
            >
              {t_site('heroDescription')}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <a href="#team" className="group relative overflow-hidden px-10 py-6 rounded-sm w-full sm:w-auto text-center" style={{ backgroundColor: 'var(--color-secondary, #fff)', color: 'var(--color-primary, #000)' }}>
                <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" style={{ backgroundColor: 'var(--color-accent, #f8f8f8)' }} />
                <div className="relative flex items-center justify-center gap-4 transition-colors duration-500">
                  <span className="text-xs font-black uppercase tracking-[0.3em]">{t_site('ctaText')}</span>
                  <ArrowDownRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </a>

              <div className="flex items-center gap-8 px-4">
                <div className="flex flex-col">
                  <span className="text-white font-black text-xl leading-none">{settings?.heroStat1Value || '250+'}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">{settings?.heroStat1Label || 'Projects'}</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-white font-black text-xl leading-none">{settings?.heroStat2Value || '15+'}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">{settings?.heroStat2Label || 'Awards'}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Side Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative group">
              <div className="absolute -inset-4 border border-white/10 scale-95 group-hover:scale-100 transition-transform duration-700 pointer-events-none" />
              <div className="aspect-[4/5] bg-gray-900 relative overflow-hidden rounded-sm shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
                <img
                  src={settings?.heroImageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"}
                  alt="Architecture"
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-[2000ms]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Elements */}
                <div className="absolute top-8 left-8 z-20 flex flex-col gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <div className="w-px h-12 bg-white/20 ml-1" />
                </div>

                <div className="absolute bottom-10 left-10 right-10 z-20">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Established</p>
                      <p className="text-2xl font-black text-white tracking-tighter italic">{settings?.heroEstablished || 'MMXXIV'}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-4 text-white/20 mb-2">
                        <Globe size={14} />
                        <Shield size={14} />
                        <Zap size={14} />
                      </div>
                      <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{settings?.heroTagline || 'Digital_Engine_01'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-12 left-6 lg:left-12 flex items-center gap-6 z-30">
        <div className="flex flex-col gap-2">
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="w-1 h-1 bg-white/20 rounded-full" />
          <div className="w-1 h-1 bg-white/20 rounded-full" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 rotate-180 [writing-mode:vertical-lr]">Scroll</span>
      </div>
    </section>
  );
}
