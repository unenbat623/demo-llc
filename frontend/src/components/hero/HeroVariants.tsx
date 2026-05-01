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
   <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-[#fafafa] px-6">
      <BackgroundMedia settings={settings} opacity={0.02} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00000002_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-30 max-w-5xl w-full">
         <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-3 mb-5">
               <div className="w-10 h-[1px] bg-black/5" />
               <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5em] text-black/30 block">{t_site('heroBadge') || 'Minimalist Future'}</span>
               <div className="w-10 h-[1px] bg-black/5" />
            </div>
         </motion.div>
         <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl lg:text-6xl font-black text-black/90 leading-[1.2] tracking-tighter uppercase mb-6 selection:bg-black selection:text-white">
            {t_site('heroTitle')}
         </motion.h1>
         <motion.p variants={itemVariants} className="max-w-xl mx-auto text-xs md:text-base text-black/40 mb-10 font-medium leading-relaxed italic">
            {t_site('heroDescription')}
         </motion.p>
         <motion.div variants={itemVariants} className="flex flex-col items-center gap-8">
            <a href="#team" className="group relative px-10 py-4 bg-black text-white font-bold uppercase tracking-[0.2em] text-[9px] border border-black hover:bg-transparent hover:text-black transition-all duration-500 overflow-hidden">
               <span className="relative z-10">{t_site('ctaText')}</span>
               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
            <Stats settings={settings} t_site={t_site} className="text-black scale-[0.8] opacity-40" />
         </motion.div>
      </motion.div>
   </section>
);

// --- EDITORIAL BOLD ---
export const HeroEditorial: React.FC<HeroProps> = ({ settings, t_site }) => (
   <section id="hero" className="relative min-h-screen bg-[#0a0a0a] flex flex-col justify-center overflow-hidden px-6 lg:px-20 pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#1a1a1a_0%,#0a0a0a_100%)]" />
      <BackgroundMedia settings={settings} opacity={0.15} />
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative z-30 w-full grid lg:grid-cols-12 gap-12 items-center">
         <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-7">
            <motion.div variants={itemVariants} className="mb-10 flex items-center gap-4">
               <div className="w-1.5 h-1.5 bg-white/40 rotate-45" />
               <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/40">{t_site('heroBadge') || 'Editorial Select'}</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter uppercase mb-12">
               {t_site('heroTitle')?.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 === 1 ? "block text-transparent stroke-text" : "block"}>
                     {word}
                  </span>
               ))}
            </motion.h1>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-12 items-center">
               <a href="#team" className="group relative flex items-center justify-center px-12 py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] overflow-hidden">
                  <div className="absolute inset-0 bg-neutral-200 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10">{t_site('ctaText')}</span>
               </a>
               <Stats settings={settings} t_site={t_site} className="text-white/30 scale-110 origin-left" />
            </motion.div>
         </motion.div>

         <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block lg:col-span-5 relative"
         >
            <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden group border border-white/5 shadow-2xl">
               <img
                  src={settings?.heroImageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                  alt="Editorial"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

               {/* Decorative frames */}
               <div className="absolute top-8 left-8 right-8 bottom-8 border border-white/10 pointer-events-none" />
               <div className="absolute -top-4 -right-4 w-24 h-24 border-r border-top border-white/20 pointer-events-none" />
            </div>
         </motion.div>
      </div>
   </section>
);

// --- DARK PREMIUM ---
export const HeroDark: React.FC<HeroProps> = ({ settings, t_site }) => (
   <section id="hero" className="relative min-h-screen bg-[#080808] flex items-center overflow-hidden px-6 lg:px-12 pt-20">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4af37]/5 blur-[150px] rounded-full" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>
      <BackgroundMedia settings={settings} opacity={0.1} />
      <div className="relative z-30 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
         <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
               <div className="h-[1px] w-10 bg-gradient-to-r from-[#d4af37]/40 to-transparent" />
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4af37]/60">{t_site('heroBadge') || 'Luxury Tier'}</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-white/90 leading-[1.1] tracking-tight uppercase mb-8">
               {t_site('heroTitle')}
            </motion.h1>
            <motion.p variants={itemVariants} className="max-w-xl text-xs md:text-sm text-white/30 mb-10 font-medium leading-relaxed border-l border-[#d4af37]/10 pl-5">{t_site('heroDescription')}</motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 items-center">
               <a href="#team" className="group relative px-10 py-5 bg-[#d4af37]/90 text-black font-bold uppercase tracking-[0.2em] text-[9px] rounded-none hover:bg-white transition-all duration-500">
                  <span className="relative z-10">{t_site('ctaText')}</span>
               </a>
               <div className="flex gap-10 items-center bg-white/[0.02] backdrop-blur-md p-5 border border-white/5">
                  <div className="text-left">
                     <p className="text-2xl font-black text-white/80 leading-none mb-1">{settings?.heroStat1Value || '250+'}</p>
                     <p className="text-[8px] font-bold uppercase tracking-widest text-[#d4af37]/40">{t_site('heroStat1Label') || 'Projects'}</p>
                  </div>
                  <div className="w-[px] h-8 bg-white/5" />
                  <div className="text-left">
                     <p className="text-2xl font-black text-white/80 leading-none mb-1">{settings?.heroStat2Value || '15+'}</p>
                     <p className="text-[8px] font-bold uppercase tracking-widest text-[#d4af37]/40">{t_site('heroStat2Label') || 'Awards'}</p>
                  </div>
               </div>
            </motion.div>
         </motion.div>
         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} className="hidden lg:block relative">
            <div className="relative p-1 bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-none overflow-hidden">
               <div className="aspect-[3/4] overflow-hidden grayscale brightness-[0.6] hover:grayscale-0 hover:brightness-100 transition-all duration-1000">
                  <img src={settings?.heroImageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover scale-105" alt="Premium" />
               </div>
            </div>
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
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
               {t_site('heroTitle')}
            </motion.h1>
            <motion.p variants={itemVariants} className="max-w-xl text-sm md:text-lg text-slate-500 mb-10 leading-relaxed font-medium">
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
export const HeroGradient: React.FC<HeroProps> = ({ settings, t_site }) => {
   const words = t_site('heroTitle')?.split(' ') || ['NEXT', 'GEN', 'TECH'];

   return (
      <section id="hero" className="relative min-h-screen bg-[#020617] bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px] overflow-hidden font-sans">
         <div className="absolute top-0 bottom-0 left-8 w-px bg-white/10 z-0" />

         {/* Moved badge to bottom right to avoid looking like a navbar */}
         <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 right-8 z-30 flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 backdrop-blur-none"
         >
            <div className="w-1.5 h-1.5 bg-blue-400" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-white/70">{t_site('heroBadge') || 'Next Gen Tech'}</span>
         </motion.div>

         <div className="relative z-10 w-full max-w-5xl mx-auto px-16 lg:px-24 pt-32 pb-20 flex flex-col min-h-screen justify-center">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col">
               <div className="flex flex-col relative mb-12">
                  {words.map((word, i) => (
                     <div key={i} className="relative flex items-center mb-4">
                        <div className="absolute -left-10 lg:-left-18 w-4 h-px bg-white/30" />
                        <motion.h1 
                           variants={itemVariants} 
                           className={`text-6xl lg:text-8xl font-black uppercase leading-[0.9] ${i % 2 === 0 ? 'text-white' : 'text-transparent'}`}
                           style={i % 2 === 0 ? {} : { WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}
                        >
                           {word}
                        </motion.h1>
                     </div>
                  ))}
               </div>
               <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
                  <motion.p variants={itemVariants} className="text-white/30 text-sm font-light max-w-xs leading-relaxed">
                     {t_site('heroDescription')}
                  </motion.p>
                  <motion.div variants={itemVariants} className="flex gap-4">
                     <div className="bg-white/5 border border-white/10 px-6 py-4 flex flex-col">
                        <span className="font-black text-2xl text-white">{settings?.heroStat1Value || '250+'}</span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 mt-1">{t_site('heroStat1Label') || 'Projects'}</span>
                     </div>
                     <div className="bg-white/5 border border-white/10 px-6 py-4 flex flex-col">
                        <span className="font-black text-2xl text-white">{settings?.heroStat2Value || '15+'}</span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 mt-1">{t_site('heroStat2Label') || 'Awards'}</span>
                     </div>
                  </motion.div>
               </div>
               <motion.div variants={itemVariants} className="mt-12">
                  <a href="#team" className="inline-block border border-white/20 px-12 py-4 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-colors duration-300 text-center">
                     {t_site('ctaText')}
                  </a>
               </motion.div>
            </motion.div>
         </div>
      </section>
   );
};
