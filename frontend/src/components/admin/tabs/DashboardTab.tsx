import React from 'react';
import { motion } from 'motion/react';
import { Users, ShieldCheck, Activity } from 'lucide-react';

interface DashboardTabProps {
  teamMembers: any[];
  user: any;
  logs: any[];
}

const DashboardTab: React.FC<DashboardTabProps> = ({ teamMembers, user, logs }) => {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 border border-black/10 hover:border-black hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users size={80} className="text-black" />
          </div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 relative z-10">Нийт гишүүд</h3>
          <p className="text-5xl font-black relative z-10 tracking-tighter">{teamMembers.length}</p>
          <div className="mt-4 flex items-center gap-2 text-green-500 relative z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest">Active System</span>
          </div>
        </motion.div>
        
        {user.role === 'staff' ? (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black text-white p-8 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck size={80} />
            </div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-gray-400">Staff Хязгаарлалт</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-[80%]">Та staff эрхтэй байгаа тул зөвхөн хязгаарлагдмал цэсүүд харагдаж байна.</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 border border-black/10 hover:border-black hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Activity size={80} className="text-black" />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 relative z-10">Сүүлийн үйлдэл</h3>
            <div className="space-y-4 mt-4 flex-1 relative z-10">
              {(logs || []).slice(0, 5).map((log, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  key={idx} 
                  className="flex items-center gap-4 text-xs border-b border-gray-100 pb-3 last:border-0 hover:translate-x-2 transition-transform duration-300"
                >
                  <span className={`px-2 py-1 text-[8px] font-black uppercase tracking-[0.2em] rounded-sm ${
                    log.action === 'CREATE' ? 'bg-green-100 text-green-700' :
                    log.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                    log.action === 'DELETE' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                  }`}>{log.action}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-700 truncate tracking-tight">{log.description}</p>
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">
                      {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              {(logs || []).length === 0 && (
                <div className="h-full flex flex-col items-center justify-center py-8">
                  <Activity size={24} className="text-gray-200 mb-2" />
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Одоогоор лог байхгүй</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardTab;
