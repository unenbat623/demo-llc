import React from 'react';
import { SiteSettings } from '../../../../types/admin';
import { Sparkles, Hash, Calendar, Tag } from 'lucide-react';

interface HeroExtraSectionProps {
  siteSettings: SiteSettings;
  updateField: (field: keyof SiteSettings, value: string) => void;
}

const HeroExtraSection: React.FC<HeroExtraSectionProps> = ({ siteSettings, updateField }) => {
  return (
    <div className="space-y-8 mt-6 pt-10 border-t border-black/5">
      <div className="flex items-center gap-2">
        <Sparkles size={14} className="text-black" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Hero Нэмэлт элементүүд</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Badge */}
        <div className="bg-gray-50/50 p-5 border border-black/5 rounded-sm space-y-2">
          <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400">
            <Tag size={10} /> Badge текст
          </label>
          <input 
            type="text" 
            value={siteSettings.heroBadge || ''} 
            onChange={e => updateField('heroBadge', e.target.value)} 
            className="w-full bg-white border border-black/10 px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm" 
            placeholder="Tech Solutions" 
          />
        </div>

        {/* Established */}
        <div className="bg-gray-50/50 p-5 border border-black/5 rounded-sm space-y-2">
          <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400">
            <Calendar size={10} /> Байгуулагдсан он
          </label>
          <input 
            type="text" 
            value={siteSettings.heroEstablished || ''} 
            onChange={e => updateField('heroEstablished', e.target.value)} 
            className="w-full bg-white border border-black/10 px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm" 
            placeholder="MMXXIV" 
          />
        </div>

        {/* Tagline */}
        <div className="bg-gray-50/50 p-5 border border-black/5 rounded-sm space-y-2">
          <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400">
            <Hash size={10} /> Tagline текст
          </label>
          <input 
            type="text" 
            value={siteSettings.heroTagline || ''} 
            onChange={e => updateField('heroTagline', e.target.value)} 
            className="w-full bg-white border border-black/10 px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm" 
            placeholder="Digital_Engine_01" 
          />
        </div>

        {/* Stats */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/[0.02] p-6 border border-black/5 rounded-sm">
          <div className="space-y-3">
            <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Stat 1 (ж-нь: 250+ / Projects)</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={siteSettings.heroStat1Value || ''} 
                onChange={e => updateField('heroStat1Value', e.target.value)} 
                className="w-24 bg-white border border-black/10 px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm" 
                placeholder="250+" 
              />
              <input 
                type="text" 
                value={siteSettings.heroStat1Label || ''} 
                onChange={e => updateField('heroStat1Label', e.target.value)} 
                className="flex-1 bg-white border border-black/10 px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm" 
                placeholder="Projects" 
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Stat 2 (ж-нь: 15+ / Awards)</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={siteSettings.heroStat2Value || ''} 
                onChange={e => updateField('heroStat2Value', e.target.value)} 
                className="w-24 bg-white border border-black/10 px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm" 
                placeholder="15+" 
              />
              <input 
                type="text" 
                value={siteSettings.heroStat2Label || ''} 
                onChange={e => updateField('heroStat2Label', e.target.value)} 
                className="flex-1 bg-white border border-black/10 px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm" 
                placeholder="Awards" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroExtraSection;
