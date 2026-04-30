import React from 'react';
import { AlertCircle } from 'lucide-react';

const BulkImportInstructions: React.FC = () => {
  return (
    <div className="bg-gray-50 p-4 border border-black/5 rounded-sm space-y-3">
      <div className="flex justify-between items-center text-black">
        <div className="flex gap-2 items-center">
          <AlertCircle size={14} />
          <p className="text-[10px] font-black uppercase tracking-widest">Excel-ийн бүтэц ба Санамж</p>
        </div>
        <span className="text-[8px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase tracking-widest">Powered by Google Translate</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Зөвшөөрөгдөх нэрс (Headers):</p>
          <div className="flex flex-wrap gap-1">
            {['Нэр', 'Албан тушаал', 'Имэйл', 'Ур чадвар', 'Туршлага', 'Боловсрол', 'Төслүүд', 'Амжилт'].map(h => (
              <span key={h} className="text-[8px] bg-white border border-black/5 px-1.5 py-0.5 rounded-sm font-bold">{h}</span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">English Headers:</p>
          <div className="flex flex-wrap gap-1">
            {['name', 'position', 'email', 'skills', 'experience', 'education', 'projects', 'achievements'].map(h => (
              <span key={h} className="text-[8px] bg-white border border-black/5 px-1.5 py-0.5 rounded-sm font-mono">{h}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-black/5 text-[9px] text-gray-400 italic space-y-1">
        <p>* skills, education, projects, achievements талбаруудыг таслалаар (,) зааглаж бичнэ үү.</p>
        <p className="text-blue-600 font-medium">* Систем автоматаар Google Translate ашиглан Монгол хэлнээс Англи руу хөрвүүлнэ.</p>
      </div>
    </div>
  );
};

export default BulkImportInstructions;
