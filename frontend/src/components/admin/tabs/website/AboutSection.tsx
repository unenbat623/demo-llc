import React from 'react';
import { Field, inputClass, textareaClass } from '../../shared/AdminShared';
import { SiteSettings } from '../../../../types/admin';

interface AboutSectionProps {
  siteSettings: SiteSettings;
  activeLang: 'mn' | 'en';
  updateField: (field: keyof SiteSettings, value: string) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  siteSettings,
  activeLang,
  updateField,
}) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-black">02</div>
        <h4 className="text-xs font-black uppercase tracking-widest text-black/40">Бидний тухай хэсэг</h4>
        <div className="flex-1 h-px bg-black/5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label={activeLang === 'mn' ? "Гарчиг" : "About Title"}>
          <input
            type="text"
            value={activeLang === 'mn' ? siteSettings.aboutTitle : siteSettings.aboutTitle_en}
            onChange={e => updateField(activeLang === 'mn' ? 'aboutTitle' : 'aboutTitle_en', e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label={activeLang === 'mn' ? "Үндсэн тайлбар" : "Main Description"}>
        <textarea
          rows={4}
          value={activeLang === 'mn' ? siteSettings.aboutDescription : siteSettings.aboutDescription_en}
          onChange={e => updateField(activeLang === 'mn' ? 'aboutDescription' : 'aboutDescription_en', e.target.value)}
          className={textareaClass}
        />
      </Field>
    </div>
  );
};

export default AboutSection;
