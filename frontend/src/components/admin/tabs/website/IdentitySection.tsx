import React from 'react';
import { Upload, Link as LinkIcon, Monitor, Image as ImageIcon, Type, MousePointer2 } from 'lucide-react';
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
    <div className="space-y-10">
      {/* Content Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-black/5">
          <Type size={14} className="text-black" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Текст мэдээлэл</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Field label={activeLang === 'mn' ? "Hero Гарчиг" : "Hero Title"} icon={<Type size={12} />}>
              <input
                type="text"
                value={activeLang === 'mn' ? siteSettings.heroTitle : siteSettings.heroTitle_en}
                onChange={e => updateField(activeLang === 'mn' ? 'heroTitle' : 'heroTitle_en', e.target.value)}
                className={inputClass}
                placeholder="..."
              />
            </Field>
          </div>

          <Field label={activeLang === 'mn' ? "Hero Тайлбар" : "Hero Description"}>
            <textarea
              rows={3}
              value={activeLang === 'mn' ? siteSettings.heroDescription : siteSettings.heroDescription_en}
              onChange={e => updateField(activeLang === 'mn' ? 'heroDescription' : 'heroDescription_en', e.target.value)}
              className={textareaClass}
              placeholder="..."
            />
          </Field>

          <Field label={activeLang === 'mn' ? "CTA Товчлуур текст" : "CTA Button Text"} icon={<MousePointer2 size={12} />}>
            <input
              type="text"
              value={activeLang === 'mn' ? siteSettings.ctaText : siteSettings.ctaText_en}
              onChange={e => updateField(activeLang === 'mn' ? 'ctaText' : 'ctaText_en', e.target.value)}
              className={inputClass}
              placeholder="..."
            />
          </Field>
        </div>
      </div>

      {/* Media Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2 pb-2 border-b border-black/5">
          <ImageIcon size={14} className="text-black" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Медиа контент</h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Background Media */}
          <div className="p-5 bg-gray-50/50 rounded-sm border border-black/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor size={12} className="text-gray-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Дэвсгэр (Background)</span>
              </div>
              <div className="flex bg-white shadow-sm p-0.5 rounded-sm border border-black/5">
                <button type="button" onClick={() => setBgInputMode('url')} className={`px-2.5 py-1 text-[9px] font-black rounded-sm transition-all ${bgInputMode === 'url' ? 'bg-black text-white' : 'text-gray-400'}`}>URL</button>
                <button type="button" onClick={() => setBgInputMode('file')} className={`px-2.5 py-1 text-[9px] font-black rounded-sm transition-all ${bgInputMode === 'file' ? 'bg-black text-white' : 'text-gray-400'}`}>FILE</button>
              </div>
            </div>

            {bgInputMode === 'url' ? (
              <div className="relative">
                <LinkIcon size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  value={siteSettings.heroBgUrl}
                  onChange={e => updateField('heroBgUrl', e.target.value)}
                  className={`${inputClass} pl-9`}
                  placeholder="Video or Image URL..."
                />
              </div>
            ) : (
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={e => handleFileUpload(e, 'heroBgUrl')}
                  className="absolute inset-0 w-full h-[46px] opacity-0 z-10 cursor-pointer"
                />
                <div className="h-[46px] bg-white border-2 border-dashed border-gray-200 group-hover:border-black/20 rounded-sm flex items-center justify-center text-[9px] font-black text-gray-400 uppercase tracking-widest transition-colors px-2">
                  <Upload size={14} className="mr-2" />
                  {(siteSettings.heroBgUrl || '').startsWith('data:') ? 'Файл сонгогдсон' : 'Файл хуулах'}
                </div>
              </div>
            )}
            <p className="text-[8px] text-gray-400 font-bold uppercase italic tracking-tighter">* Video (.mp4) эсвэл Зураг ашиглаж болно</p>
          </div>

          {/* Floating Image */}
          <div className="p-5 bg-gray-50/50 rounded-sm border border-black/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon size={12} className="text-gray-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Нүүр зураг (Side Image)</span>
              </div>
              <div className="flex bg-white shadow-sm p-0.5 rounded-sm border border-black/5">
                <button type="button" onClick={() => setImgInputMode('url')} className={`px-2.5 py-1 text-[9px] font-black rounded-sm transition-all ${imgInputMode === 'url' ? 'bg-black text-white' : 'text-gray-400'}`}>URL</button>
                <button type="button" onClick={() => setImgInputMode('file')} className={`px-2.5 py-1 text-[9px] font-black rounded-sm transition-all ${imgInputMode === 'file' ? 'bg-black text-white' : 'text-gray-400'}`}>FILE</button>
              </div>
            </div>

            {imgInputMode === 'url' ? (
              <div className="relative">
                <LinkIcon size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  value={siteSettings.heroImageUrl || ''}
                  onChange={e => updateField('heroImageUrl', e.target.value)}
                  className={`${inputClass} pl-9`}
                  placeholder="Image URL..."
                />
              </div>
            ) : (
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileUpload(e, 'heroImageUrl')}
                  className="absolute inset-0 w-full h-[46px] opacity-0 z-10 cursor-pointer"
                />
                <div className="h-[46px] bg-white border-2 border-dashed border-gray-200 group-hover:border-black/20 rounded-sm flex items-center justify-center text-[9px] font-black text-gray-400 uppercase tracking-widest transition-colors px-2">
                  <Upload size={14} className="mr-2" />
                  {(siteSettings.heroImageUrl || '').startsWith('data:') ? 'Зураг сонгогдсон' : 'Зураг хуулах'}
                </div>
              </div>
            )}
            <p className="text-[8px] text-gray-400 font-bold uppercase italic tracking-tighter">* Тунгалаг (PNG) зураг тохиромжтой</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentitySection;
