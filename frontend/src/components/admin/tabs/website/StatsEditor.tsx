import React from 'react';
import { BarChart3, TrendingUp, Users, Target, Activity } from 'lucide-react';
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
  const icons = [TrendingUp, Users, Target, Activity];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-2 border-b border-black/5">
        <div className="flex items-center gap-2">
          <BarChart3 size={14} className="text-black" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Статистик үзүүлэлтүүд</h4>
        </div>
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Нийт 4 үзүүлэлт</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((num, idx) => {
          const Icon = icons[idx];
          return (
            <div key={num} className="group relative bg-white border border-black/5 rounded-sm p-6 transition-all duration-300 hover:border-black/20 hover:shadow-sm">
              <div className="absolute top-0 left-0 w-1 h-0 bg-black transition-all duration-500 group-hover:h-full" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gray-50 flex items-center justify-center rounded-sm text-gray-400 group-hover:bg-black group-hover:text-white transition-colors">
                  <Icon size={14} />
                </div>
                <span className="text-[9px] font-black text-gray-300 tracking-[0.3em]">STAT 0{num}</span>
              </div>

              <div className="grid gap-5">
                <Field label="Утга (Value)" hint="ж-нь: 150+, 99%">
                  <input
                    type="text"
                    value={(siteSettings as any)[`stats${num}Value`]}
                    onChange={e => updateField(`stats${num}Value` as any, e.target.value)}
                    className={inputClass}
                    placeholder="0"
                  />
                </Field>

                <div className="grid grid-cols-1 gap-4">
                  <Field label={activeLang === 'mn' ? "Гарчиг (Label)" : "Label"}>
                    <input
                      type="text"
                      value={activeLang === 'mn' ? (siteSettings as any)[`stats${num}Label`] : (siteSettings as any)[`stats${num}Label_en`]}
                      onChange={e => updateField(activeLang === 'mn' ? `stats${num}Label` as any : `stats${num}Label_en` as any, e.target.value)}
                      className={inputClass}
                      placeholder="..."
                    />
                  </Field>
                  
                  <Field label={activeLang === 'mn' ? "Тайлбар (Detail)" : "Detail"}>
                    <input
                      type="text"
                      value={activeLang === 'mn' ? (siteSettings as any)[`stats${num}Detail`] : (siteSettings as any)[`stats${num}Detail_en`]}
                      onChange={e => updateField(activeLang === 'mn' ? `stats${num}Detail` as any : `stats${num}Detail_en` as any, e.target.value)}
                      className={inputClass}
                      placeholder="..."
                    />
                  </Field>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsEditor;
