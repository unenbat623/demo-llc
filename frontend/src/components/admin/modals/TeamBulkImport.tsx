import React, { useState } from 'react';
import { parseTeamExcel, TeamMemberImport } from '../../../utils/parseTeamExcel';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileSpreadsheet, Check, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { API_URL } from '../../../services/api';
import BulkImportInstructions from './bulk-import/BulkImportInstructions';
import BulkImportPreview from './bulk-import/BulkImportPreview';

interface TeamBulkImportProps {
  isOpen: boolean;
  onClose: () => void;
  onImportDone: () => void;
}

const TeamBulkImport: React.FC<TeamBulkImportProps> = ({ isOpen, onClose, onImportDone }) => {
  const [preview, setPreview] = useState<TeamMemberImport[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsParsing(true);
      try {
        const data = await parseTeamExcel(file);
        setPreview(data);
        toast.info(`${data.length} гишүүн олдлоо. Урьдчилж харна уу.`);
      } catch (err) {
        toast.error('Excel файл уншихад алдаа гарлаа.');
        console.error(err);
      } finally {
        setIsParsing(false);
      }
    }
  };

  const handleImport = async () => {
    if (preview.length === 0) return;
    setIsUploading(true);
    try {
      const res = await fetch(`${API_URL}/team/bulk-import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preview),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`${data.count} гишүүн амжилттай импортлогдлоо.`);
        onImportDone();
        onClose();
        setPreview([]);
      } else {
        throw new Error(data.message || 'Алдаа гарлаа');
      }
    } catch (err: any) {
      toast.error(`Импортлоход алдаа гарлаа: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const safeClose = () => {
    if (!isUploading && !isParsing) {
      onClose();
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Enter' && preview.length > 0 && !isUploading && !isParsing) {
        handleImport();
      }
      if (e.key === 'Escape') {
        safeClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, preview.length, isUploading, isParsing, handleImport, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={safeClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white w-full max-w-3xl rounded-sm shadow-2xl overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="text-green-600" size={20} />
                <h3 className="text-sm font-black uppercase tracking-tight">Excel Dynamic Import</h3>
              </div>
              <button 
                onClick={safeClose} 
                disabled={isUploading}
                className="p-1.5 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleImport(); }}>
              <div className="p-6 space-y-6">
                {!preview.length ? (
                  <div className="border-2 border-dashed border-gray-100 rounded-sm p-10 text-center space-y-4 hover:border-black transition-colors cursor-pointer relative">
                    <input
                      type="file" accept=".xlsx, .xls" onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
                      <FileSpreadsheet size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest">Excel файл сонгох</p>
                      <p className="text-[10px] text-gray-500 mt-1">Монгол эсвэл Англи баганын нэртэй файл байж болно</p>
                    </div>
                  </div>
                ) : (
                  <BulkImportPreview preview={preview} setPreview={setPreview} isUploading={isUploading} />
                )}

                <BulkImportInstructions />
              </div>

              <div className="p-4 bg-gray-50 border-t flex gap-3">
                <button 
                  type="button" 
                  onClick={safeClose} 
                  disabled={isUploading}
                  className="px-6 py-2 text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Цуцлах
                </button>
                <button
                  type="submit" disabled={!preview.length || isUploading || isParsing}
                  className="flex-1 bg-black text-white px-6 py-3 rounded-sm text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-50 transition-all"
                >
                  {isUploading ? (
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Check size={14} />
                  )}
                  {isUploading ? 'Google Translate орчуулж, хадгалж байна...' : `${preview.length} гишүүн хадгалах`}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TeamBulkImport;
