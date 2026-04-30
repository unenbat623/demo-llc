import React from 'react';
import { SiteSettings } from '../../../../types/admin';
import { Layout, Users, MessageSquare } from 'lucide-react';

interface FooterExtraSectionProps {
  siteSettings: SiteSettings;
  activeLang: 'mn' | 'en';
  updateField: (field: keyof SiteSettings, value: string) => void;
}

const FooterExtraSection: React.FC<FooterExtraSectionProps> = ({ siteSettings, activeLang, updateField }) => {
  return (
    <div className="space-y-10">
      {/* CTA Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-black/5">
          <MessageSquare size={14} className="text-black" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Footer Call-to-Action (CTA)</h4>
        </div>
        
        <div className="grid grid-cols-1 gap-6 bg-black/[0.02] p-6 rounded-sm border border-black/5">
          <div className="space-y-2">
            <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">
              {activeLang === 'mn' ? 'Үндсэн гарчиг' : 'Heading'}
            </label>
            <input 
              type="text" 
              value={activeLang === 'mn' ? (siteSettings.footerCta || '') : (siteSettings.footerCta_en || '')} 
              onChange={e => updateField(activeLang === 'mn' ? 'footerCta' : 'footerCta_en', e.target.value)} 
              className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm transition-all" 
              placeholder="Хамтдаа ажиллах бэлэн үү?" 
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">
              {activeLang === 'mn' ? 'Дэд текст' : 'Subtext'}
            </label>
            <textarea 
              rows={2} 
              value={activeLang === 'mn' ? (siteSettings.footerCtaSub || '') : (siteSettings.footerCtaSub_en || '')} 
              onChange={e => updateField(activeLang === 'mn' ? 'footerCtaSub' : 'footerCtaSub_en', e.target.value)} 
              className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm transition-all resize-none" 
              placeholder="..."
            />
          </div>
        </div>
      </div>

      {/* Team Section Extras */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2 pb-2 border-b border-black/5">
          <Users size={14} className="text-black" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Багийн танилцуулга (Team Section)</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/[0.02] p-6 rounded-sm border border-black/5">
          <div className="space-y-2">
            <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Badge текст ("Expert Minds")</label>
            <input 
              type="text" 
              value={siteSettings.teamBadge || ''} 
              onChange={e => updateField('teamBadge', e.target.value)} 
              className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm" 
              placeholder="Expert Minds" 
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">
              {activeLang === 'mn' ? 'Гарчиг' : 'Title'}
            </label>
            <input 
              type="text" 
              value={activeLang === 'mn' ? (siteSettings.teamTitle || '') : (siteSettings.teamTitle_en || '')} 
              onChange={e => updateField(activeLang === 'mn' ? 'teamTitle' : 'teamTitle_en', e.target.value)} 
              className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm" 
              placeholder="Манай баг" 
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">
              {activeLang === 'mn' ? 'Дэлгэрэнгүй тайлбар' : 'Description'}
            </label>
            <input 
              type="text" 
              value={activeLang === 'mn' ? (siteSettings.teamDescription || '') : (siteSettings.teamDescription_en || '')} 
              onChange={e => updateField(activeLang === 'mn' ? 'teamDescription' : 'teamDescription_en', e.target.value)} 
              className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm" 
              placeholder="..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterExtraSection;
