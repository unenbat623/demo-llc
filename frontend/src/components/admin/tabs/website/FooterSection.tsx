import React from 'react';
import { Field, inputClass } from '../../shared/AdminShared';
import { SiteSettings } from '../../../../types/admin';
import { Anchor, Copyright } from 'lucide-react';

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
      <div className="flex items-center gap-2 pb-2 border-b border-black/5">
        <Anchor size={14} className="text-black" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Footer мэдээлэл</h4>
      </div>

      <div className="bg-gray-50/50 p-6 border border-black/5 rounded-sm">
        <Field label={activeLang === 'mn' ? "Зохиогчийн эрх (Copyright)" : "Copyright Text"} icon={<Copyright size={12} />}>
          <div className="relative">
            <Copyright size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              value={activeLang === 'mn' ? siteSettings.footerText : siteSettings.footerText_en}
              onChange={e => updateField(activeLang === 'mn' ? 'footerText' : 'footerText_en', e.target.value)}
              className={`${inputClass} pl-10`}
              placeholder="© 2024 Tavan Bogd Tech. All Rights Reserved."
            />
          </div>
        </Field>
      </div>
    </div>
  );
};

export default FooterSection;
