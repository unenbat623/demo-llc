import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Field, inputClass } from '../../shared/AdminShared';
import { SiteSettings } from '../../../../types/admin';

interface StatsEditorProps {
  siteSettings: SiteSettings;
  activeLang: 'mn' | 'en';
  updateField: (field: keyof SiteSettings, value: string) => void;
}

const StatsEditor: React.FC<StatsEditorProps> = ({
  siteSettings,
  activeLang,
  updateField,
}) => {
  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-sm">
      <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
        <BarChart3 size={14} /> Статистик мэдээлэл
      </h5>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map(num => (
          <div key={num} className="space-y-4 p-4 border border-black/5 bg-white rounded-sm">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black text-gray-300">STATS 0{num}</span>
            </div>
            <Field label="Утга (Value)">
              <input
                type="text"
                value={(siteSettings as any)[`stats${num}Value`]}
                onChange={e => updateField(`stats${num}Value` as any, e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label={activeLang === 'mn' ? "Гарчиг (Label)" : "Label"}>
              <input
                type="text"
                value={activeLang === 'mn' ? (siteSettings as any)[`stats${num}Label`] : (siteSettings as any)[`stats${num}Label_en`]}
                onChange={e => updateField(activeLang === 'mn' ? `stats${num}Label` as any : `stats${num}Label_en` as any, e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label={activeLang === 'mn' ? "Тайлбар (Detail)" : "Detail"}>
              <input
                type="text"
                value={activeLang === 'mn' ? (siteSettings as any)[`stats${num}Detail`] : (siteSettings as any)[`stats${num}Detail_en`]}
                onChange={e => updateField(activeLang === 'mn' ? `stats${num}Detail` as any : `stats${num}Detail_en` as any, e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsEditor;
