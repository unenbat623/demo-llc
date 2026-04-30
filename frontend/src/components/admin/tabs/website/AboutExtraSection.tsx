import React from 'react';
import { SiteSettings } from '../../../../types/admin';

interface AboutExtraSectionProps {
  siteSettings: SiteSettings;
  updateField: (field: keyof SiteSettings, value: string) => void;
}

const AboutExtraSection: React.FC<AboutExtraSectionProps> = ({ siteSettings, updateField }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-black/5 pt-6">
      <div>
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Badge текст ("Компанийн тухай")</label>
        <input type="text" value={siteSettings.aboutBadge || ''} onChange={e => updateField('aboutBadge', e.target.value)} className="w-full bg-gray-50 border border-black/10 px-3 py-2.5 text-sm focus:outline-none focus:border-black rounded-sm" placeholder="Компанийн тухай" />
      </div>
      <div>
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Tagline текст ("Innovation First")</label>
        <input type="text" value={siteSettings.aboutTagline || ''} onChange={e => updateField('aboutTagline', e.target.value)} className="w-full bg-gray-50 border border-black/10 px-3 py-2.5 text-sm focus:outline-none focus:border-black rounded-sm" placeholder="Innovation First" />
      </div>
    </div>
  );
};

export default AboutExtraSection;
