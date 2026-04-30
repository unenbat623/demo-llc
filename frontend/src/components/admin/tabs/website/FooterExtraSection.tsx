import React from 'react';
import { SiteSettings } from '../../../../types/admin';

interface FooterExtraSectionProps {
  siteSettings: SiteSettings;
  activeLang: 'mn' | 'en';
  updateField: (field: keyof SiteSettings, value: string) => void;
}

const FooterExtraSection: React.FC<FooterExtraSectionProps> = ({ siteSettings, activeLang, updateField }) => {
  return (
    <div className="space-y-8">
      <div className="border-t border-black/5 pt-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Footer CTA текст</p>
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{activeLang === 'mn' ? 'Гарчиг' : 'Heading'}</label>
            <input type="text" value={activeLang === 'mn' ? (siteSettings.footerCta || '') : (siteSettings.footerCta_en || '')} onChange={e => updateField(activeLang === 'mn' ? 'footerCta' : 'footerCta_en', e.target.value)} className="w-full bg-gray-50 border border-black/10 px-3 py-2.5 text-sm focus:outline-none focus:border-black rounded-sm" placeholder="Хамтдаа ажиллах бэлэн үү?" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{activeLang === 'mn' ? 'Дэд текст' : 'Subtext'}</label>
            <textarea rows={2} value={activeLang === 'mn' ? (siteSettings.footerCtaSub || '') : (siteSettings.footerCtaSub_en || '')} onChange={e => updateField(activeLang === 'mn' ? 'footerCtaSub' : 'footerCtaSub_en', e.target.value)} className="w-full bg-gray-50 border border-black/10 px-3 py-2.5 text-sm focus:outline-none focus:border-black rounded-sm resize-none" />
          </div>
        </div>
      </div>

      <div className="border-t border-black/5 pt-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Манай Баг секц</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Badge текст ("Expert Minds")</label>
            <input type="text" value={siteSettings.teamBadge || ''} onChange={e => updateField('teamBadge', e.target.value)} className="w-full bg-gray-50 border border-black/10 px-3 py-2.5 text-sm focus:outline-none focus:border-black rounded-sm" placeholder="Expert Minds" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{activeLang === 'mn' ? 'Гарчиг' : 'Title'}</label>
            <input type="text" value={activeLang === 'mn' ? (siteSettings.teamTitle || '') : (siteSettings.teamTitle_en || '')} onChange={e => updateField(activeLang === 'mn' ? 'teamTitle' : 'teamTitle_en', e.target.value)} className="w-full bg-gray-50 border border-black/10 px-3 py-2.5 text-sm focus:outline-none focus:border-black rounded-sm" placeholder="Манай баг" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{activeLang === 'mn' ? 'Тайлбар' : 'Description'}</label>
            <input type="text" value={activeLang === 'mn' ? (siteSettings.teamDescription || '') : (siteSettings.teamDescription_en || '')} onChange={e => updateField(activeLang === 'mn' ? 'teamDescription' : 'teamDescription_en', e.target.value)} className="w-full bg-gray-50 border border-black/10 px-3 py-2.5 text-sm focus:outline-none focus:border-black rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterExtraSection;
