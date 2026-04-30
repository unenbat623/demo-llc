import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Globe, Monitor, ChevronDown, Layout, FileText, BarChart3, Target, Phone, Palette, Anchor } from 'lucide-react';
import { SiteSettings } from '../../../types/admin';

// Sub-sections
import IdentitySection from './website/IdentitySection';
import AboutSection from './website/AboutSection';
import StatsEditor from './website/StatsEditor';
import VisionMissionSection from './website/VisionMissionSection';
import ContactSocialSection from './website/ContactSocialSection';
import FooterSection from './website/FooterSection';
import ColorSection from './website/ColorSection';

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

const sections = [
  { id: 'navbar',   label: 'Navbar',           sub: 'Лого, сайтын нэр',         icon: Layout,    num: '01' },
  { id: 'hero',     label: 'Hero',             sub: 'Гарчиг, дэвсгэр, зураг',  icon: Monitor,   num: '02' },
  { id: 'about',    label: 'Бидний тухай',     sub: 'Тайлбар текст',            icon: FileText,  num: '03' },
  { id: 'stats',    label: 'Статистик',        sub: '4 тоон үзүүлэлт',          icon: BarChart3, num: '04' },
  { id: 'vision',   label: 'Алсын Харааа & Зорилго', sub: 'Vision & Mission',    icon: Target,    num: '05' },
  { id: 'contact',  label: 'Холбоо барих',     sub: 'И-мэйл, утас, хаяг',      icon: Phone,     num: '06' },
  { id: 'colors',   label: 'Өнгөний тохиргоо','sub': 'Сайтын өнгө схем',        icon: Palette,   num: '07' },
  { id: 'footer',   label: 'Footer',           sub: 'Copyright текст',          icon: Anchor,    num: '08' },
];

import NavbarSection from './website/NavbarSection';
import HeroExtraSection from './website/HeroExtraSection';
import AboutExtraSection from './website/AboutExtraSection';
import FooterExtraSection from './website/FooterExtraSection';

const WebsiteTab: React.FC<WebsiteTabProps> = ({
  siteSettings,
  setSiteSettings,
  isSettingsSaving,
  handleSaveSettings,
  settingsStatus,
  bgInputMode, setBgInputMode,
  imgInputMode, setImgInputMode,
  handleFileUpload
}) => {
  const [activeLang, setActiveLang] = useState<'mn' | 'en'>('mn');
  const [openSection, setOpenSection] = useState<string | null>('navbar');

  const updateField = (field: keyof SiteSettings, value: string) => {
    setSiteSettings(prev => ({ ...prev, [field]: value }));
  };

  const sharedProps = { siteSettings, activeLang, updateField };

  const renderContent = (id: string) => {
    if (id === 'navbar') return <NavbarSection {...sharedProps} />;

    if (id === 'hero') return (
      <div className="space-y-6">
        <IdentitySection
          {...sharedProps}
          bgInputMode={bgInputMode} setBgInputMode={setBgInputMode}
          imgInputMode={imgInputMode} setImgInputMode={setImgInputMode}
          handleFileUpload={handleFileUpload}
        />
        <HeroExtraSection siteSettings={siteSettings} updateField={updateField} />
      </div>
    );

    if (id === 'about') return (
      <div className="space-y-6">
        <AboutSection {...sharedProps} />
        <AboutExtraSection siteSettings={siteSettings} updateField={updateField} />
      </div>
    );

    if (id === 'stats')   return <StatsEditor {...sharedProps} />;
    if (id === 'vision')  return <VisionMissionSection {...sharedProps} />;
    if (id === 'contact') return <ContactSocialSection {...sharedProps} />;
    if (id === 'colors')  return <ColorSection siteSettings={siteSettings} updateField={updateField} handleSaveSettings={handleSaveSettings} />;
    if (id === 'footer')  return (
      <div className="space-y-6">
        <FooterSection {...sharedProps} />
        <FooterExtraSection {...sharedProps} />
      </div>
    );
    return null;
  };

  return (
    <form onSubmit={handleSaveSettings} className="space-y-0">
      {/* Header */}
      <div className="bg-black text-white px-8 py-6 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
            <Globe size={18} />
          </div>
          <div>
            <h3 className="text-base font-black uppercase tracking-tighter">Вэбсайт тохиргоо</h3>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Navbar → Hero → About → ... → Footer</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Language toggle */}
          <div className="flex bg-white/10 p-0.5 rounded-sm">
            {(['mn', 'en'] as const).map(lang => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveLang(lang)}
                className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm ${activeLang === lang ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isSettingsSaving}
            className="group relative overflow-hidden bg-white text-black px-6 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors flex items-center gap-2 flex-1 sm:flex-none justify-center"
          >
            {isSettingsSaving ? (
              <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <Save size={13} />
            )}
            {isSettingsSaving ? 'Хадгалж байна...' : 'Хадгалах'}
          </button>
        </div>
      </div>

      {/* Status */}
      <AnimatePresence>
        {settingsStatus.message && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`mb-4 px-5 py-3 text-[11px] font-bold rounded-sm flex items-center gap-3 uppercase tracking-wider ${
              settingsStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${settingsStatus.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
            {settingsStatus.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accordion Sections */}
      <div className="border border-black/10 rounded-sm overflow-hidden divide-y divide-black/5">
        {sections.map((section, idx) => {
          const isOpen = openSection === section.id;
          const Icon = section.icon;
          return (
            <div key={section.id}>
              {/* Section Header */}
              <button
                type="button"
                onClick={() => setOpenSection(isOpen ? null : section.id)}
                className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200 ${
                  isOpen ? 'bg-black text-white' : 'bg-white hover:bg-gray-50 text-black'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-[9px] font-black tracking-[0.3em] tabular-nums ${isOpen ? 'text-white/40' : 'text-gray-300'}`}>
                    {section.num}
                  </span>
                  <div className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 ${isOpen ? 'bg-white/10' : 'bg-gray-50'}`}>
                    <Icon size={15} className={isOpen ? 'text-white' : 'text-gray-500'} />
                  </div>
                  <div>
                    <p className={`text-xs font-black uppercase tracking-widest ${isOpen ? 'text-white' : 'text-black'}`}>
                      {section.label}
                    </p>
                    <p className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${isOpen ? 'text-white/40' : 'text-gray-400'}`}>
                      {section.sub}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className={isOpen ? 'text-white/60' : 'text-gray-400'} />
                </motion.div>
              </button>

              {/* Section Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={`body-${section.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-6 py-6 bg-white border-t border-black/5">
                      {renderContent(section.id)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom save */}
      <div className="pt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSettingsSaving}
          className="group relative overflow-hidden bg-black text-white px-10 py-3.5 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors flex items-center gap-2"
        >
          {isSettingsSaving ? (
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={13} />
          )}
          {isSettingsSaving ? 'Хадгалж байна...' : 'Хадгалах'}
        </button>
      </div>
    </form>
  );
};

export default WebsiteTab;
