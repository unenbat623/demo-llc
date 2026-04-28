import React from 'react';
import { LayoutDashboard, Menu, X } from 'lucide-react';

interface AdminHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="lg:hidden bg-white/80 backdrop-blur-xl border-b p-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-black flex items-center justify-center transform rotate-45">
          <div className="-rotate-45">
            <LayoutDashboard size={16} className="text-white" />
          </div>
        </div>
        <h1 className="text-lg font-black tracking-tighter uppercase">Админ</h1>
      </div>
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
};

export default AdminHeader;
