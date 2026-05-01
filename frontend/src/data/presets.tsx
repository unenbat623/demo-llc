import React from 'react';
import { SiteSettings } from '../types/admin';

export interface Preset {
  id: string;
  name: string;
  desc: string;
  badge: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  template: string;
  navbarLayout: string;
  navbarStyle: string;
  heroLayout: string;
  heroStyle: string;
  buttonStyle: string;
  fontStyle: string;
  preview: React.ReactNode;
}

export const presets: Preset[] = [
  {
    id: 'split-hero',
    name: 'Split Hero',
    desc: 'Left text · Right image',
    badge: 'Default',
    primaryColor: '#0a0a0a',
    secondaryColor: '#ffffff',
    accentColor: '#1a1a1a',
    textColor: '#ffffff',
    template: 'split-hero',
    navbarLayout: 'logo-left',
    navbarStyle: 'classic',
    heroLayout: 'image-right',
    heroStyle: 'split',
    buttonStyle: 'sharp',
    fontStyle: 'display',
    preview: (
      <div className="w-full h-full bg-[#0a0a0a] flex flex-col p-3 select-none">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-white/80 rotate-45" />
            <div className="text-[6px] font-black text-white uppercase tracking-wider">BRAND</div>
          </div>
          <div className="bg-white px-2 py-0.5 text-[5px] font-black text-black uppercase tracking-wider">CTA</div>
        </div>
        <div className="flex flex-1 gap-2 mt-1">
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-[9px] font-black text-white uppercase leading-tight tracking-tight">ТОМ<br/>ГАРЧИГ</div>
            <div className="text-[5px] text-white/40 mt-1 uppercase tracking-wide">Тайлбар</div>
            <div className="mt-2 bg-white text-black text-[5px] font-black uppercase px-2 py-0.5 inline-block w-fit">CTA</div>
          </div>
          <div className="w-[38%] bg-white/10 border border-white/5 flex items-center justify-center rounded-sm">
            <span className="text-[5px] text-white/30 uppercase tracking-wider">IMAGE</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'centered-minimal',
    name: 'Centered Minimal',
    desc: 'Full-width centered',
    badge: 'Clean',
    primaryColor: '#ffffff',
    secondaryColor: '#000000',
    accentColor: '#f8fafc',
    textColor: '#000000',
    template: 'centered-minimal',
    navbarLayout: 'logo-center',
    navbarStyle: 'bordered',
    heroLayout: 'centered',
    heroStyle: 'centered',
    buttonStyle: 'sharp',
    fontStyle: 'sans',
    preview: (
      <div className="w-full h-full bg-white flex flex-col p-3 select-none border border-black/5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[5px] text-black/30 uppercase tracking-widest">MENU</div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-black rotate-45" />
            <div className="text-[6px] font-black text-black uppercase tracking-wider">BRAND</div>
          </div>
          <div className="bg-black px-2 py-0.5 text-[5px] font-black text-white uppercase tracking-wider">CTA</div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
          <div className="text-[10px] font-black text-black uppercase leading-tight tracking-tight mb-1">CENTERED<br/>HEADLINE</div>
          <div className="text-[5px] text-black/40 uppercase tracking-wide mb-2">Subtext</div>
          <div className="bg-black px-3 py-1 text-[5px] font-black text-white uppercase tracking-wider">CTA BUTTON</div>
        </div>
      </div>
    )
  },
  {
    id: 'editorial-bold',
    name: 'Editorial Bold',
    desc: 'Magazine asymmetric',
    badge: 'Bold',
    primaryColor: '#0a0a0a',
    secondaryColor: '#f5f5f5',
    accentColor: '#d4af37',
    textColor: '#ffffff',
    template: 'editorial-bold',
    navbarLayout: 'logo-left',
    navbarStyle: 'inverted',
    heroLayout: 'image-left',
    heroStyle: 'editorial',
    buttonStyle: 'underline',
    fontStyle: 'display',
    preview: (
      <div className="w-full h-full bg-[#0a0a0a] flex flex-col p-3 select-none">
        <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-white/80 rotate-45" />
            <div className="text-[6px] font-black text-white uppercase tracking-wider">BRAND</div>
          </div>
          <div className="text-[5px] text-white/40 uppercase tracking-widest">NAV · NAV</div>
        </div>
        <div className="flex-1 flex flex-col justify-start pt-1">
          <div className="text-[12px] font-black text-white italic uppercase leading-none tracking-tight mb-2">EDITORIAL<br/>BOLD<br/>DESIGN</div>
          <div className="flex items-center gap-1">
            <div className="bg-[#d4af37]/20 border border-[#d4af37]/30 px-1.5 py-0.5 text-[4px] text-[#d4af37] uppercase tracking-widest">250+ PROJECTS</div>
            <div className="bg-[#d4af37]/20 border border-[#d4af37]/30 px-1.5 py-0.5 text-[4px] text-[#d4af37] uppercase tracking-widest">15+ AWARDS</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'dark-premium',
    name: 'Full Dark',
    desc: 'All-dark premium',
    badge: 'Luxury',
    primaryColor: '#050505',
    secondaryColor: '#d4af37',
    accentColor: '#111111',
    textColor: '#ffffff',
    template: 'dark-premium',
    navbarLayout: 'logo-left',
    navbarStyle: 'inverted',
    heroLayout: 'image-right',
    heroStyle: 'overlay',
    buttonStyle: 'pill',
    fontStyle: 'display',
    preview: (
      <div className="w-full h-full bg-[#050505] flex flex-col p-3 select-none">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#d4af37] rotate-45" />
            <div className="text-[6px] font-black text-white uppercase tracking-wider">BRAND</div>
          </div>
          <div className="bg-[#d4af37] px-2 py-0.5 text-[5px] font-black text-black rounded-full uppercase tracking-wider">CTA</div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-[9px] font-black text-white uppercase leading-tight mb-3">DARK<br/>PREMIUM</div>
          <div className="grid grid-cols-2 gap-1">
            {['SVC 01','SVC 02','SVC 03','SVC 04'].map(s => (
              <div key={s} className="bg-white/5 border border-white/5 px-1 py-1">
                <div className="text-[4px] text-white/30 uppercase tracking-widest">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'light-corporate',
    name: 'Light Corporate',
    desc: 'White + black grid',
    badge: 'Pro',
    primaryColor: '#ffffff',
    secondaryColor: '#2563eb',
    accentColor: '#f1f5f9',
    textColor: '#0f172a',
    template: 'light-corporate',
    navbarLayout: 'logo-left',
    navbarStyle: 'bordered',
    heroLayout: 'image-right',
    heroStyle: 'split',
    buttonStyle: 'rounded',
    fontStyle: 'sans',
    preview: (
      <div className="w-full h-full bg-white flex flex-col p-3 select-none">
        <div className="flex items-center justify-between mb-3 border-b border-black/10 pb-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#2563eb] rotate-45" />
            <div className="text-[6px] font-black text-[#0f172a] uppercase tracking-wider">BRAND</div>
          </div>
          <div className="bg-[#2563eb] px-2 py-0.5 text-[5px] font-black text-white rounded uppercase tracking-wider">CTA</div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-[9px] font-black text-[#0f172a] uppercase leading-tight mb-3">CORPORATE<br/>HEADLINE</div>
          <div className="flex gap-1 border-t border-black/10 pt-2">
            {['TEAM','PROJECTS','PARTNERS','EST.'].map(s => (
              <div key={s} className="flex-1 text-center border-r border-black/5 last:border-0">
                <div className="text-[4px] text-black/30 uppercase tracking-widest">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'gradient-modern',
    name: 'Gradient Modern',
    desc: 'Dark→light gradient',
    badge: 'Tech',
    primaryColor: '#0f172a',
    secondaryColor: '#38bdf8',
    accentColor: '#1e293b',
    textColor: '#ffffff',
    template: 'gradient-modern',
    navbarLayout: 'logo-right',
    navbarStyle: 'floating',
    heroLayout: 'centered',
    heroStyle: 'overlay',
    buttonStyle: 'pill',
    fontStyle: 'sans',
    preview: (
      <div className="w-full h-full flex flex-col p-3 select-none" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[5px] text-white/30 uppercase tracking-widest">NAV</div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#38bdf8] rotate-45" />
            <div className="text-[6px] font-black text-white uppercase tracking-wider">BRAND</div>
          </div>
          <div className="bg-[#38bdf8] px-2 py-0.5 text-[5px] font-black text-black rounded-full uppercase tracking-wider">CTA</div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-[9px] font-black text-white uppercase leading-tight mb-3">GRADIENT<br/>MODERN</div>
          <div className="flex gap-1.5">
            <div className="flex-1 bg-white/10 border border-white/10 p-1.5 text-center rounded-sm">
              <div className="text-[7px] font-black text-white">250+</div>
              <div className="text-[4px] text-white/40 uppercase tracking-widest">Projects</div>
            </div>
            <div className="flex-1 bg-white/10 border border-white/10 p-1.5 text-center rounded-sm">
              <div className="text-[7px] font-black text-white">15+</div>
              <div className="text-[4px] text-white/40 uppercase tracking-widest">Awards</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
];
