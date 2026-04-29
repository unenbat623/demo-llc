import React from 'react';
import TableHeader from './table/TableHeader';
import TableRow from './table/TableRow';
import { TeamMember } from '../../../../types/admin';

interface TeamTableProps {
  filteredTeamMembers: TeamMember[];
  selectedTeamMembers: string[];
  toggleSelection: (id: string) => void;
  allSelected: boolean;
  handleSelectAll: () => void;
  openEditModal: (member: TeamMember, focusTarget?: string) => void;
  confirmDelete: (member: TeamMember) => void;
}

const TeamTable: React.FC<TeamTableProps> = ({
  filteredTeamMembers,
  selectedTeamMembers,
  toggleSelection,
  allSelected,
  handleSelectAll,
  openEditModal,
  confirmDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <TableHeader allSelected={allSelected} handleSelectAll={handleSelectAll} />
        <tbody>
          {filteredTeamMembers.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-8 text-center text-gray-500 text-sm font-bold uppercase tracking-widest">
                Хэрэглэгч олдсонгүй
              </td>
            </tr>
          ) : (
            filteredTeamMembers.map((member, idx) => (
              <TableRow
                key={member._id}
                member={member}
                index={idx}
                selected={selectedTeamMembers.includes(member._id)}
                onToggle={() => toggleSelection(member._id)}
                onEdit={openEditModal}
                onDelete={confirmDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
