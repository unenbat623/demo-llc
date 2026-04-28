import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Field, inputClass } from '../shared/AdminShared';

interface ProfileTabProps {
  user: any;
  profileForm: any;
  setProfileForm: (p: any) => void;
  handleProfileUpdate: (e: React.FormEvent) => void;
  isProfileSubmitting: boolean;
  profileSubmitStatus: { type: string, message: string };
}

const ProfileTab: React.FC<ProfileTabProps> = ({
  user,
  profileForm,
  setProfileForm,
  handleProfileUpdate,
  isProfileSubmitting,
  profileSubmitStatus
}) => {
  return (
    <div className="bg-white p-8 border border-black/10 hover:border-black transition-colors duration-300 max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">01</span>
        <div className="flex-1 h-px bg-black/8" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Профайл</span>
      </div>
      <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6">Нэвтрэх мэдээлэл солих</h3>

      <AnimatePresence>
        {profileSubmitStatus.message && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className={`px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 ${profileSubmitStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-b border-emerald-200' : 'bg-red-50 text-red-600 border-b border-red-200'
              }`}>
              <span>{profileSubmitStatus.type === 'success' ? '✓' : '✕'}</span>
              {profileSubmitStatus.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleProfileUpdate} className="space-y-5">
        <Field label="Шинэ нэвтрэх нэр" hint="Хоосон орхивол өөрчлөгдөхгүй">
          <input
            type="text"
            value={profileForm.username}
            onChange={e => setProfileForm((p: any) => ({ ...p, username: e.target.value }))}
            placeholder={user.username}
            className={inputClass}
          />
        </Field>
        <Field label="Шинэ нууц үг" hint="Хоосон орхивол өөрчлөгдөхгүй">
          <input
            type="password"
            value={profileForm.password}
            onChange={e => setProfileForm((p: any) => ({ ...p, password: e.target.value }))}
            placeholder="••••••••"
            className={inputClass}
          />
        </Field>
        <button
          type="submit"
          disabled={isProfileSubmitting || (!profileForm.username && !profileForm.password)}
          className="group relative overflow-hidden bg-black text-white px-8 py-3.5 flex items-center gap-3 disabled:opacity-50 transition-opacity hover:bg-gray-900 mt-4"
          style={{ borderRadius: '2px' }}
        >
          {isProfileSubmitting ? (
            <>
              <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Хадгалж байна...</span>
            </>
          ) : (
            <>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Хадгалах</span>
              <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileTab;
