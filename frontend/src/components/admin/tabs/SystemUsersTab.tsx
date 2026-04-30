import React from 'react';
import { motion } from 'motion/react';
import { Shield, UserPlus, Trash2, Edit2, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SystemUsersTabProps {
  systemUsers: any[];
  user: any;
  setEditingUserId: (id: string | null) => void;
  setUserFormData: (data: any) => void;
  setIsUserModalOpen: (isOpen: boolean) => void;
  handleDeleteSystemUser: (id: string) => void;
}

const SystemUsersTab: React.FC<SystemUsersTabProps> = ({
  systemUsers,
  user,
  setEditingUserId,
  setUserFormData,
  setIsUserModalOpen,
  handleDeleteSystemUser
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield size={16} />
          <h3 className="text-xs font-black uppercase tracking-widest">{t('admin.systemUsers')}</h3>
        </div>
        {(user.permissions?.includes('system_users') || user.permissions?.includes('all') || user.role === 'admin') && (
          <button
            onClick={() => {
              setEditingUserId(null);
              setUserFormData({ 
                username: '', 
                password: '', 
                role: 'staff',
                roleName: 'Шинэ ажилтан', 
                permissions: ['dashboard'] 
              });
              setIsUserModalOpen(true);
            }}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            <UserPlus size={14} /> {t('common.add') || 'Нэмэх'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systemUsers.map((u, idx) => (
          <motion.div
            key={u._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white border border-black/5 p-4 rounded-sm flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-sm flex items-center justify-center text-black font-black">
                {u.username[0].toUpperCase()}
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-tight">{u.username}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck size={10} className={u.permissions?.includes('all') ? 'text-blue-500' : 'text-gray-400'} />
                  <span className="text-[9px] font-bold uppercase text-gray-400">
                    {u.roleName || (u.role ? t(`roles.${u.role.toLowerCase()}`) : 'Admin')}
                  </span>
                </div>
              </div>
            </div>

            {(user.permissions?.includes('system_users') || user.permissions?.includes('all') || user.role === 'admin') && u.username !== user.username && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => {
                    setEditingUserId(u._id);
                    setUserFormData({ 
                      username: u.username, 
                      password: '', 
                      role: u.role, 
                      roleName: u.roleName, 
                      permissions: u.permissions || [] 
                    });
                    setIsUserModalOpen(true);
                  }}
                  className="p-1.5 text-gray-400 hover:text-black transition-colors"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => handleDeleteSystemUser(u._id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SystemUsersTab;
