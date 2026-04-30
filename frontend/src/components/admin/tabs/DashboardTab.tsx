import React from 'react';
import { motion } from 'motion/react';
import { Users, ShieldCheck, Activity, TrendingUp, Clock, Zap } from 'lucide-react';

interface DashboardTabProps {
  teamMembers: any[];
  user: any;
  logs: any[];
  setActiveTab: (tab: string) => void;
  openAddModal: () => void;
}

const DashboardTab: React.FC<DashboardTabProps> = ({ teamMembers, user, logs, setActiveTab, openAddModal }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Bar */}
      <div className="bg-black text-white p-6 rounded-sm relative overflow-hidden group">
        <div className="relative z-10">
          <h2 className="text-xl font-black uppercase tracking-tight mb-1">Сайн уу, {user.username}!</h2>
          <p className="text-gray-400 text-xs font-medium">Систем хэвийн ажиллаж байна.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 border border-black/5 rounded-sm flex items-center justify-between"
        >
          <div>
            <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Багийн гишүүд</h4>
            <p className="text-2xl font-black tracking-tighter">{teamMembers.length}</p>
          </div>
          <div className="w-10 h-10 bg-gray-50 rounded-sm flex items-center justify-center text-black">
            <Users size={18} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 border border-black/5 rounded-sm flex items-center justify-between"
        >
          <div>
            <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">24ц Үйлдлүүд</h4>
            <p className="text-2xl font-black tracking-tighter">{(logs || []).length}</p>
          </div>
          <div className="w-10 h-10 bg-gray-50 rounded-sm flex items-center justify-center text-black">
            <Activity size={18} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 border border-black/5 rounded-sm flex items-center justify-between"
        >
          <div>
            <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Таны эрх</h4>
            <p className="text-xl font-black tracking-tight uppercase">{user.role}</p>
          </div>
          <div className="w-10 h-10 bg-gray-50 rounded-sm flex items-center justify-center text-black">
            <ShieldCheck size={18} />
          </div>
        </motion.div>
      </div>

      {/* Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white border border-black/5 rounded-sm">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-widest">Сүүлийн үеийн лог</h3>
          </div>
          <div className="p-4 space-y-3">
            {(logs || []).slice(0, 5).map((log, idx) => (
              <div key={idx} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className={`w-6 h-6 rounded-sm flex items-center justify-center flex-shrink-0 text-[10px] ${
                  log.action === 'CREATE' ? 'bg-green-100 text-green-700' :
                  log.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                  log.action === 'DELETE' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  <Activity size={12} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-700 truncate">{log.description}</p>
                </div>
                <span className="text-[8px] font-black uppercase text-gray-300">
                  {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gray-50 p-4 border border-black/5 rounded-sm">
            <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-3">Хурдан холбоос</h4>
            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={() => {
                  if (user.permissions?.includes('users') || user.permissions?.includes('all') || user.role === 'admin') {
                    setActiveTab('users');
                    openAddModal();
                  } else {
                    alert('Танд багийн гишүүн нэмэх эрх байхгүй байна.');
                  }
                }}
                className="w-full py-2 px-3 bg-white border border-black/5 hover:border-black transition-all rounded-sm text-[9px] font-black uppercase tracking-widest text-left"
              >
                Шинэ гишүүн нэмэх
              </button>
              <button 
                onClick={() => {
                  if (user.permissions?.includes('website') || user.permissions?.includes('all') || user.role === 'admin') {
                    setActiveTab('website');
                  } else {
                    alert('Танд вэбсайт засах эрх байхгүй байна.');
                  }
                }}
                className="w-full py-2 px-3 bg-white border border-black/5 hover:border-black transition-all rounded-sm text-[9px] font-black uppercase tracking-widest text-left"
              >
                Вэбсайт засах
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
