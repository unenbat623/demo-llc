import React from 'react';
import { SiteSettings } from '../../../../types/admin';

interface HeroExtraSectionProps {
  siteSettings: SiteSettings;
  updateField: (field: keyof SiteSettings, value: string) => void;
}

const HeroExtraSection: React.FC<HeroExtraSectionProps> = ({ siteSettings, updateField }) => {
  return (
    <div className="border-t border-black/5 pt-6">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Hero нэмэлт мэдээлэл</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Badge текст</label>
          <input type="text" value={siteSettings.heroBadge || ''} onChange={e => updateField('heroBadge', e.target.value)} className="w-full bg-gray-50 border border-black/10 px-3 py-2.5 text-sm focus:outline-none focus:border-black rounded-sm" placeholder="Tech Solutions" />
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Stat 1 (250+ / Projects)</label>
          <div className="flex gap-2">
            <input type="text" value={siteSettings.heroStat1Value || ''} onChange={e => updateField('heroStat1Value', e.target.value)} className="w-20 bg-gray-50 border border-black/10 px-3 py-2.5 text-sm focus:outline-none focus:border-black rounded-sm" placeholder="250+" />
            <input type="text" value={siteSettings.heroStat1Label || ''} onChange={e => updateField('heroStat1Label', e.target.value)} className="flex-1 bg-gray-50 border border-black/10 px-3 py-2.5 text-sm focus:outline-none focus:border-black rounded-sm" placeholder="Projects" />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Stat 2 (15+ / Awards)</label>
          <div className="flex gap-2">
            <input type="text" value={siteSettings.heroStat2Value || ''} onChange={e => updateField('heroStat2Value', e.target.value)} className="w-20 bg-gray-50 border border-black/10 px-3 py-2.5 text-sm focus:outline-none focus:border-black rounded-sm" placeholder="15+" />
            <input type="text" value={siteSettings.heroStat2Label || ''} onChange={e => updateField('heroStat2Label', e.target.value)} className="flex-1 bg-gray-50 border border-black/10 px-3 py-2.5 text-sm focus:outline-none focus:border-black rounded-sm" placeholder="Awards" />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Байгуулагдсан он</label>
          <input type="text" value={siteSettings.heroEstablished || ''} onChange={e => updateField('heroEstablished', e.target.value)} className="w-full bg-gray-50 border border-black/10 px-3 py-2.5 text-sm focus:outline-none focus:border-black rounded-sm" placeholder="MMXXIV" />
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Tagline текст</label>
          <input type="text" value={siteSettings.heroTagline || ''} onChange={e => updateField('heroTagline', e.target.value)} className="w-full bg-gray-50 border border-black/10 px-3 py-2.5 text-sm focus:outline-none focus:border-black rounded-sm" placeholder="Digital_Engine_01" />
        </div>
      </div>
    </div>
  );
};

export default HeroExtraSection;
