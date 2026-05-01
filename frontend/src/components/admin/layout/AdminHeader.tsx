import React from 'react';
import { Shield, X, Menu } from 'lucide-react';
import LanguageSwitcher from '../../LanguageSwitcher';

interface AdminHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ isSidebarOpen, setIsSidebarOpen, handleLogout }) => {
  return (
    <header className="lg:hidden bg-white/90 backdrop-blur-xl border-b border-black/5 p-5 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <a 
          href="/" 
          title="Вэбсайт руу буцах" 
          className="flex items-center gap-4 group"
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          <div className="w-10 h-10 bg-black flex items-center justify-center transform rotate-45 group-active:scale-95 transition-transform">
            <div className="-rotate-45">
              <Shield size={20} className="text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase leading-none">ADMIN</h1>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-400">Mobile Terminal</span>
          </div>
        </a>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher isScrolled={true} />
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`w-12 h-12 flex items-center justify-center rounded-sm transition-all duration-300 ${isSidebarOpen ? 'bg-black text-white' : 'bg-gray-100 text-black'
            }`}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
