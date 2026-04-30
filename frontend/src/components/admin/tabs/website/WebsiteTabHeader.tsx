import React from 'react';
import { Globe, Save } from 'lucide-react';

interface WebsiteTabHeaderProps {
  activeLang: 'mn' | 'en';
  setActiveLang: (lang: 'mn' | 'en') => void;
  isSettingsSaving: boolean;
}

const WebsiteTabHeader: React.FC<WebsiteTabHeaderProps> = ({
  activeLang,
  setActiveLang,
  isSettingsSaving,
}) => {
  return (
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
        <div className="flex bg-white/10 p-0.5 rounded-sm">
          {(['mn', 'en'] as const).map(lang => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveLang(lang)}
              className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm ${
                activeLang === lang ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
              }`}
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
  );
};

export default WebsiteTabHeader;
