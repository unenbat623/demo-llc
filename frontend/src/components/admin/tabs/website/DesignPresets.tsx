import React from 'react';
import { Layout, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { SiteSettings } from '../../../../types/admin';

interface DesignPresetsProps {
  currentSettings: SiteSettings;
  onApply: (preset: Partial<SiteSettings>) => void;
}

const presets = [
  {
    id: 'monochrome',
    name: 'Modern Monochrome',
    description: 'Timeless luxury with pure black, white, and silk grays',
    colors: {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      accentColor: '#f8fafc',
      textColor: '#000000'
    },
    preview: ['#000000', '#ffffff', '#f1f5f9']
  },
  {
    id: 'industrial',
    name: 'Industrial Slate',
    description: 'Professional tech-focused deep navy and slate blue',
    colors: {
      primaryColor: '#0f172a',
      secondaryColor: '#1e293b',
      accentColor: '#f8fafc',
      textColor: '#ffffff'
    },
    preview: ['#0f172a', '#38bdf8', '#f8fafc']
  },
  {
    id: 'emerald',
    name: 'Emerald Noir',
    description: 'Deep forest greens with elegant obsidian highlights',
    colors: {
      primaryColor: '#064e3b',
      secondaryColor: '#065f46',
      accentColor: '#022c22',
      textColor: '#ecfdf5'
    },
    preview: ['#064e3b', '#10b981', '#ecfdf5']
  },
  {
    id: 'bordeaux',
    name: 'Bordeaux Luxury',
    description: 'Rich wine tones and deep velvet blacks',
    colors: {
      primaryColor: '#450a0a',
      secondaryColor: '#1a0b0b',
      accentColor: '#fef2f2',
      textColor: '#ffffff'
    },
    preview: ['#450a0a', '#991b1b', '#fef2f2']
  },
  {
    id: 'alpine',
    name: 'Alpine White',
    description: 'Minimalist gallery aesthetic with soft shadows',
    colors: {
      primaryColor: '#ffffff',
      secondaryColor: '#f1f5f9',
      accentColor: '#ffffff',
      textColor: '#0f172a'
    },
    preview: ['#ffffff', '#e2e8f0', '#0f172a']
  },
  {
    id: 'royal',
    name: 'Royal Excellence',
    description: 'Premium gold accents over deep charcoal leather',
    colors: {
      primaryColor: '#111111',
      secondaryColor: '#d4af37',
      accentColor: '#1a1a1a',
      textColor: '#ffffff'
    },
    preview: ['#111111', '#d4af37', '#fcfcfc']
  }
];

const DesignPresets: React.FC<DesignPresetsProps> = ({ currentSettings, onApply }) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black flex items-center justify-center rounded-sm">
            <Layout size={16} className="text-white" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-tighter">Дизйн Загварууд</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Premium Design Presets</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {presets.map((preset) => {
          const isActive = currentSettings.primaryColor === preset.colors.primaryColor &&
            currentSettings.secondaryColor === preset.colors.secondaryColor;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApply(preset.colors)}
              className={`group relative text-left p-6 border rounded-sm transition-all duration-500 overflow-hidden ${isActive ? 'border-black bg-black text-white shadow-2xl scale-[1.02]' : 'border-black/5 bg-white hover:border-black/40 text-black'
                }`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-white' : 'text-black'}`}>
                  {preset.name}
                </span>
                {isActive && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white p-1 rounded-full">
                    <Check size={10} className="text-black" />
                  </motion.div>
                )}
              </div>

              <div className="flex gap-1.5 mb-6">
                {preset.preview.map((color, idx) => (
                  <div
                    key={idx}
                    className="flex-1 h-12 rounded-sm border border-black/5 shadow-inner"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="space-y-1">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-white/60' : 'text-gray-400'}`}>
                  {preset.description}
                </p>
                <div className={`h-0.5 w-8 transition-all duration-500 ${isActive ? 'bg-white w-full opacity-20' : 'bg-black/10 group-hover:w-full group-hover:bg-black/20'}`} />
              </div>

              {!isActive && (
                <div className="absolute inset-0 bg-black/95 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-2">
                  <Layout size={20} className="mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Apply Design</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DesignPresets;
