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
export const HeroCentered: React.FC<HeroProps> = ({ settings, t_site }) => {
   return (
      <section id="hero" className="relative min-h-screen w-full bg-[#fafafa] flex flex-col items-center justify-center font-sans overflow-hidden px-6">
         {/* Extremely subtle background dot grid */}
         <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:24px_24px]" />
         <BackgroundMedia settings={settings} opacity={0.03} />

         <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-12">
            
            {/* Minimal Badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
               <div className="w-8 h-px bg-black/20" />
               <span className="font-mono text-[10px] text-black/40 uppercase tracking-[0.4em]">
                  {t_site('heroBadge') || 'Minimalist Future'}
               </span>
               <div className="w-8 h-px bg-black/20" />
            </motion.div>

            {/* Oversized Centered Headline */}
            <motion.h1 variants={itemVariants} className="text-6xl sm:text-7xl lg:text-[8rem] font-black text-black leading-[0.9] tracking-tighter uppercase mb-8">
               {t_site('heroTitle')}
            </motion.h1>

            {/* Subtitle / Description */}
            <motion.p variants={itemVariants} className="text-black/50 text-sm md:text-base font-light max-w-lg leading-relaxed mb-12">
               {t_site('heroDescription')}
            </motion.p>

            {/* Minimal CTA */}
            <motion.div variants={itemVariants}>
               <a href="#team" className="group relative inline-flex items-center justify-center px-10 py-4 bg-black text-white font-mono text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-transform hover:scale-105 active:scale-95">
                  <span className="relative z-10 group-hover:text-black transition-colors duration-500">{t_site('ctaText')}</span>
                  <div className="absolute inset-0 bg-white border border-black transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
               </a>
            </motion.div>
         </motion.div>

         {/* Minimal Stats floating at bottom */}
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-10 left-0 w-full flex justify-center gap-16 md:gap-32 px-6"
         >
            <div className="flex flex-col items-center">
               <span className="font-black text-2xl text-black">{settings?.heroStat1Value || '250+'}</span>
               <span className="font-mono text-[9px] text-black/40 uppercase tracking-widest mt-1">{t_site('heroStat1Label') || 'Projects'}</span>
            </div>
            <div className="w-px h-10 bg-black/10" />
            <div className="flex flex-col items-center">
               <span className="font-black text-2xl text-black">{settings?.heroStat2Value || '15+'}</span>
               <span className="font-mono text-[9px] text-black/40 uppercase tracking-widest mt-1">{t_site('heroStat2Label') || 'Awards'}</span>
            </div>
         </motion.div>
      </section>
   );
};

// --- EDITORIAL BOLD ---
export const HeroEditorial: React.FC<HeroProps> = ({ settings, t_site }) => (
   <section id="hero" className="relative min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col pt-24 lg:pt-0 border-b border-white/10">
      <BackgroundMedia settings={settings} opacity={0.1} />
      
      {/* Editorial Grid Lines Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-between px-6 lg:px-12 opacity-10 z-0">
         <div className="w-px h-full bg-white" />
         <div className="w-px h-full bg-white hidden md:block" />
         <div className="w-px h-full bg-white hidden lg:block" />
         <div className="w-px h-full bg-white hidden lg:block" />
         <div className="w-px h-full bg-white" />
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col lg:grid lg:grid-cols-4 px-6 lg:px-12 flex-1">
         
         {/* Left Column: Meta & Description */}
         <div className="lg:col-span-1 border-r-0 lg:border-r border-white/10 pt-4 lg:pt-32 flex flex-col justify-between pr-0 lg:pr-8 order-2 lg:order-1 mt-12 lg:mt-0 pb-12 lg:pb-0">
            <motion.div variants={itemVariants} className="mb-12 lg:mb-0">
               <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#B89C50]/70 block mb-4 border-b border-[#B89C50]/20 pb-4">
                  Issue 01 // {new Date().getFullYear()}
               </span>
               <h3 className="text-xs font-bold uppercase tracking-widest leading-loose text-white/80 mb-8">
                  {t_site('heroBadge') || 'The Editorial Selection'}
               </h3>
               <p className="text-white/50 text-xs leading-relaxed border-l-2 border-[#B89C50]/50 pl-4">
                  {t_site('heroDescription')}
               </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-auto hidden lg:block pb-16">
               <a href="#team" className="group flex items-center justify-between border border-[#B89C50]/40 px-6 py-5 hover:bg-[#B89C50] transition-all duration-500 w-full">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#B89C50] group-hover:text-black">{t_site('ctaText')}</span>
                  <div className="w-1.5 h-1.5 bg-[#B89C50] group-hover:bg-black rounded-none rotate-45 transition-colors" />
               </a>
            </motion.div>
         </div>

         {/* Middle Columns: Massive Title & Golden Stats (Exactly like the thumbnail) */}
         <div className="relative z-40 lg:col-span-2 lg:border-r border-white/10 pt-12 lg:pt-32 px-0 lg:px-12 flex flex-col order-1 lg:order-2 justify-center">
            <motion.h1 variants={itemVariants} className="text-[4.5rem] sm:text-[6rem] lg:text-[7.5rem] xl:text-[9rem] font-black uppercase leading-[0.85] tracking-tighter mb-8 mix-blend-difference">
               {t_site('heroTitle')?.split(' ').map((word, i) => (
                  <span key={i} className={`block whitespace-nowrap ${i % 2 !== 0 ? 'text-transparent stroke-text italic' : 'text-white'}`} style={i % 2 !== 0 ? { WebkitTextStroke: '1.5px #B89C50' } : {}}>
                     {word}
                  </span>
               ))}
            </motion.h1>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 mb-12">
               <div className="relative border border-[#B89C50]/40 px-10 py-4 flex items-center justify-center bg-transparent hover:bg-[#B89C50]/5 transition-colors cursor-default backdrop-blur-sm min-w-[220px] group">
                  <div className="absolute -top-px -left-px w-1 h-1 bg-[#B89C50]/60 group-hover:bg-[#B89C50] transition-colors" />
                  <div className="absolute -top-px -right-px w-1 h-1 bg-[#B89C50]/60 group-hover:bg-[#B89C50] transition-colors" />
                  <div className="absolute -bottom-px -left-px w-1 h-1 bg-[#B89C50]/60 group-hover:bg-[#B89C50] transition-colors" />
                  <div className="absolute -bottom-px -right-px w-1 h-1 bg-[#B89C50]/60 group-hover:bg-[#B89C50] transition-colors" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#B89C50]">
                     {settings?.heroStat1Value || '250+'} {t_site('heroStat1Label') || 'Projects'}
                  </span>
               </div>
               <div className="relative border border-[#B89C50]/40 px-10 py-4 flex items-center justify-center bg-transparent hover:bg-[#B89C50]/5 transition-colors cursor-default backdrop-blur-sm min-w-[220px] group">
                  <div className="absolute -top-px -left-px w-1 h-1 bg-[#B89C50]/60 group-hover:bg-[#B89C50] transition-colors" />
                  <div className="absolute -top-px -right-px w-1 h-1 bg-[#B89C50]/60 group-hover:bg-[#B89C50] transition-colors" />
                  <div className="absolute -bottom-px -left-px w-1 h-1 bg-[#B89C50]/60 group-hover:bg-[#B89C50] transition-colors" />
                  <div className="absolute -bottom-px -right-px w-1 h-1 bg-[#B89C50]/60 group-hover:bg-[#B89C50] transition-colors" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#B89C50]">
                     {settings?.heroStat2Value || '15+'} {t_site('heroStat2Label') || 'Awards'}
                  </span>
               </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="lg:hidden mt-8 pb-12">
               <a href="#team" className="group flex items-center justify-between border border-[#B89C50]/40 px-8 py-5 hover:bg-[#B89C50] transition-all duration-500 w-full max-w-sm backdrop-blur-sm">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#B89C50] group-hover:text-black">{t_site('ctaText')}</span>
                  <div className="w-1.5 h-1.5 bg-[#B89C50] group-hover:bg-black rounded-none rotate-45 transition-colors" />
               </a>
            </motion.div>
         </div>

         {/* Right Column: Asymmetric Image */}
         <div className="lg:col-span-1 pt-12 lg:pt-0 flex flex-col order-3 h-full min-h-[400px] lg:min-h-0">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1.5, delay: 0.5 }}
               className="w-full h-full relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border-t lg:border-t-0 border-white/10 lg:-mr-12"
            >
               <img 
                  src={settings?.heroImageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"} 
                  className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                  alt="Editorial Feature"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
         </div>
      </motion.div>
   </section>
);

// --- DARK PREMIUM ---
export const HeroDark: React.FC<HeroProps> = ({ settings, t_site }) => (
   <section id="hero" className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden px-6 lg:px-12 pt-24 pb-12">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4af37]/10 blur-[150px] rounded-full" />
         <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[40%] bg-[#d4af37]/5 blur-[120px] rounded-full" />
      </div>
      <BackgroundMedia settings={settings} opacity={0.15} />
      
      <div className="relative z-30 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
         
         {/* Left Column: Content & Grid */}
         <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-7 flex flex-col items-start w-full">
            
            {/* Top Bar: Diamond Logo & Pill CTA */}
            <motion.div variants={itemVariants} className="flex items-center justify-between w-full mb-16 border-b border-white/10 pb-6">
               <div className="flex items-center gap-4">
                  <div className="w-3.5 h-3.5 bg-[#d4af37] rotate-45" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/90">
                     {settings?.navbarLogo || 'BRAND'}
                  </span>
               </div>
               <a href="#team" className="px-6 py-2 bg-[#d4af37] text-black font-black uppercase tracking-[0.2em] text-[9px] rounded-full hover:bg-white hover:scale-105 transition-all duration-300">
                  {t_site('ctaText') || 'CTA'}
               </a>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter uppercase mb-12">
               {t_site('heroTitle')}
            </motion.h1>

            {/* Grid of subtle boxes */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
               <div className="border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition-colors cursor-default backdrop-blur-sm">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-3 block">01</span>
                  <p className="text-2xl font-black text-white/90 mb-1">{settings?.heroStat1Value || '250+'}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#d4af37]">{t_site('heroStat1Label') || 'Projects'}</p>
               </div>
               <div className="border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition-colors cursor-default backdrop-blur-sm">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-3 block">02</span>
                  <p className="text-2xl font-black text-white/90 mb-1">{settings?.heroStat2Value || '15+'}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#d4af37]">{t_site('heroStat2Label') || 'Awards'}</p>
               </div>
               <div className="border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition-colors cursor-default backdrop-blur-sm sm:col-span-2 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                  <div className="max-w-md">
                     <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-3 block">03 // INTRO</span>
                     <p className="text-xs font-medium text-white/70 leading-relaxed">
                        {t_site('heroDescription')}
                     </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0 mt-4 md:mt-0">
                     <div className="w-2.5 h-2.5 bg-[#d4af37] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                  </div>
               </div>
            </motion.div>
         </motion.div>

         {/* Right Column: Premium Image */}
         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="hidden lg:block lg:col-span-5 relative h-full min-h-[600px]">
            <div className="absolute inset-0 p-1 bg-gradient-to-br from-[#d4af37]/20 to-transparent rounded-sm overflow-hidden">
               <div className="w-full h-full overflow-hidden bg-black relative">
                  <img src={settings?.heroImageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover scale-105 opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:scale-100 hover:opacity-100 transition-all duration-1000" alt="Premium" />
                  {/* Subtle overlay gradient to blend bottom edge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
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
