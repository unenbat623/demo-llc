import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, LogOut, ChevronRight, LucideIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  roles: string[];
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
  return (
    <div className="flex flex-col h-full bg-black text-white p-6">
      <div className="mb-12 mt-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-white flex items-center justify-center transform rotate-45">
          <div className="-rotate-45">
            <LayoutDashboard size={20} className="text-black" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tighter uppercase leading-none">Админ</h2>
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 mt-1">Төв систем</div>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsSidebarOpen(false);
            }}
            className={`w-full group flex items-center gap-4 px-4 py-4 rounded-sm transition-all duration-500 relative overflow-hidden ${activeTab === item.id
                ? 'bg-white/10 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]'
                : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
          >
            {activeTab === item.id && (
              <motion.div
                layoutId="active-nav"
                className="absolute left-0 w-1 h-6 bg-white rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <item.icon
              size={18}
              className={`transition-all duration-500 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'
                }`}
            />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.label}</span>
            <ChevronRight
              size={14}
              className={`ml-auto transition-all duration-500 ${activeTab === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}
            />
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/10">
        <div className="flex items-center gap-4 px-4 py-4 mb-4 bg-white/5 rounded-sm">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-wider truncate">{user?.username}</p>
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-4 text-gray-500 hover:text-red-500 hover:bg-red-500/5 transition-all duration-300 rounded-sm group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em]">Гарах</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
