import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';


import LoginHeader from '../components/login/LoginHeader';
import LoginForm from '../components/login/LoginForm';

export const navigateTo = (path: string) => {
  window.history.pushState({}, '', path);
  const navEvent = new PopStateEvent('navigate');
  window.dispatchEvent(navEvent);
};

export default function Login() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigateTo('/admin');
    } catch (err) {

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
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] relative z-10"
      >
        <LoginHeader />
        
        <LoginForm 
          handleLogin={handleLogin} username={username} setUsername={setUsername} 
          password={password} setPassword={setPassword} isLoading={isLoading} error={error} 
        />

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <a href="/" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors duration-300">
            {t('login.backToWebsite')}
          </a>
        </div>
      </motion.div>
    </div>
  );
}
