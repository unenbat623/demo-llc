import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Zap } from 'lucide-react';
import { BackgroundMedia, Stats } from './HeroShared';
import { SiteSettings } from '../../types/admin';

interface HeroProps {
  settings: SiteSettings | null;
  t_site: (key: string) => string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const HeroSplit: React.FC<HeroProps> = ({ settings, t_site }) => (
  <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20" style={{ backgroundColor: 'var(--color-primary, #000)', color: 'var(--color-secondary, #fff)' }}>
    <BackgroundMedia settings={settings} opacity={0.3} />
    <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-12 gap-16 items-center">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-7">
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
          <span className="px-3 py-1 text-[10px] font-black uppercase tracking-[0.4em] rounded-sm" style={{ backgroundColor: 'var(--color-secondary, #fff)', color: 'var(--color-primary, #000)' }}>{t_site('siteTitle')}</span>
          <div className="h-px w-12 bg-current opacity-30" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">{settings?.heroBadge || 'Tech Solutions'}</span>
        </motion.div>
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-7xl font-black leading-[0.9] tracking-tighter uppercase mb-8 italic">{t_site('heroTitle')}</motion.h1>
        <motion.p variants={itemVariants} className="max-w-xl text-lg opacity-60 mb-10 leading-relaxed font-medium">{t_site('heroDescription')}</motion.p>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
          <a href="#team" className="group relative overflow-hidden px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs flex items-center gap-4 transition-transform hover:scale-105 active:scale-95">
            {t_site('ctaText')} <ArrowDownRight size={18} className="group-hover:rotate-45 transition-transform" />
          </a>
          <Stats settings={settings} t_site={t_site} />
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.4 }} className="lg:col-span-5 hidden lg:block">
         <div className="aspect-[4/5] bg-neutral-900 border border-white/5 relative group overflow-hidden">
            <img src={settings?.heroImageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-110 transition-transform duration-[3s]" alt="Hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
               <div>
                  <p className="text-[8px] font-black uppercase tracking-widest opacity-40">ESTABLISHED</p>
                  <p className="text-xl font-black italic">{settings?.heroEstablished || 'MMXXIV'}</p>
               </div>
               <Zap size={20} className="opacity-20" />
            </div>
         </div>
      </motion.div>
    </div>
  </section>
);
