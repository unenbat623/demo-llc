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
    <div className="space-y-4">
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
