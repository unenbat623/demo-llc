import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  deleteConfirm: { isOpen: boolean, memberId: string | null, memberName: string };
  setDeleteConfirm: (data: any) => void;
  handleDeleteMember: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  deleteConfirm,
  setDeleteConfirm,
  handleDeleteMember
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (deleteConfirm.isOpen && e.key === 'Enter') {
        handleDeleteMember();
      }
      if (deleteConfirm.isOpen && e.key === 'Escape') {
        setDeleteConfirm({ isOpen: false, memberId: null, memberName: '' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteConfirm.isOpen, handleDeleteMember, setDeleteConfirm]);

  return (
    <AnimatePresence>
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white max-w-sm w-full p-8 rounded-sm shadow-2xl border border-black/10"
          >
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 size={28} className="text-red-500" />
            </div>
            <h3 className="text-center text-lg font-black uppercase tracking-tighter mb-2">Устгахдаа итгэлтэй байна уу?</h3>
            <p className="text-center text-gray-500 text-xs font-bold uppercase tracking-wider mb-8 leading-relaxed">
              "{deleteConfirm.memberName}"-ийг устгаснаар мэдээллийг сэргээх боломжгүй болно.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm({ isOpen: false, memberId: null, memberName: '' })}
                className="flex-1 px-6 py-4 bg-gray-100 text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors rounded-sm"
              >
                Цуцлах
              </button>
              <button
                onClick={handleDeleteMember}
                className="flex-1 px-6 py-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-700 transition-colors rounded-sm shadow-lg shadow-red-600/20"
              >
                Устгах
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
