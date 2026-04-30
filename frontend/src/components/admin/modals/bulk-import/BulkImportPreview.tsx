import React from 'react';
import { TeamMemberImport } from '../../../../utils/parseTeamExcel';

interface BulkImportPreviewProps {
  preview: TeamMemberImport[];
  setPreview: (data: TeamMemberImport[]) => void;
  isUploading: boolean;
}

const BulkImportPreview: React.FC<BulkImportPreviewProps> = ({ preview, setPreview, isUploading }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Урьдчилсан харагдац ({preview.length} мөр)</p>
        <button 
          type="button" 
          onClick={() => setPreview([])} 
          disabled={isUploading}
          className="text-[9px] font-black uppercase text-red-500 hover:underline disabled:opacity-30 disabled:cursor-not-allowed disabled:no-underline"
        >
          Файл солих
        </button>
      </div>
      <div className="max-h-60 overflow-y-auto overflow-x-auto border border-black/5 rounded-sm">
        <table className="w-full text-left text-[10px] border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="border-b border-black/5">
              <th className="p-2 font-black uppercase tracking-wider">Нэр</th>
              <th className="p-2 font-black uppercase tracking-wider">Албан тушаал</th>
              <th className="p-2 font-black uppercase tracking-wider">Ур чадвар / Бусад</th>
            </tr>
          </thead>
          <tbody>
            {preview.map((item, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="p-2 font-bold uppercase truncate max-w-[150px]">{item.name}</td>
                <td className="p-2 text-gray-600 truncate max-w-[150px]">{item.position}</td>
                <td className="p-2 text-gray-400">
                  <div className="flex flex-wrap gap-1">
                    {item.email && <span className="bg-gray-100 px-1 rounded-sm">Email</span>}
                    {item.skills && <span className="bg-blue-50 text-blue-600 px-1 rounded-sm">Skills</span>}
                    {item.experience && <span className="bg-green-50 text-green-600 px-1 rounded-sm">Exp</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BulkImportPreview;
