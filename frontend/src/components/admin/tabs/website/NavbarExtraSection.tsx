import React from 'react';
import { SiteSettings } from '../../../../types/admin';
import { MousePointer2, Type } from 'lucide-react';

interface NavbarExtraSectionProps {
  siteSettings: SiteSettings;
  activeLang: 'mn' | 'en';
  updateField: (field: keyof SiteSettings, value: string) => void;
}

const NavbarExtraSection: React.FC<NavbarExtraSectionProps> = ({ siteSettings, activeLang, updateField }) => {
  return (
    <div className="space-y-6 mt-6 pt-10 border-t border-black/5">
      <div className="flex items-center gap-2">
        <MousePointer2 size={14} className="text-black" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Navbar Товчлуурууд</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/[0.02] p-6 rounded-sm border border-black/5">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400">
            <Type size={10} /> {activeLang === 'mn' ? 'Бидний тухай (товч)' : 'About Us Label'}
          </label>
          <input 
            type="text" 
            value={activeLang === 'mn' ? (siteSettings.navAbout || '') : (siteSettings.navAbout_en || '')} 
            onChange={e => updateField(activeLang === 'mn' ? 'navAbout' : 'navAbout_en', e.target.value)} 
            className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm transition-all" 
            placeholder={activeLang === 'mn' ? "БИДНИЙ ТУХАЙ" : "ABOUT US"} 
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400">
            <Type size={10} /> {activeLang === 'mn' ? 'Баг хамт олон (товч)' : 'Our Team Label'}
          </label>
          <input 
            type="text" 
            value={activeLang === 'mn' ? (siteSettings.navTeam || '') : (siteSettings.navTeam_en || '')} 
            onChange={e => updateField(activeLang === 'mn' ? 'navTeam' : 'navTeam_en', e.target.value)} 
            className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-bold focus:outline-none focus:border-black rounded-sm shadow-sm transition-all" 
            placeholder={activeLang === 'mn' ? "БАГ ХАМТ ОЛОН" : "OUR TEAM"} 
          />
        </div>
      </div>
      <p className="text-[8px] text-gray-400 font-medium uppercase tracking-tighter italic">
        * Navbar дээр харагдах цэсний нэрсийг эндээс өөрчилнө. Хоосон орхивол үндсэн нэр ашиглагдана.
      </p>
    </div>
  );
};

export default NavbarExtraSection;
