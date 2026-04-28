import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
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
  return (
    <AnimatePresence>
      {isUserModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[210] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
          onClick={() => setIsUserModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white w-full max-w-md p-8 rounded-sm shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsUserModalOpen(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-black"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-black uppercase tracking-tighter mb-8">
              {editingUserId ? 'Хэрэглэгч засах' : 'Шинэ хэрэглэгч нэмэх'}
            </h3>

            {userSubmitStatus.message && (
              <div className={`mb-6 p-4 text-xs font-bold rounded-sm ${userSubmitStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {userSubmitStatus.message}
              </div>
            )}

            <form onSubmit={handleSaveSystemUser} className="space-y-6">
              <Field label="Нэвтрэх нэр">
                <input
                  type="text"
                  value={userFormData.username}
                  onChange={e => setUserFormData({ ...userFormData, username: e.target.value })}
                  required
                  className={inputClass}
                />
              </Field>
              <Field label={editingUserId ? "Шинэ нууц үг (Заавал биш)" : "Нууц үг"}>
                <input
                  type="password"
                  value={userFormData.password}
                  onChange={e => setUserFormData({ ...userFormData, password: e.target.value })}
                  required={!editingUserId}
                  className={inputClass}
                />
              </Field>
              {user.role === 'admin' && (
                <Field label="Эрх">
                  <select
                    value={userFormData.role}
                    onChange={e => setUserFormData({ ...userFormData, role: e.target.value })}
                    className={inputClass}
                  >
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </Field>
              )}
              <button
                type="submit"
                className="w-full bg-black text-white py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors rounded-sm"
              >
                {editingUserId ? 'Шинэчлэх' : 'Хадгалах'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserModal;
