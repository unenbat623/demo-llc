import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Users, UserPlus, Trash2 } from 'lucide-react';

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
    <div className="bg-white p-8 border border-black/10 hover:border-black transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em]">Систем хэрэглэгчид</h3>
          <p className="text-gray-600 mt-1">Системд нэвтрэх эрхтэй хэрэглэгчдийг энд удирдана.</p>
        </div>
        <button
          onClick={() => {
            setEditingUserId(null);
            setUserFormData({ username: '', password: '', role: 'staff' });
            setIsUserModalOpen(true);
          }}
          className="bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-gray-800 transition-colors rounded-sm"
        >
          <UserPlus size={14} /> Шинэ хэрэглэгч
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemUsers.map((u) => (
          <motion.div
            key={u._id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 border border-black/5 hover:border-black transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-sm flex items-center justify-center ${u.role === 'admin' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
                {u.role === 'admin' ? <ShieldCheck size={20} /> : <Users size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black uppercase tracking-tight truncate">{u.username}</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{u.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingUserId(u._id);
                  setUserFormData({ username: u.username, password: '', role: u.role });
                  setIsUserModalOpen(true);
                }}
                className="flex-1 py-2 border border-black/5 text-[9px] font-black uppercase tracking-widest hover:border-black transition-colors rounded-sm"
              >
                Засах
              </button>
              {user.role === 'admin' && (
                <button
                  onClick={() => handleDeleteSystemUser(u._id, u.username)}
                  className="px-3 py-2 border border-black/5 text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors rounded-sm"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SystemUsersTab;
