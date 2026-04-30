import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle } from 'lucide-react';

export interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: (() => void) | null;
}

interface ConfirmModalProps {
  state: ConfirmModalState;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ state, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.isOpen && e.key === 'Enter' && state.onConfirm) {
        state.onConfirm();
        onClose();
      }
      if (state.isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, onClose]);

  return (
    <AnimatePresence>
      {state.isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white max-w-sm w-full p-8 rounded-sm shadow-2xl border border-black/10"
          >
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={28} className="text-red-500" />
            </div>
            <h3 className="text-center text-lg font-black uppercase tracking-tighter mb-2">{state.title}</h3>
            <p className="text-center text-gray-500 text-xs font-bold uppercase tracking-wider mb-8 leading-relaxed">
              {state.description}
            </p>
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-4 bg-gray-100 text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors rounded-sm"
              >
                Цуцлах
              </button>
              <button
                onClick={() => {
                  if (state.onConfirm) state.onConfirm();
                  onClose();
                }}
                className="flex-1 px-6 py-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-700 transition-colors rounded-sm shadow-lg shadow-red-600/20"
              >
                Зөвшөөрөх
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
