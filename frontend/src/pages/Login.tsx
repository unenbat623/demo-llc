import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, User, ShieldCheck, ChevronRight, Loader2, X } from 'lucide-react';

export const navigateTo = (path: string) => {
  window.history.pushState({}, '', path);
  const navEvent = new PopStateEvent('navigate');
  window.dispatchEvent(navEvent);
};

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const { login, isLoading, error } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigateTo('/admin');
    } catch (err) {
      // Error handled by context
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] selection:bg-white selection:text-black p-6 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)` 
          }} 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] relative z-10"
      >
        {/* Logo/Brand Area */}
        <div className="mb-10 text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white mb-6 transform rotate-45 group"
          >
            <div className="transform -rotate-45">
              <ShieldCheck size={32} className="text-black" />
            </div>
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-black tracking-tighter uppercase text-white mb-3"
          >
            Админ Панель
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500"
          >
            Таван Богд Технологи
          </motion.p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 sm:p-10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95 }}
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
                Хэрэглэгчийн нэр
              </label>
              <div className={`relative transition-all duration-300 ${isFocused === 'user' ? 'scale-[1.02]' : ''}`}>
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <User size={18} className={`transition-colors duration-300 ${isFocused === 'user' ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <input
                  id="username"
                  type="text"
                  onFocus={() => setIsFocused('user')}
                  onBlur={() => setIsFocused(null)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 text-white placeholder:text-gray-700 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300 text-sm tracking-wide"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 block ml-1" htmlFor="password">
                Нууц үг
              </label>
              <div className={`relative transition-all duration-300 ${isFocused === 'pass' ? 'scale-[1.02]' : ''}`}>
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Lock size={18} className={`transition-colors duration-300 ${isFocused === 'pass' ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <input
                  id="password"
                  type="password"
                  onFocus={() => setIsFocused('pass')}
                  onBlur={() => setIsFocused(null)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 text-white placeholder:text-gray-700 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300 text-sm tracking-wide"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden bg-white text-black py-5 mt-4 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              <div className="absolute inset-0 bg-gray-200 transition-transform duration-500 ease-[0.16, 1, 0.3, 1] -translate-x-full group-hover:translate-x-0" />
              <div className="relative flex items-center justify-center gap-3">
                <span className="text-xs font-black uppercase tracking-[0.4em]">
                  {isLoading ? 'Баталгаажуулж байна' : 'Нэвтрэх'}
                </span>
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                )}
              </div>
            </button>
          </form>

          {/* Test Credentials Hint */}
          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">Туршилтын мэдээлэл</p>
            <div className="flex gap-4">
              <div className="px-3 py-1.5 bg-white/5 border border-white/5 text-[10px] text-gray-400 font-bold tracking-wider">
                ADMIN / ADMIN
              </div>
              <div className="px-3 py-1.5 bg-white/5 border border-white/5 text-[10px] text-gray-400 font-bold tracking-wider">
                STAFF / STAFF
              </div>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <a href="/" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors duration-300">
            Вэбсайт руу буцах
          </a>
        </div>
      </motion.div>
    </div>
  );
}
