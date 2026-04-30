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
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(50);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filteredTeamMembers.length, itemsPerPage]);


  React.useEffect(() => {
    const nextItems = filteredTeamMembers.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
    nextItems.forEach(item => {
      if (item.image) {
        const img = new Image();
        img.src = item.image;
      }
    });
  }, [currentPage, filteredTeamMembers, itemsPerPage]);

  const totalPages = Math.ceil(filteredTeamMembers.length / itemsPerPage) || 1;
  const currentItems = filteredTeamMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="bg-white border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <TableHeader allSelected={allSelected} handleSelectAll={handleSelectAll} />
          <tbody className="divide-y divide-gray-100">
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400 text-sm font-semibold uppercase tracking-widest bg-gray-50/50">
                  Мэдээлэл олдсонгүй
                </td>
              </tr>
            ) : (
              currentItems.map((member, idx) => (
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

      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50/50 gap-4">
        <div className="flex items-center gap-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Нийт <span className="text-black font-bold">{filteredTeamMembers.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Нэг хуудсанд:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="bg-white border border-gray-200 text-xs font-bold text-black py-1 px-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={500}>500</option>
            </select>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-200 bg-white text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-all text-xs font-bold uppercase tracking-widest"
            >
              Өмнөх
            </button>
            
            <div className="hidden sm:flex items-center gap-1 mx-2">
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-2 text-gray-400 font-bold text-xs">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page as number)}
                      className={`min-w-[32px] h-8 flex items-center justify-center text-xs font-bold transition-all border ${
                        currentPage === page
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black'
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border border-gray-200 bg-white text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-all text-xs font-bold uppercase tracking-widest"
            >
              Дараах
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamTable;
