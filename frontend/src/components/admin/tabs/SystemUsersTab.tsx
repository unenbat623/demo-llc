import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Users, UserPlus, Trash2, Key, Edit3, Fingerprint } from 'lucide-react';

interface SystemUsersTabProps {
  systemUsers: any[];
  user: any;
  setEditingUserId: (id: string | null) => void;
  setUserFormData: (data: any) => void;
  setIsUserModalOpen: (isOpen: boolean) => void;
  handleDeleteSystemUser: (id: string, username: string) => void;
}

const SystemUsersTab: React.FC<SystemUsersTabProps> = ({
  systemUsers,
  user,
  setEditingUserId,
  setUserFormData,
  setIsUserModalOpen,
  handleDeleteSystemUser
}) => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white p-8 border border-black/5 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none">
          <Fingerprint size={120} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-black rounded-full" />
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Системийн хамгаалалт</h3>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Хэрэглэгчийн удирдлага</h2>
          <p className="text-gray-500 text-sm mt-1 max-w-md">Системд нэвтрэх эрх бүхий ажилтнуудын бүртгэл болон хандалтын түвшинг энд тохируулна.</p>
        </div>

        <button
          onClick={() => {
            setEditingUserId(null);
            setUserFormData({ username: '', password: '', role: 'staff' });
            setIsUserModalOpen(true);
          }}
          className="group relative overflow-hidden bg-black text-white px-8 py-4 flex items-center gap-3 transition-all duration-500 rounded-sm self-start sm:self-center"
        >
          <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
          <span className="relative flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
            <UserPlus size={16} />
            Шинэ хэрэглэгч
          </span>
        </button>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemUsers.map((u, idx) => (
          <motion.div
            key={u._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-black/5 rounded-sm overflow-hidden group hover:border-black transition-all duration-500 flex flex-col"
          >
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-sm flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${
                  u.role === 'admin' ? 'bg-black text-white shadow-xl shadow-black/10' : 'bg-gray-100 text-gray-400'
                }`}>
                  {u.role === 'admin' ? <ShieldCheck size={28} /> : <Users size={28} />}
                </div>
                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  u.role === 'admin' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {u.role}
                </div>
              </div>

              <div className="space-y-1 mb-6">
                <h4 className="text-lg font-black uppercase tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                  {u.username}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  <Key size={12} />
                  <span>Систем {u.role === 'admin' ? 'Админ' : 'Ажилтан'}</span>
                </div>
              </div>

              <div className="h-px w-full bg-black/5 mb-6" />

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingUserId(u._id);
                    setUserFormData({ username: u.username, password: '', role: u.role });
                    setIsUserModalOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-black/5 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 rounded-sm"
                >
                  <Edit3 size={12} />
                  Засах
                </button>
                {user.role === 'admin' && u._id !== user.id && (
                  <button
                    onClick={() => handleDeleteSystemUser(u._id, u.username)}
                    className="w-12 flex items-center justify-center border border-black/5 text-gray-300 hover:text-red-500 hover:border-red-500 hover:bg-red-50 transition-all duration-300 rounded-sm"
                    title="Устгах"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <div className={`h-1.5 w-full transition-all duration-500 opacity-30 group-hover:opacity-100 ${
              u.role === 'admin' ? 'bg-black' : 'bg-gray-200'
            }`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SystemUsersTab;
