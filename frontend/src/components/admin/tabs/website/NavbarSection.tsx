import React from 'react';
import { SiteSettings } from '../../../../types/admin';

interface NavbarSectionProps {
  siteSettings: SiteSettings;
  activeLang: 'mn' | 'en';
  updateField: (field: keyof SiteSettings, value: string) => void;
}

const NavbarSection: React.FC<NavbarSectionProps> = ({ siteSettings, activeLang, updateField }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
          {activeLang === 'mn' ? 'Вэбсайт нэр' : 'Site Title'}
        </label>
        <input
          type="text"
          value={activeLang === 'mn' ? siteSettings.siteTitle : siteSettings.siteTitle_en}
          onChange={e => updateField(activeLang === 'mn' ? 'siteTitle' : 'siteTitle_en', e.target.value)}
          className="w-full bg-gray-50 border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-sm"
        />
      </div>
      <div>
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Navbar Лого текст</label>
        <input
          type="text"
          value={siteSettings.navbarLogo}
          onChange={e => updateField('navbarLogo', e.target.value)}
          className="w-full bg-gray-50 border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-sm"
        />
      </div>
    </div>
  );
};

export default NavbarSection;
