import React from 'react';
import { Upload, Link as LinkIcon } from 'lucide-react';
import { Field, inputClass, textareaClass } from '../../shared/AdminShared';
import { SiteSettings } from '../../../../types/admin';

interface IdentitySectionProps {
  siteSettings: SiteSettings;
  activeLang: 'mn' | 'en';
  updateField: (field: keyof SiteSettings, value: string) => void;
  bgInputMode: 'url' | 'file';
  setBgInputMode: (mode: 'url' | 'file') => void;
  imgInputMode: 'url' | 'file';
  setImgInputMode: (mode: 'url' | 'file') => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, field: 'heroBgUrl' | 'heroImageUrl') => void;
}

const IdentitySection: React.FC<IdentitySectionProps> = ({
  siteSettings,
  activeLang,
  updateField,
  bgInputMode,
  setBgInputMode,
  imgInputMode,
  setImgInputMode,
  handleFileUpload
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-black">01</div>
        <h4 className="text-xs font-black uppercase tracking-widest text-black/40">Нүүр хуудас & Ерөнхий</h4>
        <div className="flex-1 h-px bg-black/5" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label={activeLang === 'mn' ? "Вэбсайт нэр" : "Site Title"}>
          <input
            type="text"
            value={activeLang === 'mn' ? siteSettings.siteTitle : siteSettings.siteTitle_en}
            onChange={e => updateField(activeLang === 'mn' ? 'siteTitle' : 'siteTitle_en', e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Navbar Лого текст">
          <input
            type="text"
            value={siteSettings.navbarLogo}
            onChange={e => updateField('navbarLogo', e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label={activeLang === 'mn' ? "Hero Гарчиг" : "Hero Title"}>
        <input
          type="text"
          value={activeLang === 'mn' ? siteSettings.heroTitle : siteSettings.heroTitle_en}
          onChange={e => updateField(activeLang === 'mn' ? 'heroTitle' : 'heroTitle_en', e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label={activeLang === 'mn' ? "Hero Тайлбар" : "Hero Description"}>
        <textarea
          rows={3}
          value={activeLang === 'mn' ? siteSettings.heroDescription : siteSettings.heroDescription_en}
          onChange={e => updateField(activeLang === 'mn' ? 'heroDescription' : 'heroDescription_en', e.target.value)}
          className={textareaClass}
        />
      </Field>

      <Field label={activeLang === 'mn' ? "CTA Товчлуур текст" : "CTA Button Text"}>
        <input
          type="text"
          value={activeLang === 'mn' ? siteSettings.ctaText : siteSettings.ctaText_en}
          onChange={e => updateField(activeLang === 'mn' ? 'ctaText' : 'ctaText_en', e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Hero Background</span>
            <div className="flex bg-gray-100 p-0.5 rounded-sm">
              <button type="button" onClick={() => setBgInputMode('url')} className={`px-2 py-1 text-[9px] font-bold rounded-sm ${bgInputMode === 'url' ? 'bg-white shadow-sm' : 'text-gray-400'}`}><LinkIcon size={10} className="inline mr-1" /> URL</button>
              <button type="button" onClick={() => setBgInputMode('file')} className={`px-2 py-1 text-[9px] font-bold rounded-sm ${bgInputMode === 'file' ? 'bg-white shadow-sm' : 'text-gray-400'}`}><Upload size={10} className="inline mr-1" /> FILE</button>
            </div>
          </div>
          {bgInputMode === 'url' ? (
            <input
              type="text"
              value={siteSettings.heroBgUrl}
              onChange={e => updateField('heroBgUrl', e.target.value)}
              className={inputClass}
              placeholder="Video or Image URL"
            />
          ) : (
            <div className="relative h-[46px]">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={e => handleFileUpload(e, 'heroBgUrl')}
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
              />
              <div className="absolute inset-0 bg-gray-50 border-2 border-dashed border-gray-200 rounded-sm flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase tracking-widest overflow-hidden px-2">
                {siteSettings.heroBgUrl.startsWith('data:') ? 'Файл сонгогдсон' : 'Файл сонгох'}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Hero Side Image</span>
            <div className="flex bg-gray-100 p-0.5 rounded-sm">
              <button type="button" onClick={() => setImgInputMode('url')} className={`px-2 py-1 text-[9px] font-bold rounded-sm ${imgInputMode === 'url' ? 'bg-white shadow-sm' : 'text-gray-400'}`}><LinkIcon size={10} className="inline mr-1" /> URL</button>
              <button type="button" onClick={() => setImgInputMode('file')} className={`px-2 py-1 text-[9px] font-bold rounded-sm ${imgInputMode === 'file' ? 'bg-white shadow-sm' : 'text-gray-400'}`}><Upload size={10} className="inline mr-1" /> FILE</button>
            </div>
          </div>
          {imgInputMode === 'url' ? (
            <input
              type="text"
              value={siteSettings.heroImageUrl}
              onChange={e => updateField('heroImageUrl', e.target.value)}
              className={inputClass}
              placeholder="Image URL"
            />
          ) : (
            <div className="relative h-[46px]">
              <input
                type="file"
                accept="image/*"
                onChange={e => handleFileUpload(e, 'heroImageUrl')}
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
              />
              <div className="absolute inset-0 bg-gray-50 border-2 border-dashed border-gray-200 rounded-sm flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase tracking-widest overflow-hidden px-2">
                {siteSettings.heroImageUrl.startsWith('data:') ? 'Зураг сонгогдсон' : 'Зураг сонгох'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdentitySection;
