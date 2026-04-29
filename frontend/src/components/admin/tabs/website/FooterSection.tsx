import React from 'react';
import { Field, inputClass } from '../../shared/AdminShared';
import { SiteSettings } from '../../../../types/admin';

interface FooterSectionProps {
  siteSettings: SiteSettings;
  activeLang: 'mn' | 'en';
  updateField: (field: keyof SiteSettings, value: string) => void;
}

const FooterSection: React.FC<FooterSectionProps> = ({
  siteSettings,
  activeLang,
  updateField,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-black">05</div>
        <h4 className="text-xs font-black uppercase tracking-widest text-black/40">Footer</h4>
      </div>

      <Field label={activeLang === 'mn' ? "Copyright текст" : "Copyright Text"}>
        <input
          type="text"
          value={activeLang === 'mn' ? siteSettings.footerText : siteSettings.footerText_en}
          onChange={e => updateField(activeLang === 'mn' ? 'footerText' : 'footerText_en', e.target.value)}
          className={inputClass}
        />
      </Field>
    </div>
  );
};

export default FooterSection;
