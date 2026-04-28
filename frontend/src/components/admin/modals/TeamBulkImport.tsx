import React, { useState } from 'react';
import { parseTeamExcel, TeamMemberImport } from '../../../utils/parseTeamExcel';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileSpreadsheet, Check, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

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
      const res = await fetch('http://localhost:5001/api/team/bulk-import', {
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
      setIsUploading(true);
      setIsUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="text-green-600" />
                <h3 className="text-lg font-black uppercase tracking-tighter">Excel Bulk Import</h3>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleImport(); }}>
              <div className="p-8 space-y-6">
                {!preview.length ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-sm p-12 text-center space-y-4 hover:border-black transition-colors cursor-pointer relative">
                    <input
                      type="file" accept=".xlsx, .xls" onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                      <FileSpreadsheet size={32} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider">Excel файл сонгох</p>
                      <p className="text-xs text-gray-500 mt-1">.xlsx эсвэл .xls форматтай файл оруулна уу</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Урьдчилсан харагдац ({preview.length})</p>
                      <button type="button" onClick={() => setPreview([])} className="text-[10px] font-black uppercase text-red-500 hover:underline">Файл солих</button>
                    </div>
                    <div className="max-h-60 overflow-y-auto border border-gray-100 rounded-sm">
                      <table className="w-full text-left text-[11px] border-collapse">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr className="border-b border-gray-100">
                            <th className="p-3 font-black uppercase tracking-wider">Нэр</th>
                            <th className="p-3 font-black uppercase tracking-wider">Албан тушаал</th>
                            <th className="p-3 font-black uppercase tracking-wider">И-мэйл</th>
                          </tr>
                        </thead>
                        <tbody>
                          {preview.map((item, i) => (
                            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                              <td className="p-3 font-medium">{item.name}</td>
                              <td className="p-3 text-gray-600">{item.position}</td>
                              <td className="p-3 text-gray-400">{item.email || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-sm flex gap-3 items-start">
                  <AlertCircle className="text-blue-600 flex-shrink-0" size={18} />
                  <div className="text-[10px] text-blue-800 leading-relaxed font-medium">
                    <p className="font-bold uppercase tracking-wider mb-1">Санамж:</p>
                    <p className="mb-1">Excel файлын баганын нэрнүүд (Case-sensitive):</p>
                    <div className="flex flex-wrap gap-1 font-mono text-[9px]">
                      {['name', 'position', 'image', 'email', 'linkedin', 'skills', 'aboutMe', 'experience', 'education', 'projects', 'achievements'].map(field => (
                        <span key={field} className="bg-blue-100 px-1.5 py-0.5 rounded-sm">{field}</span>
                      ))}
                    </div>
                    <p className="mt-2 text-blue-600/70 italic">* skills, education, projects, achievements талбаруудыг таслалаар (,) зааглаж бичнэ үү.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t flex gap-4">
                <button type="button" onClick={onClose} className="flex-1 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">Цуцлах</button>
                <button
                  type="submit" disabled={!preview.length || isUploading || isParsing}
                  className="flex-[2] bg-black text-white px-6 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-50 transition-all"
                >
                  {isUploading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Check size={16} />
                  )}
                  {isUploading ? 'Импортлож байна...' : `${preview.length} гишүүн хадгалах`}
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
