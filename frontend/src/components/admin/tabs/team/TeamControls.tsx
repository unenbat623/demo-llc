import React from 'react';
import { motion } from 'motion/react';
import { Users, Sparkles, Plus, Trash2 } from 'lucide-react';

interface TeamControlsProps {
  teamSearch: string;
  setTeamSearch: (s: string) => void;
  openAddModal: () => void;
  openImportModal: () => void;
  selectedTeamMembers: string[];
  handleBulkDeleteTeamMembers: () => void;
}

const TeamControls: React.FC<TeamControlsProps> = ({
  teamSearch,
  setTeamSearch,
  openAddModal,
  openImportModal,
  selectedTeamMembers,
  handleBulkDeleteTeamMembers,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em]">Багийн гишүүд</h3>
        <p className="text-gray-600 mt-1">Энд багийн гишүүдийн жагсаалт харагдана.</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center w-full md:w-auto">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="ГИШҮҮДЭЭС ХАЙХ..."
              value={teamSearch}
              onChange={(e) => setTeamSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-black/5 focus:border-black focus:outline-none transition-all duration-300 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:border-black/20"
            />
            <Users size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-3">

            <button
              onClick={openImportModal}
              className="bg-green-600 text-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-green-700 transition-colors rounded-sm"
            >
              <Sparkles size={14} /> <span className="hidden xs:inline">Import</span>
            </button>
            <button
              onClick={openAddModal}
              className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-gray-800 transition-colors rounded-sm"
            >
              <Plus size={14} /> <span className="hidden xs:inline">Нэмэх</span>
            </button>
            {selectedTeamMembers.length > 0 && (
              <button
                onClick={handleBulkDeleteTeamMembers}
                className="bg-red-600 text-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-red-700 transition-colors rounded-sm"
              >
                <Trash2 size={14} /> <span className="hidden xs:inline">Устгах ({selectedTeamMembers.length})</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeamControls;
