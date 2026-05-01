import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Save, Layout, Monitor, FileText, BarChart3, Target, Phone, Palette, Anchor } from 'lucide-react';
import { SiteSettings } from '../../../types/admin';


import IdentitySection from './website/IdentitySection';
import AboutSection from './website/AboutSection';
import StatsEditor from './website/StatsEditor';
import VisionMissionSection from './website/VisionMissionSection';
import ContactSocialSection from './website/ContactSocialSection';
import FooterSection from './website/FooterSection';
import ColorSection from './website/ColorSection';
import NavbarSection from './website/NavbarSection';
import NavbarExtraSection from './website/NavbarExtraSection';
import HeroExtraSection from './website/HeroExtraSection';
import AboutExtraSection from './website/AboutExtraSection';
import FooterExtraSection from './website/FooterExtraSection';


import DesignPresets from './website/DesignPresets';
import WebsiteTabHeader from './website/WebsiteTabHeader';
import WebsiteAccordionItem from './website/WebsiteAccordionItem';

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
  { id: 'navbar', label: 'Navbar', sub: 'Лого, сайтын нэр', icon: Layout, num: '01' },
  { id: 'hero', label: 'Hero', sub: 'Гарчиг, дэвсгэр, зураг', icon: Monitor, num: '02' },
  { id: 'about', label: 'Бидний тухай', sub: 'Тайлбар текст', icon: FileText, num: '03' },
  { id: 'stats', label: 'Статистик', sub: '4 тоон үзүүлэлт', icon: BarChart3, num: '04' },
  { id: 'vision', label: 'Алсын Харааа & Зорилго', sub: 'Vision & Mission', icon: Target, num: '05' },
  { id: 'contact', label: 'Холбоо барих', sub: 'И-мэйл, утас, хаяг', icon: Phone, num: '06' },
  { id: 'colors', label: 'Өнгөний тохиргоо', sub: 'Сайтын өнгө схем', icon: Palette, num: '07' },
  { id: 'footer', label: 'Footer', sub: 'Copyright текст', icon: Anchor, num: '08' },
];

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

  const renderSectionContent = (id: string) => {
    switch (id) {
      case 'navbar': return (
        <div className="space-y-6">
          <NavbarSection {...sharedProps} />
          <NavbarExtraSection siteSettings={siteSettings} activeLang={activeLang} updateField={updateField} />
        </div>
      );
      case 'hero': return (
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
      case 'about': return (
        <div className="space-y-6">
          <AboutSection {...sharedProps} />
          <AboutExtraSection siteSettings={siteSettings} updateField={updateField} />
        </div>
      );
      case 'stats': return <StatsEditor {...sharedProps} />;
      case 'vision': return <VisionMissionSection {...sharedProps} />;
      case 'contact': return <ContactSocialSection {...sharedProps} />;
      case 'colors': return <ColorSection siteSettings={siteSettings} updateField={updateField} handleSaveSettings={handleSaveSettings} />;
      case 'footer': return (
        <div className="space-y-6">
          <FooterSection {...sharedProps} />
          <FooterExtraSection {...sharedProps} />
        </div>
      );
      default: return null;
    }
  };

  return (
    <form onSubmit={handleSaveSettings} className="space-y-0">
      <WebsiteTabHeader
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        isSettingsSaving={isSettingsSaving}
      />

      <AnimatePresence>
        {settingsStatus.message && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`mb-4 px-5 py-3 text-[11px] font-bold rounded-sm flex items-center gap-3 uppercase tracking-wider ${settingsStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
              }`}
          >
            <div className={`w-2 h-2 rounded-full ${settingsStatus.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
            {settingsStatus.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border border-black/10 rounded-sm overflow-hidden divide-y divide-black/5">
        {sections.map((section) => (
          <WebsiteAccordionItem
            key={section.id}
            {...section}
            isOpen={openSection === section.id}
            onToggle={() => setOpenSection(openSection === section.id ? null : section.id)}
          >
            {renderSectionContent(section.id)}
          </WebsiteAccordionItem>
        ))}
      </div>

      {/* Premium Design Presets — bottom of settings */}
      <div className="mt-8">
        <DesignPresets
          currentSettings={siteSettings}
          onApply={(preset) => {
            const merged = { ...siteSettings, ...preset };
            setSiteSettings(merged);
            handleSaveSettings(undefined as any, merged);
          }}
        />
      </div>

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
