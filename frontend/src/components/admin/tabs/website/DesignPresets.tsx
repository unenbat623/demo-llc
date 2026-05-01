import React from 'react';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SiteSettings } from '../../../../types/admin';
import { presets } from '../../../../data/presets';

interface DesignPresetsProps {
  currentSettings: SiteSettings;
  onApply: (preset: Partial<SiteSettings>) => void;
}

const DesignPresets: React.FC<DesignPresetsProps> = ({ currentSettings, onApply }) => {
  return (
    <div className="relative overflow-hidden rounded-sm bg-[#111111] p-8 border border-white/5">
      <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-white/5 blur-[80px] pointer-events-none" />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-base font-black uppercase tracking-tighter text-white italic">DESIGN TEMPLATES</h4>
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.3em] mt-1">Вэбсайтын бүтцийн загвар — өнгө, байрлал, хэв маяг бүгд өөрчлөгдөнө</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-white/20">{presets.length} загвар</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {presets.map((preset, index) => {
          const isActive = currentSettings.template === preset.id ||
            (
              currentSettings.primaryColor === preset.primaryColor &&
              currentSettings.secondaryColor === preset.secondaryColor &&
              currentSettings.accentColor === preset.accentColor &&
              currentSettings.textColor === preset.textColor
            );

          return (
            <motion.button
              key={preset.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onApply({
                primaryColor: preset.primaryColor,
                secondaryColor: preset.secondaryColor,
                accentColor: preset.accentColor,
                textColor: preset.textColor,
                template: preset.template,
                navbarLayout: preset.navbarLayout as any,
                navbarStyle: preset.navbarStyle as any,
                heroLayout: preset.heroLayout as any,
                heroStyle: preset.heroStyle as any,
                buttonStyle: preset.buttonStyle as any,
                fontStyle: preset.fontStyle as any,
              })}
              className={`relative text-left rounded-sm overflow-hidden transition-all duration-500 border-2 group ${
                isActive
                  ? 'border-white shadow-[0_0_30px_rgba(255,255,255,0.12)]'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div className="w-full aspect-[16/10] overflow-hidden">
                {preset.preview}
              </div>

              <div className={`px-4 py-3 flex items-center justify-between transition-colors duration-500 ${
                isActive ? 'bg-white' : 'bg-[#1a1a1a] group-hover:bg-[#222]'
              }`}>
                <div>
                  <div className={`text-[11px] font-black uppercase tracking-tight leading-none ${isActive ? 'text-black' : 'text-white'}`}>
                    {preset.name}
                  </div>
                  <div className={`text-[9px] font-medium uppercase tracking-widest mt-0.5 ${isActive ? 'text-black/50' : 'text-white/30'}`}>
                    {preset.desc}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                    isActive ? 'border-black/20 text-black/60' : 'border-white/10 text-white/30'
                  }`}>{preset.badge}</span>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="w-6 h-6 bg-black rounded-full flex items-center justify-center"
                      >
                        <Check size={11} className="text-white" strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default DesignPresets;
