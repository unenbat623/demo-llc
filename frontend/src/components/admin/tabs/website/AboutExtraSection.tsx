import React from 'react';
import { SiteSettings } from '../../../../types/admin';
import { Tag, Hash, FileText } from 'lucide-react';

interface AboutExtraSectionProps {
  siteSettings: SiteSettings;
  updateField: (field: keyof SiteSettings, value: string) => void;
  activeLang: 'mn' | 'en';
}

const AboutExtraSection: React.FC<AboutExtraSectionProps> = ({ siteSettings, updateField, activeLang }) => {
  const getField = (field: keyof SiteSettings) => {
    if (activeLang === 'en') {
      const enKey = `${String(field)}_en` as keyof SiteSettings;
      return siteSettings[enKey] || '';
    }
    return siteSettings[field] || '';
  };

  const setField = (field: keyof SiteSettings, value: string) => {
    if (activeLang === 'en') {
      const enKey = `${String(field)}_en` as keyof SiteSettings;
      updateField(enKey, value);
    } else {
      updateField(field, value);
    }
  };

  return (
    <div className="space-y-6 mt-6 pt-10 border-t border-black/5">
       <div className="flex items-center gap-2">
        <FileText size={14} className="text-black" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">About Нэмэлт элементүүд ({activeLang.toUpperCase()})</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50/50 p-5 border border-black/5 rounded-sm space-y-2">
          <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400">
            <Tag size={10} /> Badge текст
          </label>
          <input 
            type="text" 
            value={getField('aboutBadge')} 
            onChange={e => setField('aboutBadge', e.target.value)} 
            className="w-full bg-white border border-black/10 px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm" 
            placeholder="Компанийн тухай" 
          />
        </div>

        <div className="bg-gray-50/50 p-5 border border-black/5 rounded-sm space-y-2">
          <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400">
            <Hash size={10} /> Tagline текст
          </label>
          <input 
            type="text" 
            value={getField('aboutTagline')} 
            onChange={e => setField('aboutTagline', e.target.value)} 
            className="w-full bg-white border border-black/10 px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm" 
            placeholder="Innovation First" 
          />
        </div>
      </div>
    </div>
  );
};

export default AboutExtraSection;
