import React from 'react';
import { motion } from 'motion/react';
import { Plus, Globe, Zap } from 'lucide-react';
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

// --- CENTERED MINIMAL ---
export const HeroCentered: React.FC<HeroProps> = ({ settings, t_site }) => (
  <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-white px-6">
    <BackgroundMedia settings={settings} opacity={0.03} />
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-30 max-w-4xl w-full">
       <motion.div variants={itemVariants} className="mb-6">
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-black/30 block mb-2">{settings?.heroBadge || 'Minimalist Future'}</span>
          <div className="w-8 h-8 mx-auto border-2 border-black rotate-45 flex items-center justify-center">
             <div className="w-1 h-1 bg-black" />
          </div>
       </motion.div>
       <motion.h1 variants={itemVariants} className="text-6xl lg:text-9xl font-black text-black leading-[0.85] tracking-tighter uppercase mb-8">{t_site('heroTitle')}</motion.h1>
       <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-lg text-black/50 mb-12 font-medium leading-relaxed">{t_site('heroDescription')}</motion.p>
       <motion.div variants={itemVariants} className="flex flex-col items-center gap-10">
          <a href="#team" className="px-12 py-5 bg-black text-white font-black uppercase tracking-widest text-xs border-2 border-black hover:bg-transparent hover:text-black transition-all">
            {t_site('ctaText')}
          </a>
          <Stats settings={settings} className="text-black" />
       </motion.div>
    </motion.div>
  </section>
);

// --- EDITORIAL BOLD ---
export const HeroEditorial: React.FC<HeroProps> = ({ settings, t_site }) => (
  <section id="hero" className="relative min-h-screen bg-black flex flex-col justify-end pb-24 overflow-hidden px-6 lg:px-12">
    <BackgroundMedia settings={settings} opacity={0.2} />
    <div className="relative z-30 w-full grid lg:grid-cols-2 gap-20 items-end">
       <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="mb-10 text-[#d4af37] flex items-center gap-4">
             <Plus size={16} />
             <span className="text-[11px] font-black uppercase tracking-[0.5em]">{settings?.heroBadge || 'Editorial Select'}</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-7xl lg:text-[10rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic mb-10">
             {t_site('heroTitle')}
          </motion.h1>
          <motion.div variants={itemVariants} className="flex gap-12 items-center">
             <a href="#team" className="text-white font-black uppercase tracking-widest text-sm border-b-4 border-white pb-1 hover:border-[#d4af37] transition-colors">
                {t_site('ctaText')}
             </a>
             <Stats settings={settings} className="text-white" />
          </motion.div>
       </motion.div>
       <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="hidden lg:block relative">
          <div className="aspect-[16/9] bg-zinc-900 border border-white/10 overflow-hidden grayscale contrast-125">
             <img src={settings?.heroImageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover" alt="Editorial" />
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 border border-white/5 pointer-events-none" />
       </motion.div>
    </div>
  </section>
);

// --- DARK PREMIUM ---
export const HeroDark: React.FC<HeroProps> = ({ settings, t_site }) => (
  <section id="hero" className="relative min-h-screen bg-[#050505] flex items-center overflow-hidden px-6 lg:px-12">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#d4af37]/5 blur-[120px] rounded-full" />
    <BackgroundMedia settings={settings} opacity={0.15} />
    <div className="relative z-30 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">
       <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
             <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#d4af37]">{settings?.heroBadge || 'Luxury Tier'}</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-6xl lg:text-8xl font-black text-white leading-tight tracking-tight uppercase mb-8">
             {t_site('heroTitle')}
          </motion.h1>
          <motion.p variants={itemVariants} className="max-w-xl text-lg text-white/40 mb-12 font-medium">{t_site('heroDescription')}</motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-8 items-center">
             <a href="#team" className="px-10 py-5 bg-[#d4af37] text-black font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                {t_site('ctaText')}
             </a>
             <div className="flex gap-10">
                <div className="text-center">
                   <p className="text-2xl font-black text-white">{settings?.heroStat1Value || '250+'}</p>
                   <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Projects</p>
                </div>
                <div className="text-center">
                   <p className="text-2xl font-black text-white">{settings?.heroStat2Value || '15+'}</p>
                   <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Awards</p>
                </div>
             </div>
          </motion.div>
       </motion.div>
       <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="hidden lg:block">
          <div className="relative p-1 bg-gradient-to-br from-[#d4af37]/20 to-transparent rounded-2xl overflow-hidden shadow-2xl">
             <div className="aspect-square rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                <img src={settings?.heroImageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover" alt="Premium" />
             </div>
          </div>
       </motion.div>
    </div>
  </section>
);

// --- LIGHT CORPORATE ---
export const HeroCorporate: React.FC<HeroProps> = ({ settings, t_site }) => (
  <section id="hero" className="relative min-h-screen bg-[#f8fafc] flex items-center overflow-hidden pt-20">
    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-40" />
    <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-20 items-center">
       <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg mb-8">
             <Globe size={14} className="text-blue-600" />
             <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{settings?.heroBadge || 'Global Enterprise'}</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
             {t_site('heroTitle')}
          </motion.h1>
          <motion.p variants={itemVariants} className="max-w-xl text-lg text-slate-500 mb-10 leading-relaxed font-medium">{t_site('heroDescription')}</motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 items-center">
             <a href="#team" className="px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 w-full sm:w-auto text-center">
                {t_site('ctaText')}
             </a>
             <Stats settings={settings} className="text-slate-400" />
          </motion.div>
       </motion.div>
       <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="hidden lg:block">
          <div className="relative">
             <div className="absolute -inset-4 bg-blue-600/5 rounded-[40px] blur-2xl" />
             <div className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <img src={settings?.heroImageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover" alt="Corporate" />
             </div>
          </div>
       </motion.div>
    </div>
  </section>
);

// --- GRADIENT MODERN ---
export const HeroGradient: React.FC<HeroProps> = ({ settings, t_site }) => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a]">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-[#0f172a] to-sky-900/30 z-0" />
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
    <BackgroundMedia settings={settings} opacity={0.1} />
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-30 max-w-5xl mx-auto px-6 text-center">
       <motion.div variants={itemVariants} className="mb-10 inline-block">
          <div className="px-6 py-2 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full flex items-center gap-3">
             <Zap size={14} className="text-sky-400" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">{settings?.heroBadge || 'Next Gen Tech'}</span>
          </div>
       </motion.div>
       <motion.h1 variants={itemVariants} className="text-6xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-indigo-200 leading-[0.9] tracking-tighter uppercase mb-10">
          {t_site('heroTitle')}
       </motion.h1>
       <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-xl text-white/50 mb-14 leading-relaxed font-medium">{t_site('heroDescription')}</motion.p>
       <motion.div variants={itemVariants} className="flex flex-col items-center gap-12">
          <a href="#team" className="group relative px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full overflow-hidden hover:scale-110 transition-transform">
             <div className="absolute inset-0 bg-sky-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             <span className="relative z-10 group-hover:text-white transition-colors">{t_site('ctaText')}</span>
          </a>
          <div className="flex gap-16">
             <div className="text-center">
                <p className="text-4xl font-black text-white">{settings?.heroStat1Value || '250+'}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-sky-400 mt-2">Projects Delivered</p>
             </div>
             <div className="text-center">
                <p className="text-4xl font-black text-white">{settings?.heroStat2Value || '15+'}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-sky-400 mt-2">Global Awards</p>
             </div>
          </div>
       </motion.div>
    </motion.div>
  </section>
);
