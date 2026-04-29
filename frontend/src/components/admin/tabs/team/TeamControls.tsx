import React from 'react';
import { motion } from 'motion/react';
import { Users, Sparkles, Plus, Trash2, Search, Filter } from 'lucide-react';

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
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="ХАЙХ..."
            value={teamSearch}
            onChange={(e) => setTeamSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/10 focus:border-black focus:outline-none transition-all text-xs font-bold uppercase tracking-widest rounded-sm"
          />
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={openImportModal}
            className="px-4 py-2.5 bg-gray-100 text-black rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <Sparkles size={14} /> Import
          </button>
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-black text-white rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Plus size={14} /> Нэмэх
          </button>
          {selectedTeamMembers.length > 0 && (
            <button
              onClick={handleBulkDeleteTeamMembers}
              className="px-4 py-2.5 bg-red-600 text-white rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash2 size={14} /> Устгах ({selectedTeamMembers.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamControls;
