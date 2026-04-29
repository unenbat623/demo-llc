import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ChevronRight } from 'lucide-react';

// Components
import BasicInfoSection from './member-modal/BasicInfoSection';
import ImageSection from './member-modal/ImageSection';
import DetailedInfoSection from './member-modal/DetailedInfoSection';

interface MemberModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  editingMemberId: string | null;
  handleAutoTranslate: () => void;
  isTranslating: boolean;
  submitStatus: { type: string, message: string };
  handleSaveMember: (e: React.FormEvent) => void;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFormData: (updater: (prev: any) => any) => void;
  imageInputMode: 'url' | 'file';
  setImageInputMode: (mode: 'url' | 'file') => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
}

const MemberModal: React.FC<MemberModalProps> = ({
  isModalOpen, setIsModalOpen, editingMemberId, handleAutoTranslate, isTranslating,
  submitStatus, handleSaveMember, formData, handleInputChange, setFormData,
  imageInputMode, setImageInputMode, handleFileUpload, isSubmitting
}) => {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 48px), repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 48px)',
            }}
          />

          <motion.div
            initial={{ y: 48, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 32, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden rounded-sm"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-[3px] w-full bg-black flex-shrink-0" />

            <div className="flex items-center justify-between px-8 py-6 border-b border-black/8 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-black flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-black">{editingMemberId ? '✎' : '+'}</span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">{editingMemberId ? 'Засах' : 'Шинэ'}</p>
                  <h3 className="text-lg font-black uppercase tracking-tight">Багийн гишүүн</h3>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button" onClick={handleAutoTranslate} disabled={isTranslating}
                  className={`flex items-center gap-2 px-4 py-2 border border-black/10 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-sm ${isTranslating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white'}`}
                >
                  {isTranslating ? <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <Sparkles size={12} />}
                  {isTranslating ? 'Орчуулж байна...' : 'Auto Translate'}
                </button>
                <button onClick={() => setIsModalOpen(false)} className="w-9 h-9 flex items-center justify-center border border-black/15 hover:border-black hover:bg-black hover:text-white transition-all group rounded-sm">
                  <X size={16} className="group-hover:rotate-90 transition-transform" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {submitStatus.message && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden flex-shrink-0">
                  <div className={`px-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 ${submitStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-b border-emerald-200' : 'bg-red-50 text-red-600 border-b border-red-200'}`}>
                    <span>{submitStatus.type === 'success' ? '✓' : '✕'}</span>
                    {submitStatus.message}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="overflow-y-auto flex-1 custom-scrollbar">
              <form onSubmit={handleSaveMember}>
                <BasicInfoSection formData={formData} handleInputChange={handleInputChange} setFormData={setFormData} />
                <ImageSection 
                  imageInputMode={imageInputMode} setImageInputMode={setImageInputMode} formData={formData} 
                  handleInputChange={handleInputChange} handleFileUpload={handleFileUpload} 
                />
                <DetailedInfoSection formData={formData} handleInputChange={handleInputChange} setFormData={setFormData} />

                <div className="px-8 py-6 border-t border-black/8 bg-gray-50/80 flex items-center justify-between gap-4 flex-shrink-0">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-colors px-4 py-3">Цуцлах</button>
                  <button
                    type="submit" disabled={isSubmitting}
                    className="group relative overflow-hidden bg-black text-white px-8 py-3.5 flex items-center gap-3 disabled:opacity-50 hover:bg-gray-900 rounded-sm"
                  >
                    {isSubmitting ? <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{isSubmitting ? 'Хадгалж байна...' : 'Хадгалах'}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MemberModal;
