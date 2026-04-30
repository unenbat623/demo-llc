import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Lock, Shield, UserPlus, Save, Users } from 'lucide-react';
import { Field, inputClass } from '../shared/AdminShared';

interface UserModalProps {
  isUserModalOpen: boolean;
  setIsUserModalOpen: (isOpen: boolean) => void;
  editingUserId: string | null;
  userSubmitStatus: { type: string, message: string };
  handleSaveSystemUser: (e: React.FormEvent) => void;
  userFormData: any;
  setUserFormData: (data: any) => void;
  user: any;
}

const UserModal: React.FC<UserModalProps> = ({
  isUserModalOpen,
  setIsUserModalOpen,
  editingUserId,
  userSubmitStatus,
  handleSaveSystemUser,
  userFormData,
  setUserFormData,
  user
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isUserModalOpen) return;
      if (e.key === 'Enter' && e.target instanceof HTMLElement && e.target.tagName !== 'TEXTAREA') {
        handleSaveSystemUser(e as any);
      }
      if (e.key === 'Escape') {
        setIsUserModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isUserModalOpen, handleSaveSystemUser, setIsUserModalOpen]);

  return (
    <AnimatePresence>
      {isUserModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[210] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
          onClick={() => setIsUserModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white w-full max-w-lg rounded-sm shadow-2xl relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Decorative Side Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black" />

            <div className="p-8 sm:p-10">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <UserPlus size={18} className="text-black" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Хандалтын удирдлага</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">
                    {editingUserId ? 'Хэрэглэгч засах' : 'Шинэ хэрэглэгч'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsUserModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {userSubmitStatus.message && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`mb-8 p-4 text-[11px] font-bold rounded-sm border flex items-center gap-3 uppercase tracking-wider ${
                    userSubmitStatus.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${userSubmitStatus.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                  {userSubmitStatus.message}
                </motion.div>
              )}

              <form onSubmit={handleSaveSystemUser} className="space-y-8">
                <div className="space-y-6">
                  <Field label="Нэвтрэх нэр" icon={<User size={14} className="text-gray-400" />}>
                    <input
                      type="text"
                      value={userFormData.username}
                      onChange={e => setUserFormData({ ...userFormData, username: e.target.value })}
                      required
                      placeholder="Жишээ: admin_tavanbogd"
                      className={`${inputClass} !bg-gray-50/50 focus:!bg-white transition-colors`}
                    />
                  </Field>

                  <Field label={editingUserId ? "Шинэ нууц үг (Заавал биш)" : "Нууц үг"} icon={<Lock size={14} className="text-gray-400" />}>
                    <input
                      type="password"
                      value={userFormData.password}
                      onChange={e => setUserFormData({ ...userFormData, password: e.target.value })}
                      required={!editingUserId}
                      placeholder="••••••••"
                      className={`${inputClass} !bg-gray-50/50 focus:!bg-white transition-colors`}
                    />
                  </Field>

                  <Field label="Эрхийн төрөл (Role Type)" icon={<Shield size={14} className="text-gray-400" />}>
                    <div className="flex gap-4 mt-2">
                      {[
                        { id: 'admin', label: 'Админ' },
                        { id: 'client', label: 'Харилцагч (Client)' }
                      ].map(type => (
                        <label key={type.id} className={`flex-1 flex items-center justify-center gap-3 p-3 border rounded-sm cursor-pointer transition-all ${userFormData.role === type.id ? 'bg-black text-white border-black' : 'bg-gray-50 text-gray-400 border-black/5 hover:border-black/20'}`}>
                          <input
                            type="radio"
                            name="role"
                            className="hidden"
                            checked={userFormData.role === type.id}
                            onChange={() => setUserFormData({ ...userFormData, role: type.id })}
                          />
                          <span className="text-[9px] font-black uppercase tracking-widest">{type.label}</span>
                        </label>
                      ))}
                    </div>
                  </Field>

                  <Field label="Эрхийн нэр (Role Name)" icon={<Shield size={14} className="text-gray-400" />}>
                    <input
                      type="text"
                      value={userFormData.roleName || ''}
                      onChange={e => setUserFormData({ ...userFormData, roleName: e.target.value })}
                      placeholder="Жишээ: Manager, HR, Editor..."
                      className={`${inputClass} !bg-gray-50/50 focus:!bg-white transition-colors`}
                    />
                  </Field>

                  <Field label="Хандах эрхүүд (Permissions)" icon={<Shield size={14} className="text-gray-400" />}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {[
                        { id: 'dashboard', label: 'Ерөнхий (Dashboard)' },
                        { id: 'users', label: 'Багийн гишүүд' },
                        { id: 'system_users', label: 'Систем хэрэглэгчид' },
                        { id: 'website', label: 'Вэбсайт тохиргоо' },
                        { id: 'logs', label: 'Системийн лог' },
                      ].map(perm => (
                        <label key={perm.id} className="flex items-center gap-3 p-3 border border-black/5 bg-gray-50 rounded-sm cursor-pointer hover:border-black/20 transition-colors">
                          <input
                            type="checkbox"
                            checked={userFormData.permissions?.includes(perm.id) || false}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const currentPerms = userFormData.permissions || [];
                              setUserFormData({
                                ...userFormData,
                                permissions: checked 
                                  ? [...currentPerms, perm.id]
                                  : currentPerms.filter((p: string) => p !== perm.id)
                              });
                            }}
                            className="w-4 h-4 accent-black"
                          />
                          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">{perm.label}</span>
                        </label>
                      ))}
                    </div>
                  </Field>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden bg-black text-white py-5 flex items-center justify-center gap-3 transition-all duration-500 rounded-sm"
                  >
                    <div className="absolute inset-0 bg-gray-800 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                    <span className="relative flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em]">
                      <Save size={18} />
                      {editingUserId ? 'Шинэчлэлтийг хадгалах' : 'Хэрэглэгч үүсгэх'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserModal;
