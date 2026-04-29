import React from 'react';

interface TableHeaderProps {
  allSelected: boolean;
  handleSelectAll: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ allSelected, handleSelectAll }) => {
  return (
    <thead>
      <tr className="border-b border-black/10 text-xs font-bold uppercase tracking-wider text-gray-500">
        <th className="py-3 px-4 w-12">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAll}
            className="w-4 h-4 accent-black cursor-pointer"
          />
        </th>
        <th className="py-3 px-4">Зураг</th>
        <th className="py-3 px-4">Нэр</th>
        <th className="py-3 px-4 hidden md:table-cell">Албан тушаал</th>
        <th className="py-3 px-4 hidden lg:table-cell">Ур чадвар</th>
        <th className="py-3 px-4 text-right">Үйлдэл</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
