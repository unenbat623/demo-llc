import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, LucideIcon } from 'lucide-react';

interface WebsiteAccordionItemProps {
  id: string;
  label: string;
  sub: string;
  icon: LucideIcon;
  num: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const WebsiteAccordionItem: React.FC<WebsiteAccordionItemProps> = ({
  id,
  label,
  sub,
  icon: Icon,
  num,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <div className="border-b border-black/5 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200 ${
          isOpen ? 'bg-black text-white' : 'bg-white hover:bg-gray-50 text-black'
        }`}
      >
        <div className="flex items-center gap-4">
          <span className={`text-[9px] font-black tracking-[0.3em] tabular-nums ${isOpen ? 'text-white/40' : 'text-gray-300'}`}>
            {num}
          </span>
          <div className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 ${isOpen ? 'bg-white/10' : 'bg-gray-50'}`}>
            <Icon size={15} className={isOpen ? 'text-white' : 'text-gray-500'} />
          </div>
          <div>
            <p className={`text-xs font-black uppercase tracking-widest ${isOpen ? 'text-white' : 'text-black'}`}>
              {label}
            </p>
            <p className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${isOpen ? 'text-white/40' : 'text-gray-400'}`}>
              {sub}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className={isOpen ? 'text-white/60' : 'text-gray-400'} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`body-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 py-6 bg-white border-t border-black/5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WebsiteAccordionItem;
