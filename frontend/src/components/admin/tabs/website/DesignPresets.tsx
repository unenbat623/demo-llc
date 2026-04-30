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
    id: 'midnight',
    name: 'Midnight OLED',
    description: 'Deep blacks and crisp whites',
    colors: {
      primaryColor: '#000000',
      secondaryColor: '#121212',
      accentColor: '#1f1f1f',
      textColor: '#ffffff'
    },
    preview: ['#000000', '#121212', '#ffffff']
  },
  {
    id: 'alpine',
    name: 'Alpine White',
    description: 'Minimalist and clean aesthetic',
    colors: {
      primaryColor: '#ffffff',
      secondaryColor: '#f8f9fa',
      accentColor: '#e9ecef',
      textColor: '#000000'
    },
    preview: ['#ffffff', '#f8f9fa', '#000000']
  },
  {
    id: 'cyberpunk',
    name: 'Neon Cyber',
    description: 'Futuristic high-contrast vibes',
    colors: {
      primaryColor: '#0b0e14',
      secondaryColor: '#00ff9f',
      accentColor: '#1a1b4b',
      textColor: '#ffffff'
    },
    preview: ['#0b0e14', '#00ff9f', '#ff0055']
  },
  {
    id: 'royal',
    name: 'Royal Luxury',
    description: 'Premium gold and dark tones',
    colors: {
      primaryColor: '#1a1a1a',
      secondaryColor: '#c5a059',
      accentColor: '#f4e8c1',
      textColor: '#ffffff'
    },
    preview: ['#1a1a1a', '#c5a059', '#f4e8c1']
  },
  {
    id: 'nordic',
    name: 'Nordic Frost',
    description: 'Cool blues and soft grays',
    colors: {
      primaryColor: '#2e3440',
      secondaryColor: '#4c566a',
      accentColor: '#eceff4',
      textColor: '#d8dee9'
    },
    preview: ['#2e3440', '#88c0d0', '#eceff4']
  },
  {
    id: 'earth',
    name: 'Earth & Terra',
    description: 'Warm, natural organic tones',
    colors: {
      primaryColor: '#3c2f2f',
      secondaryColor: '#be9b7b',
      accentColor: '#fff5e1',
      textColor: '#3c2f2f'
    },
    preview: ['#3c2f2f', '#be9b7b', '#fff5e1']
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
              className={`group relative text-left p-6 border rounded-sm transition-all duration-500 overflow-hidden ${
                isActive ? 'border-black bg-black text-white shadow-2xl scale-[1.02]' : 'border-black/5 bg-white hover:border-black/40 text-black'
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
