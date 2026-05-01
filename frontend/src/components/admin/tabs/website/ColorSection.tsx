import React, { useEffect } from 'react';
import { Palette, Eye } from 'lucide-react';
import { SiteSettings } from '../../../../types/admin';

interface ColorSectionProps {
  siteSettings: SiteSettings;
  updateField: (field: keyof SiteSettings, value: string) => void;
  handleSaveSettings: (e: React.FormEvent) => void;
}


const ColorSection: React.FC<ColorSectionProps> = ({ siteSettings, updateField, handleSaveSettings }) => {

  const onApplyPreset = (preset: Partial<SiteSettings>) => {

    Object.entries(preset).forEach(([field, value]) => {
      updateField(field as keyof SiteSettings, value as string);
    });


    const newSettings = { ...siteSettings, ...preset };


    handleSaveSettings(undefined, newSettings);
  };


  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', siteSettings.primaryColor || '#000000');
    root.style.setProperty('--color-secondary', siteSettings.secondaryColor || '#ffffff');
    root.style.setProperty('--color-accent', siteSettings.accentColor || '#f8f8f8');
    root.style.setProperty('--color-text-main', siteSettings.textColor || '#1a1a1a');
  }, [siteSettings.primaryColor, siteSettings.secondaryColor, siteSettings.accentColor, siteSettings.textColor]);

  const colors = [
    {
      field: 'primaryColor' as keyof SiteSettings,
      label: 'Үндсэн өнгө',
      sublabel: 'Hero, Footer дэвсгэр',
      default: '#000000',
    },
    {
      field: 'secondaryColor' as keyof SiteSettings,
      label: 'Хоёрдогч өнгө',
      sublabel: 'About, Navbar дэвсгэр',
      default: '#ffffff',
    },
    {
      field: 'accentColor' as keyof SiteSettings,
      label: 'Дэвсгэр өнгө',
      sublabel: 'Team секцийн фон',
      default: '#f8f8f8',
    },
    {
      field: 'textColor' as keyof SiteSettings,
      label: 'Текст өнгө',
      sublabel: 'Үндсэн текст',
      default: '#1a1a1a',
    },
  ];

  return (
    <div className="space-y-10">
      <div className="bg-gray-50 p-6 border border-black/5 rounded-sm">
        <div className="flex items-center gap-3 mb-2">
          <Palette size={18} />
          <h4 className="text-xs font-black uppercase tracking-widest">Гараар тохируулах</h4>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <Eye size={11} className="text-green-500" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-green-600">Live Preview — өнгийг шууд харагдана</span>
        </div>

        {/* Mini palette preview */}
        <div className="flex gap-2 mb-6 p-3 bg-white border border-black/5 rounded-sm">
          {colors.map(c => (
            <div
              key={c.field}
              className="flex-1 h-8 rounded-sm border border-black/10 transition-all duration-300"
              style={{ backgroundColor: (siteSettings[c.field] as string) || c.default }}
              title={c.label}
            />
          ))}
        </div>

        <div className="space-y-4">
          {colors.map(c => (
            <div key={c.field}>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">{c.label}</label>
                <span className="text-[9px] text-gray-400 font-bold">{c.sublabel}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={(siteSettings[c.field] as string) || c.default}
                    onChange={(e) => updateField(c.field, e.target.value)}
                    className="w-10 h-10 cursor-pointer border-0 p-0 bg-transparent rounded-sm"
                  />
                </div>
                <input
                  type="text"
                  value={(siteSettings[c.field] as string) || c.default}
                  onChange={(e) => updateField(c.field, e.target.value)}
                  className="w-full bg-white border border-black/10 px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-black rounded-sm"
                  placeholder={c.default}
                  maxLength={7}
                />
                <div
                  className="w-10 h-10 rounded-sm border border-black/10 flex-shrink-0 transition-all duration-300"
                  style={{ backgroundColor: (siteSettings[c.field] as string) || c.default }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-sm">
          <p className="text-[9px] font-bold uppercase tracking-widest text-yellow-700">
            ⚡ Өнгийг хадгалахын тулд дээрх "Хадгалах" товч дарна уу
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorSection;
