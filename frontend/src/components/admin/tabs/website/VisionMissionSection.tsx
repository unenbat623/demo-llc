import React from 'react';
import { Target } from 'lucide-react';
import { Field, inputClass, textareaClass } from '../../shared/AdminShared';
import { SiteSettings } from '../../../../types/admin';

interface VisionMissionSectionProps {
  siteSettings: SiteSettings;
  activeLang: 'mn' | 'en';
  updateField: (field: keyof SiteSettings, value: string) => void;
}

const VisionMissionSection: React.FC<VisionMissionSectionProps> = ({
  siteSettings,
  activeLang,
  updateField,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4 p-6 bg-gray-50 rounded-sm">
        <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
          <Target size={14} /> {activeLang === 'mn' ? 'Алсын хараа' : 'Vision'}
        </h5>
        <Field label="Гарчиг">
          <input
            type="text"
            value={activeLang === 'mn' ? siteSettings.visionTitle : siteSettings.visionTitle_en}
            onChange={e => updateField(activeLang === 'mn' ? 'visionTitle' : 'visionTitle_en', e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Текст">
          <textarea
            rows={4}
            value={activeLang === 'mn' ? siteSettings.visionText : siteSettings.visionText_en}
            onChange={e => updateField(activeLang === 'mn' ? 'visionText' : 'visionText_en', e.target.value)}
            className={textareaClass}
          />
        </Field>
      </div>

      <div className="space-y-4 p-6 bg-gray-50 rounded-sm">
        <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
          <Target size={14} /> {activeLang === 'mn' ? 'Эрхэм зорилго' : 'Mission'}
        </h5>
        <Field label="Гарчиг">
          <input
            type="text"
            value={activeLang === 'mn' ? siteSettings.missionTitle : siteSettings.missionTitle_en}
            onChange={e => updateField(activeLang === 'mn' ? 'missionTitle' : 'missionTitle_en', e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Текст">
          <textarea
            rows={4}
            value={activeLang === 'mn' ? siteSettings.missionText : siteSettings.missionText_en}
            onChange={e => updateField(activeLang === 'mn' ? 'missionText' : 'missionText_en', e.target.value)}
            className={textareaClass}
          />
        </Field>
      </div>
    </div>
  );
};

export default VisionMissionSection;
