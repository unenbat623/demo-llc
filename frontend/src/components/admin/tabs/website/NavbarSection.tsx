import React from 'react';
import { Layout, Globe } from 'lucide-react';
import { SiteSettings } from '../../../../types/admin';

interface NavbarSectionProps {
  siteSettings: SiteSettings;
  activeLang: 'mn' | 'en';
  updateField: (field: keyof SiteSettings, value: string) => void;
}

const NavbarSection: React.FC<NavbarSectionProps> = ({ siteSettings, activeLang, updateField }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Layout size={14} className="text-black" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Үндсэн мэдээлэл</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-sm border border-black/5">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400">
            <Globe size={10} /> {activeLang === 'mn' ? 'Вэбсайт нэр' : 'Site Title'}
          </label>
          <input
            type="text"
            value={activeLang === 'mn' ? siteSettings.siteTitle : siteSettings.siteTitle_en}
            onChange={e => updateField(activeLang === 'mn' ? 'siteTitle' : 'siteTitle_en', e.target.value)}
            className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-bold focus:outline-none focus:border-black focus:ring-1 focus:ring-black/5 rounded-sm transition-all shadow-sm"
            placeholder={activeLang === 'mn' ? "Сайтын нэр..." : "Website Name..."}
          />
          <p className="text-[8px] text-gray-400 font-medium uppercase tracking-tighter italic">* Хөтчийн таб болон SEO-д ашиглагдана</p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400">
            <Layout size={10} /> {activeLang === 'mn' ? 'Лого текст' : 'Navbar Logo'}
          </label>
          <input
            type="text"
            value={siteSettings.navbarLogo}
            onChange={e => updateField('navbarLogo', e.target.value)}
            className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-bold focus:outline-none focus:border-black focus:ring-1 focus:ring-black/5 rounded-sm transition-all shadow-sm"
            placeholder="TAVAN BOGD TECH"
          />
          <p className="text-[8px] text-gray-400 font-medium uppercase tracking-tighter italic">* Navbar дээрх текстийг өөрчилнө</p>
        </div>
      </div>
    </div>
  );
};

export default NavbarSection;
