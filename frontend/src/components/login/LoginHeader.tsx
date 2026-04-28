import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LoginHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-10 text-center">
      <motion.div
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center justify-center w-16 h-16 bg-white mb-6 transform rotate-45 group"
      >
        <div className="transform -rotate-45">
          <ShieldCheck size={32} className="text-black" />
        </div>
      </motion.div>
      <motion.h2 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-black tracking-tighter uppercase text-white mb-3"
      >
        {t('login.title')}
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500"
      >
        {t('login.subtitle')}
      </motion.p>
    </div>
  );
};

export default LoginHeader;
