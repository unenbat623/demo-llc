import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, User, ChevronRight, Loader2, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  handleLogin: (e: React.FormEvent) => void;
  username: string;
  setUsername: (s: string) => void;
  password: string;
  setPassword: (s: string) => void;
  isLoading: boolean;
  error: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleLogin, username, setUsername, password, setPassword, isLoading, error
}) => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState<string | null>(null);

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 sm:p-10 relative overflow-hidden group rounded-sm">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <AnimatePresence mode="wait">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            className="mb-8 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-500 text-[11px] font-bold uppercase tracking-wider flex items-center gap-3"
          >
            <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-red-500 rounded-full">
              <X size={12} className="text-white" />
            </div>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleLogin} className="space-y-8">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 block ml-1" htmlFor="username">
            {t('login.username')}
          </label>
          <div className={`relative transition-all duration-300 ${isFocused === 'user' ? 'scale-[1.02]' : ''}`}>
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <User size={18} className={`transition-colors duration-300 ${isFocused === 'user' ? 'text-white' : 'text-gray-600'}`} />
            </div>
            <input
              id="username" type="text" onFocus={() => setIsFocused('user')} onBlur={() => setIsFocused(null)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 text-white placeholder:text-gray-700 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300 text-sm tracking-wide rounded-sm"
              value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" disabled={isLoading} required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 block ml-1" htmlFor="password">
            {t('login.password')}
          </label>
          <div className={`relative transition-all duration-300 ${isFocused === 'pass' ? 'scale-[1.02]' : ''}`}>
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Lock size={18} className={`transition-colors duration-300 ${isFocused === 'pass' ? 'text-white' : 'text-gray-600'}`} />
            </div>
            <input
              id="password" type="password" onFocus={() => setIsFocused('pass')} onBlur={() => setIsFocused(null)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 text-white placeholder:text-gray-700 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300 text-sm tracking-wide rounded-sm"
              value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" disabled={isLoading} required
            />
          </div>
        </div>

        <button
          type="submit" disabled={isLoading}
          className="group relative w-full overflow-hidden bg-white text-black py-5 mt-4 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] rounded-sm"
        >
          <div className="absolute inset-0 bg-gray-200 transition-transform duration-500 ease-[0.16, 1, 0.3, 1] -translate-x-full group-hover:translate-x-0" />
          <div className="relative flex items-center justify-center gap-3">
            <span className="text-xs font-black uppercase tracking-[0.4em]">
              {isLoading ? t('common.loading') : t('login.login')}
            </span>
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
          </div>
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">{t('login.testCredentials')}</p>
        <div className="flex gap-4">
          <div className="px-3 py-1.5 bg-white/5 border border-white/5 text-[10px] text-gray-400 font-bold tracking-wider">ADMIN / ADMIN</div>
          <div className="px-3 py-1.5 bg-white/5 border border-white/5 text-[10px] text-gray-400 font-bold tracking-wider">STAFF / STAFF</div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
