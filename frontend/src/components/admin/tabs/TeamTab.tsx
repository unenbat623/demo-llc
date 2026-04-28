import React from 'react';
import { motion } from 'motion/react';
import { Users, Sparkles, Plus, Edit2, Trash2 } from 'lucide-react';
import { getSkillIcon } from '../shared/AdminShared';

interface TeamTabProps {
  teamSearch: string;
  setTeamSearch: (s: string) => void;
  generateCount: number;
  setGenerateCount: (n: number) => void;
  isGeneratingTeam: boolean;
  handleGenerateMembers: () => void;
  openAddModal: () => void;
  generateStatus: { type: string, message: string };
  filteredTeamMembers: any[];
  openEditModal: (member: any, focusTarget?: string) => void;
  confirmDelete: (member: any) => void;
}

const TeamTab: React.FC<TeamTabProps> = ({
  teamSearch,
  setTeamSearch,
  generateCount,
  setGenerateCount,
  isGeneratingTeam,
  handleGenerateMembers,
  openAddModal,
  generateStatus,
  filteredTeamMembers,
  openEditModal,
  confirmDelete
}) => {
  return (
    <div className="bg-white p-8 border border-black/10 hover:border-black transition-colors duration-300">
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
              <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 border border-gray-100 rounded-sm">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={generateCount}
                  onChange={(e) => setGenerateCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 5)))}
                  className="w-12 bg-transparent text-center text-xs font-bold focus:outline-none"
                  disabled={isGeneratingTeam}
                />
                <button
                  onClick={handleGenerateMembers}
                  disabled={isGeneratingTeam}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-1.5 rounded-sm transition-colors disabled:opacity-50"
                  title="Олноор үүсгэх"
                >
                  <Sparkles size={14} className={isGeneratingTeam ? 'animate-pulse' : ''} />
                </button>
              </div>
              <button
                onClick={openAddModal}
                className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-gray-800 transition-colors rounded-sm"
              >
                <Plus size={14} /> <span className="hidden xs:inline">Нэмэх</span>
              </button>
            </div>
          </div>
          {generateStatus.message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-3 text-xs font-bold rounded-sm ${generateStatus.type === 'success'
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-red-100 text-red-700 border border-red-200'
                }`}
            >
              {generateStatus.message}
            </motion.div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black/10 text-xs font-bold uppercase tracking-wider text-gray-500">
              <th className="py-3 px-4">Зураг</th>
              <th className="py-3 px-4">Нэр</th>
              <th className="py-3 px-4 hidden md:table-cell">Албан тушаал</th>
              <th className="py-3 px-4 hidden lg:table-cell">Ур чадвар</th>
              <th className="py-3 px-4 text-right">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeamMembers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500 text-sm">Хэрэглэгч олдсонгүй</td>
              </tr>
            ) : (
              filteredTeamMembers.map((member, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={member._id} 
                  className="border-b border-black/5 hover:bg-gray-50/80 transition-colors group/row"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={member.image} alt={member.name} className="w-10 h-10 object-cover rounded-sm grayscale flex-shrink-0" />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-sm leading-tight">{member.name}</div>
                    <div className="md:hidden text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{member.position}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-sm hidden md:table-cell">{member.position}</td>
                  <td 
                    className="py-3 px-4 hidden lg:table-cell cursor-pointer group/skills"
                    onClick={() => openEditModal(member, 'skills')}
                    title="Ур чадвар засах"
                  >
                    <div className="flex flex-wrap gap-1.5 max-w-[300px] group-hover/skills:scale-[1.02] transition-transform">
                      {(member.skills || []).slice(0, 3).map((skill: string, idx: number) => {
                        const icon = getSkillIcon(skill);
                        return (
                          <div key={idx} className="flex items-center gap-1.5 bg-[#0a0c10] border border-white/10 px-2 py-1 rounded-full">
                            {icon && <img src={icon} alt={skill} className="w-3 h-3 invert opacity-60" />}
                            <span className="text-[9px] font-black text-white/80 uppercase tracking-wider">{skill}</span>
                          </div>
                        );
                      })}
                      {member.skills && member.skills.length > 3 && (
                        <span className="text-[9px] font-black text-gray-400 self-center">+{member.skills.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2 sm:gap-3">
                      <button
                        onClick={() => openEditModal(member)}
                        className="group flex items-center justify-center sm:justify-start gap-2 p-2 sm:px-4 sm:py-2 bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-sm"
                        title="Засах"
                      >
                        <Edit2 size={12} className="group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:inline">Засах</span>
                      </button>
                      <button
                        onClick={() => confirmDelete(member)}
                        className="group flex items-center justify-center sm:justify-start gap-2 p-2 sm:px-4 sm:py-2 border border-black/10 text-gray-400 hover:text-red-600 hover:border-red-500 hover:bg-red-50/50 transition-all duration-300 rounded-sm"
                        title="Устгах"
                      >
                        <Trash2 size={12} className="group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:inline">Устгах</span>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamTab;
