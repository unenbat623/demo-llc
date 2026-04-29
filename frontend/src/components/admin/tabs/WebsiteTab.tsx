import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Globe } from 'lucide-react';
import { SiteSettings } from '../../../types/admin';

// Sub-sections
import IdentitySection from './website/IdentitySection';
import AboutSection from './website/AboutSection';
import StatsEditor from './website/StatsEditor';
import VisionMissionSection from './website/VisionMissionSection';
import ContactSocialSection from './website/ContactSocialSection';
import FooterSection from './website/FooterSection';

interface WebsiteTabProps {
  siteSettings: SiteSettings;
  setSiteSettings: (settings: SiteSettings) => void;
  isSettingsSaving: boolean;
  handleSaveSettings: (e: React.FormEvent) => void;
  settingsStatus: { type: string, message: string };
  bgInputMode: 'url' | 'file';
  setBgInputMode: (mode: 'url' | 'file') => void;
  imgInputMode: 'url' | 'file';
  setImgInputMode: (mode: 'url' | 'file') => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, field: 'heroBgUrl' | 'heroImageUrl') => void;
}

const WebsiteTab: React.FC<WebsiteTabProps> = ({
  siteSettings,
  setSiteSettings,
  isSettingsSaving,
  handleSaveSettings,
  settingsStatus,
  bgInputMode,
  setBgInputMode,
  imgInputMode,
  setImgInputMode,
  handleFileUpload
}) => {
  const [activeLang, setActiveLang] = useState<'mn' | 'en'>('mn');

  const updateField = (field: keyof SiteSettings, value: string) => {
    setSiteSettings({ ...siteSettings, [field]: value });
  };

  const sharedProps = { siteSettings, activeLang, updateField };

  return (
    <form onSubmit={handleSaveSettings} className="bg-white p-8 border border-black/10 hover:border-black transition-colors duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
        <div>
          <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
            <Globe className="text-black" />
            Вэбсайт тохиргоо
          </h3>
          <p className="text-gray-500 text-sm mt-1">Вэбсайтын ерөнхий мэдээлэл, агуулгыг эндээс удирдана.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex bg-gray-100 p-1 rounded-sm">
            {(['mn', 'en'] as const).map(lang => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveLang(lang)}
                className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all ${activeLang === lang ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          
          <button
            type="submit"
            disabled={isSettingsSaving}
            className="group relative overflow-hidden bg-black rounded-sm text-white px-8 py-3 flex-1 sm:flex-none transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gray-800 transition-transform duration-500 ease-[0.16,1,0.3,1] -translate-x-full group-hover:translate-x-0" />
            <span className="relative text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
              {isSettingsSaving ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {isSettingsSaving ? 'Хадгалж байна' : 'Хадгалах'}
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {settingsStatus.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-8 p-4 text-[11px] font-bold rounded-sm border flex items-center gap-3 uppercase tracking-wider ${
              settingsStatus.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${settingsStatus.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
            {settingsStatus.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <IdentitySection 
            {...sharedProps} 
            bgInputMode={bgInputMode} setBgInputMode={setBgInputMode}
            imgInputMode={imgInputMode} setImgInputMode={setImgInputMode}
            handleFileUpload={handleFileUpload}
          />
          <AboutSection {...sharedProps} />
          <StatsEditor {...sharedProps} />
          <VisionMissionSection {...sharedProps} />
        </div>

        <div className="lg:col-span-4 space-y-12">
          <ContactSocialSection {...sharedProps} />
          <FooterSection {...sharedProps} />
        </div>
      </div>
    </form>
  );
};

export default WebsiteTab;
