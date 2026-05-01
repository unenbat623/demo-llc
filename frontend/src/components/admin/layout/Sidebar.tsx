import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, LogOut, LucideIcon, Settings, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../LanguageSwitcher';

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  user: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  menuItems: MenuItem[];
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  user,
  activeTab,
  setActiveTab,
  setIsSidebarOpen,
  menuItems,
  handleLogout,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full bg-black text-white p-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:24px_24px]" />
      </div>

      {/* Logo Section */}
      <a href="/" title="Вэбсайт руу буцах" className="mb-10 mt-2 flex items-center gap-4 group relative z-10">
        <div className="w-9 h-9 border-2 border-white flex items-center justify-center transform rotate-45 group-hover:rotate-[225deg] transition-transform duration-700">
          <div className="-rotate-45 group-hover:-rotate-[225deg] transition-transform duration-700">
            <LayoutDashboard size={18} className="text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-black tracking-tighter uppercase leading-none">ADMIN</h2>
          <span className="text-[7px] font-black uppercase tracking-[0.4em] text-gray-500 mt-0.5 block">Terminal v1.0</span>
        </div>
      </a>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 relative z-10">
        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-600 mb-4 ml-2">{t('admin.mainMenu')}</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsSidebarOpen(false);
            }}
            className={`w-full group flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-300 ${activeTab === item.id
              ? 'bg-white text-black shadow-lg'
              : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
          >
            <item.icon size={16} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">{item.label}</span>
          </button>
        ))}

        {(user?.role === 'client' || user?.role === 'staff') && (
          <a
            href={`/site/${user.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full group flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-sm"
          >
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">{t('admin.myWebsite')}</span>
          </a>
        )}

        <div className="pt-8 space-y-1">
          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-600 mb-4 ml-2">{t('admin.account')}</p>
          <button
            onClick={() => {
              setActiveTab('settings');
              setIsSidebarOpen(false);
            }}
            className={`w-full group flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-300 ${activeTab === 'settings'
              ? 'bg-white text-black shadow-lg'
              : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
          >
            <Settings size={16} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">{t('admin.settings')}</span>
          </button>
        </div>
      </nav>

      {/* Footer / User Profile */}
      <div className="mt-auto pt-6 border-t border-white/10 relative z-10">
        <div className="flex items-center justify-between px-2 py-3 mb-4 bg-white/5 rounded-sm">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-white/10 rounded-sm flex-shrink-0 flex items-center justify-center text-[11px] font-black border border-white/5">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black uppercase tracking-wider truncate">{user?.username}</p>
              <p className="text-[7px] font-black uppercase tracking-[0.3em] text-gray-500">
                {user?.roleName || (user?.role ? t(`roles.${user.role.toLowerCase()}`) : '')}
              </p>
            </div>
          </div>
          <LanguageSwitcher isScrolled={true} />
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-red-500 hover:bg-red-500/5 transition-all duration-300 rounded-sm group"
        >
          <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">{t('admin.logout')}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
