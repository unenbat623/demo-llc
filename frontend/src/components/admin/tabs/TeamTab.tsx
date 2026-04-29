import React from 'react';
import TeamControls from './team/TeamControls';
import TeamTable from './team/TeamTable';
import { TeamMember } from '../../../types/admin';

interface TeamTabProps {
  teamSearch: string;
  setTeamSearch: (s: string) => void;
  openAddModal: () => void;
  filteredTeamMembers: TeamMember[];
  openEditModal: (member: TeamMember, focusTarget?: string) => void;
  confirmDelete: (member: TeamMember) => void;
  openImportModal: () => void;
  selectedTeamMembers: string[];
  setSelectedTeamMembers: React.Dispatch<React.SetStateAction<string[]>>;
  handleBulkDeleteTeamMembers: () => void;
}

const TeamTab: React.FC<TeamTabProps> = ({
  teamSearch,
  setTeamSearch,
  openAddModal,
  filteredTeamMembers,
  openEditModal,
  confirmDelete,
  openImportModal,
  selectedTeamMembers,
  setSelectedTeamMembers,
  handleBulkDeleteTeamMembers,
}) => {
  const allSelected =
    filteredTeamMembers.length > 0 && selectedTeamMembers.length === filteredTeamMembers.length;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedTeamMembers([]);
    } else {
      setSelectedTeamMembers(filteredTeamMembers.map((m) => m._id));
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedTeamMembers((prev) =>
      prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white p-8 border border-black/10 hover:border-black transition-colors duration-300">
      <TeamControls
        teamSearch={teamSearch}
        setTeamSearch={setTeamSearch}
        openAddModal={openAddModal}
        openImportModal={openImportModal}
        selectedTeamMembers={selectedTeamMembers}
        handleBulkDeleteTeamMembers={handleBulkDeleteTeamMembers}
      />
      <TeamTable
        filteredTeamMembers={filteredTeamMembers}
        selectedTeamMembers={selectedTeamMembers}
        toggleSelection={toggleSelection}
        allSelected={allSelected}
        handleSelectAll={handleSelectAll}
        openEditModal={openEditModal}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

export default TeamTab;
