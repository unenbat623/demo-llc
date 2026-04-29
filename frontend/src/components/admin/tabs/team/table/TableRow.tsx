import React from 'react';
import { motion } from 'motion/react';
import { Edit2, Trash2 } from 'lucide-react';
import { getSkillIcon } from '../../../shared/AdminShared';
import { TeamMember } from '../../../../../types/admin';

interface TableRowProps {
  member: TeamMember;
  index: number;
  selected: boolean;
  onToggle: () => void;
  onEdit: (member: TeamMember, focusTarget?: string) => void;
  onDelete: (member: TeamMember) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  member,
  index,
  selected,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`border-b border-black/5 hover:bg-gray-50/80 transition-colors group/row ${
        selected ? 'bg-gray-50/80' : ''
      }`}
    >
      <td className="py-3 px-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="w-4 h-4 accent-black cursor-pointer"
        />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <img
            src={member.image}
            alt={member.name}
            className="w-10 h-10 object-cover rounded-sm grayscale flex-shrink-0"
          />
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="font-bold text-sm leading-tight">{member.name}</div>
        <div className="md:hidden text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">
          {member.position}
        </div>
      </td>
      <td className="py-3 px-4 text-gray-600 text-sm hidden md:table-cell">
        {member.position}
      </td>
      <td
        className="py-3 px-4 hidden lg:table-cell cursor-pointer group/skills"
        onClick={() => onEdit(member, 'skills')}
        title="Ур чадвар засах"
      >
        <div className="flex flex-wrap gap-1.5 max-w-[300px] group-hover/skills:scale-[1.02] transition-transform">
          {(member.skills || []).slice(0, 3).map((skill: string, idx: number) => {
            const icon = getSkillIcon(skill);
            return (
              <div
                key={idx}
                className="flex items-center gap-1.5 bg-[#0a0c10] border border-white/10 px-2 py-1 rounded-full"
              >
                <img
                  src={icon}
                  alt={skill}
                  className="w-3 h-3 invert opacity-60"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      skill
                    )}&background=random&color=fff&rounded=true&font-size=0.5`;
                    e.currentTarget.classList.remove('invert');
                    e.currentTarget.classList.remove('opacity-60');
                  }}
                />
                <span className="text-[9px] font-black text-white/80 uppercase tracking-wider">
                  {skill}
                </span>
              </div>
            );
          })}
          {member.skills && member.skills.length > 3 && (
            <span className="text-[9px] font-black text-gray-400 self-center">
              +{member.skills.length - 3}
            </span>
          )}
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex justify-end gap-2 sm:gap-3">
          <button
            onClick={() => onEdit(member)}
            className="group flex items-center justify-center sm:justify-start gap-2 p-2 sm:px-4 sm:py-2 bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-sm"
            title="Засах"
          >
            <Edit2 size={12} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:inline">
              Засах
            </span>
          </button>
          <button
            onClick={() => onDelete(member)}
            className="group flex items-center justify-center sm:justify-start gap-2 p-2 sm:px-4 sm:py-2 border border-black/10 text-gray-400 hover:text-red-600 hover:border-red-500 hover:bg-red-50/50 transition-all duration-300 rounded-sm"
            title="Устгах"
          >
            <Trash2 size={12} className="group-hover:scale-110 transition-transform duration-300" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:inline">
              Устгах
            </span>
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default TableRow;
