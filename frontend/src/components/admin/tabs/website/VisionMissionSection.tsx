import React from 'react';
import { Target, Compass, Award, Type } from 'lucide-react';
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Vision */}
      <div className="space-y-6 p-8 bg-black/[0.02] border border-black/5 rounded-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
          <Compass size={120} />
        </div>

        <div className="flex items-center gap-3 pb-4 border-b border-black/5">
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-sm">
            <Target size={18} />
          </div>
          <div>
            <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-black">
              {activeLang === 'mn' ? 'Алсын хараа' : 'Vision'}
            </h5>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Future Outlook</p>
          </div>
        </div>

        <div className="space-y-4">
          <Field label={activeLang === 'mn' ? "Гарчиг" : "Title"}>
            <input
              type="text"
              value={activeLang === 'mn' ? siteSettings.visionTitle : siteSettings.visionTitle_en}
              onChange={e => updateField(activeLang === 'mn' ? 'visionTitle' : 'visionTitle_en', e.target.value)}
              className={inputClass}
              placeholder="..."
            />
          </Field>
          <Field label={activeLang === 'mn' ? "Текст" : "Text"}>
            <textarea
              rows={4}
              value={activeLang === 'mn' ? siteSettings.visionText : siteSettings.visionText_en}
              onChange={e => updateField(activeLang === 'mn' ? 'visionText' : 'visionText_en', e.target.value)}
              className={textareaClass}
              placeholder="..."
            />
          </Field>
        </div>
      </div>

      {/* Mission */}
      <div className="space-y-6 p-8 bg-black/[0.02] border border-black/5 rounded-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
          <Award size={120} />
        </div>

        <div className="flex items-center gap-3 pb-4 border-b border-black/5">
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-sm">
            <Compass size={18} />
          </div>
          <div>
            <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-black">
              {activeLang === 'mn' ? 'Эрхэм зорилго' : 'Mission'}
            </h5>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Core Purpose</p>
          </div>
        </div>

        <div className="space-y-4">
          <Field label={activeLang === 'mn' ? "Гарчиг" : "Title"}>
            <input
              type="text"
              value={activeLang === 'mn' ? siteSettings.missionTitle : siteSettings.missionTitle_en}
              onChange={e => updateField(activeLang === 'mn' ? 'missionTitle' : 'missionTitle_en', e.target.value)}
              className={inputClass}
              placeholder="..."
            />
          </Field>
          <Field label={activeLang === 'mn' ? "Текст" : "Text"}>
            <textarea
              rows={4}
              value={activeLang === 'mn' ? siteSettings.missionText : siteSettings.missionText_en}
              onChange={e => updateField(activeLang === 'mn' ? 'missionText' : 'missionText_en', e.target.value)}
              className={textareaClass}
              placeholder="..."
            />
          </Field>
        </div>
      </div>
    </div>
  );
};

export default VisionMissionSection;
