import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Save, UserCircle, Key, ShieldCheck } from 'lucide-react';
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Info Card */}
      <div className="lg:col-span-4">
        <div className="bg-black text-white p-6 rounded-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center text-xl font-black mb-4">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-0.5">{user?.username}</h3>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-500">
              <ShieldCheck size={10} className="text-green-500" />
              {user?.role} хандалт
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Card */}
      <div className="lg:col-span-8">
        <div className="bg-white p-6 border border-black/5 rounded-sm">
          <div className="mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Key size={14} className="text-black" /> Профайл шинэчлэх
            </h3>
          </div>

          <AnimatePresence>
            {profileSubmitStatus.message && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-3 text-[10px] font-black uppercase tracking-widest rounded-sm border ${
                  profileSubmitStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                }`}
              >
                {profileSubmitStatus.message}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Шинэ нэвтрэх нэр" hint="Хоосон орхивол өөрчлөгдөхгүй">
                <input
                  type="text"
                  value={profileForm.username}
                  onChange={e => setProfileForm((p: any) => ({ ...p, username: e.target.value }))}
                  placeholder={user.username}
                  className={`${inputClass} !py-2.5 !text-xs`}
                />
              </Field>
              <Field label="Шинэ нууц үг" hint="Хоосон орхивол өөрчлөгдөхгүй">
                <input
                  type="password"
                  value={profileForm.password}
                  onChange={e => setProfileForm((p: any) => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className={`${inputClass} !py-2.5 !text-xs`}
                />
              </Field>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isProfileSubmitting || (!profileForm.username && !profileForm.password)}
                className="group relative overflow-hidden bg-black text-white px-6 py-3 rounded-sm disabled:opacity-30 transition-all flex items-center gap-2"
              >
                <span className="relative flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  {isProfileSubmitting ? (
                    <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  {isProfileSubmitting ? 'Хадгалж байна...' : 'Шинэчлэх'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
