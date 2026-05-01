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
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00000003_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-30 max-w-5xl w-full">
       <motion.div variants={itemVariants} className="mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-black/10" />
            <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-black/40 block">{t_site('heroBadge') || 'Minimalist Future'}</span>
            <div className="w-12 h-[1px] bg-black/10" />
          </div>
          <div className="w-10 h-10 mx-auto border border-black/20 rotate-45 flex items-center justify-center group hover:border-black transition-colors duration-700">
             <div className="w-1.5 h-1.5 bg-black group-hover:scale-150 transition-transform duration-700" />
          </div>
       </motion.div>
       <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[7rem] font-black text-black leading-[1] tracking-tighter uppercase mb-10 selection:bg-black selection:text-white">
          {t_site('heroTitle')}
       </motion.h1>
       <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-base md:text-xl text-black/60 mb-14 font-medium leading-relaxed italic">
          {t_site('heroDescription')}
       </motion.p>
       <motion.div variants={itemVariants} className="flex flex-col items-center gap-14">
          <a href="#team" className="group relative px-16 py-6 bg-black text-white font-black uppercase tracking-[0.2em] text-[10px] border border-black hover:bg-transparent hover:text-black transition-all duration-500 overflow-hidden">
            <span className="relative z-10">{t_site('ctaText')}</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>
          <Stats settings={settings} t_site={t_site} className="text-black" />
       </motion.div>
    </motion.div>
  </section>
);

// --- EDITORIAL BOLD ---
export const HeroEditorial: React.FC<HeroProps> = ({ settings, t_site }) => (
  <section id="hero" className="relative min-h-screen bg-black flex flex-col justify-end pb-12 lg:pb-24 overflow-hidden px-6 lg:px-12 pt-32">
    <BackgroundMedia settings={settings} opacity={0.2} />
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
    <div className="relative z-30 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-end">
       <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="mb-8 lg:mb-12 text-[#d4af37] flex items-center gap-4">
             <Plus size={20} className="animate-spin-slow" />
             <span className="text-[12px] font-black uppercase tracking-[0.6em] border-b border-[#d4af37]/30 pb-1">{t_site('heroBadge') || 'Editorial Select'}</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[9rem] font-black text-white leading-[0.85] tracking-[ -0.05em] uppercase italic mb-10 lg:mb-14">
             {t_site('heroTitle')}
          </motion.h1>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-10 lg:gap-16 items-center">
             <a href="#team" className="group flex items-center gap-6 text-white font-black uppercase tracking-[0.3em] text-xs lg:text-sm">
                <span className="border-b-2 border-white group-hover:border-[#d4af37] group-hover:text-[#d4af37] transition-all duration-500 pb-1">{t_site('ctaText')}</span>
                <div className="w-12 h-[1px] bg-white/30 group-hover:w-20 group-hover:bg-[#d4af37] transition-all duration-500" />
             </a>
             <Stats settings={settings} t_site={t_site} className="text-white" />
          </motion.div>
       </motion.div>
       <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} className="hidden lg:block relative">
          <div className="aspect-[4/5] bg-zinc-900 border border-white/5 overflow-hidden group">
             <img src={settings?.heroImageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000" alt="Editorial" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-[#d4af37]/40 pointer-events-none" />
       </motion.div>
    </div>
  </section>
);

// --- DARK PREMIUM ---
export const HeroDark: React.FC<HeroProps> = ({ settings, t_site }) => (
  <section id="hero" className="relative min-h-screen bg-[#050505] flex items-center overflow-hidden px-6 lg:px-12 pt-20">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4af37]/10 blur-[150px] rounded-full" />
       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[150px] rounded-full" />
    </div>
    <BackgroundMedia settings={settings} opacity={0.15} />
    <div className="relative z-30 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
       <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-10">
             <div className="h-[1px] w-12 bg-gradient-to-r from-[#d4af37] to-transparent" />
             <span className="text-[11px] font-black uppercase tracking-[0.6em] text-[#d4af37]">{t_site('heroBadge') || 'Luxury Tier'}</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight uppercase mb-10">
             {t_site('heroTitle')}
          </motion.h1>
          <motion.p variants={itemVariants} className="max-w-xl text-base md:text-lg text-white/50 mb-12 font-medium leading-relaxed border-l-2 border-[#d4af37]/20 pl-8">{t_site('heroDescription')}</motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-10 items-center">
             <a href="#team" className="group relative px-12 py-6 bg-[#d4af37] text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-none hover:bg-white transition-all duration-500 shadow-[0_20px_50px_rgba(212,175,55,0.2)]">
                <span className="relative z-10">{t_site('ctaText')}</span>
             </a>
             <div className="flex gap-12 items-center bg-white/5 backdrop-blur-md p-6 border border-white/10">
                <div className="text-left">
                   <p className="text-3xl font-black text-white leading-none mb-2">{settings?.heroStat1Value || '250+'}</p>
                   <p className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] opacity-80">{t_site('heroStat1Label') || 'Projects'}</p>
                </div>
                <div className="w-[1px] h-10 bg-white/10" />
                <div className="text-left">
                   <p className="text-3xl font-black text-white leading-none mb-2">{settings?.heroStat2Value || '15+'}</p>
                   <p className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] opacity-80">{t_site('heroStat2Label') || 'Awards'}</p>
                </div>
             </div>
          </motion.div>
       </motion.div>
       <motion.div initial={{ opacity: 0, scale: 0.8, rotate: 5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }} className="hidden lg:block relative">
          <div className="relative p-2 bg-gradient-to-br from-[#d4af37]/30 via-transparent to-white/5 rounded-none overflow-hidden">
             <div className="aspect-[3/4] overflow-hidden grayscale contrast-125 brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000">
                <img src={settings?.heroImageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover scale-110" alt="Premium" />
             </div>
          </div>
          <div className="absolute -top-12 -right-12 w-48 h-48 border-t-2 border-r-2 border-[#d4af37]/20 pointer-events-none" />
       </motion.div>
    </div>
  </section>
);

// --- LIGHT CORPORATE ---
export const HeroCorporate: React.FC<HeroProps> = ({ settings, t_site }) => (
  <section id="hero" className="relative min-h-screen bg-[#f8fafc] flex items-center overflow-hidden pt-32 pb-20">
    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-60" />
    <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/[0.02] -skew-x-12" />
    <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
       <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-5 py-2 bg-white border border-slate-200 rounded-full mb-10 shadow-sm">
             <div className="w-2 h-2 bg-blue-600 rounded-full" />
             <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-slate-600">{t_site('heroBadge') || 'Global Enterprise'}</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-[5.5rem] font-black text-slate-900 leading-[1] tracking-tight mb-10">
             {t_site('heroTitle')}
          </motion.h1>
          <motion.p variants={itemVariants} className="max-w-xl text-base md:text-xl text-slate-500 mb-12 leading-relaxed font-medium">
             {t_site('heroDescription')}
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-8 items-center border-t border-slate-200 pt-12">
             <a href="#team" className="px-12 py-5 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-none hover:bg-slate-900 transition-all duration-500 shadow-xl shadow-blue-200 w-full sm:w-auto text-center">
                {t_site('ctaText')}
             </a>
             <Stats settings={settings} t_site={t_site} className="text-slate-400" />
          </motion.div>
       </motion.div>
       <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease: "circOut" }} className="hidden lg:block relative">
          <div className="relative">
             <div className="absolute -inset-10 bg-blue-600/5 rounded-full blur-3xl" />
             <div className="relative aspect-[4/3] bg-white rounded-none overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-white p-4">
                <img src={settings?.heroImageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover" alt="Corporate" />
             </div>
             <div className="absolute top-10 -right-10 w-24 h-24 bg-blue-600/10 backdrop-blur-xl border border-white/20 hidden lg:flex items-center justify-center">
                <Globe size={32} className="text-blue-600 opacity-40" />
             </div>
          </div>
       </motion.div>
    </div>
  </section>
);

// --- GRADIENT MODERN ---
export const HeroGradient: React.FC<HeroProps> = ({ settings, t_site }) => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#020617_100%)] z-0" />
    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    <BackgroundMedia settings={settings} opacity={0.1} />
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-30 max-w-6xl mx-auto px-6 text-center">
       <motion.div variants={itemVariants} className="mb-12">
          <div className="inline-flex items-center gap-4 px-8 py-3 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-full shadow-[0_0_50px_rgba(0,0,0,0.3)]">
             <Zap size={18} className="text-blue-400 animate-pulse" />
             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/90">{t_site('heroBadge') || 'Next Gen Tech'}</span>
          </div>
       </motion.div>
       <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-indigo-300 leading-[0.95] tracking-tight uppercase mb-12">
          {t_site('heroTitle')}
       </motion.h1>
       <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 mb-16 leading-relaxed font-medium italic">
          {t_site('heroDescription')}
       </motion.p>
       <motion.div variants={itemVariants} className="flex flex-col items-center gap-16">
          <a href="#team" className="group relative px-14 py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-[11px] rounded-none overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             <span className="relative z-10 group-hover:text-white transition-colors duration-500">{t_site('ctaText')}</span>
          </a>
          <div className="flex flex-wrap justify-center gap-12 lg:gap-24 border-t border-white/5 pt-16 w-full max-w-3xl">
             <div className="text-center group">
                <p className="text-5xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors">{settings?.heroStat1Value || '250+'}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 group-hover:text-white/40 transition-colors">{t_site('heroStat1Label') || 'Projects Delivered'}</p>
             </div>
             <div className="w-[1px] h-12 bg-white/5 hidden md:block" />
             <div className="text-center group">
                <p className="text-5xl font-black text-white mb-2 group-hover:text-indigo-400 transition-colors">{settings?.heroStat2Value || '15+'}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 group-hover:text-white/40 transition-colors">{t_site('heroStat2Label') || 'Global Awards'}</p>
             </div>
          </div>
       </motion.div>
    </motion.div>
  </section>
);
