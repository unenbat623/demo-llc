import React from 'react';
import { SiteSettings } from '../../types/admin';

export const BackgroundMedia: React.FC<{ settings: SiteSettings | null; opacity?: number }> = ({ settings, opacity = 0.3 }) => (
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 z-10" />
    {settings?.heroBgUrl?.includes('mp4') || settings?.heroBgUrl?.includes('data:video') ? (
      <video
        autoPlay loop muted playsInline
        className="w-full h-full object-cover grayscale scale-105"
        style={{ opacity }}
        key={settings?.heroBgUrl}
      >
        <source src={settings?.heroBgUrl} type="video/mp4" />
      </video>
    ) : (
      <img
        src={settings?.heroBgUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"}
        className="w-full h-full object-cover grayscale scale-105"
        style={{ opacity }}
        alt="Background"
      />
    )}
    <div className="absolute inset-0 opacity-[0.05] z-20 pointer-events-none"
      style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
  </div>
);

export const Stats: React.FC<{ settings: SiteSettings | null; className?: string }> = ({ settings, className = "" }) => (
  <div className={`flex items-center gap-8 ${className}`}>
    <div className="flex flex-col">
      <span className="font-black text-2xl leading-none">{settings?.heroStat1Value || '250+'}</span>
      <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mt-1">{settings?.heroStat1Label || 'Projects'}</span>
    </div>
    <div className="w-px h-8 bg-current opacity-10" />
    <div className="flex flex-col">
      <span className="font-black text-2xl leading-none">{settings?.heroStat2Value || '15+'}</span>
      <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mt-1">{settings?.heroStat2Label || 'Awards'}</span>
    </div>
  </div>
);
