import React from 'react';
import { Field, inputClass, textareaClass } from '../../shared/AdminShared';
import { SiteSettings } from '../../../../types/admin';
import { FileText, Type, AlignLeft } from 'lucide-react';

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
    <div className="space-y-10">
      <div className="flex items-center gap-2 pb-2 border-b border-black/5">
        <FileText size={14} className="text-black" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Бидний тухай мэдээлэл</h4>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-gray-50/50 p-6 border border-black/5 rounded-sm">
          <Field label={activeLang === 'mn' ? "Үндсэн гарчиг" : "About Title"} icon={<Type size={12} />}>
            <input
              type="text"
              value={activeLang === 'mn' ? siteSettings.aboutTitle : siteSettings.aboutTitle_en}
              onChange={e => updateField(activeLang === 'mn' ? 'aboutTitle' : 'aboutTitle_en', e.target.value)}
              className={inputClass}
              placeholder="..."
            />
          </Field>
        </div>

        <div className="bg-gray-50/50 p-6 border border-black/5 rounded-sm">
          <Field label={activeLang === 'mn' ? "Үндсэн тайлбар текст" : "Main Description"} icon={<AlignLeft size={12} />}>
            <textarea
              rows={6}
              value={activeLang === 'mn' ? siteSettings.aboutDescription : siteSettings.aboutDescription_en}
              onChange={e => updateField(activeLang === 'mn' ? 'aboutDescription' : 'aboutDescription_en', e.target.value)}
              className={`${textareaClass} bg-white`}
              placeholder="..."
            />
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter mt-3 italic">* Уншихад хялбар байх үүднээс догол мөр ашиглахыг зөвлөж байна</p>
          </Field>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
