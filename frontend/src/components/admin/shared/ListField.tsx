import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface ListFieldProps {
  label: string;
  fieldName: string;
  placeholder: string;
  items: string[];
  onAdd: (field: string, value: string) => void;
  onRemove: (field: string, index: number) => void;
}

export const ListField: React.FC<ListFieldProps> = ({
  label,
  fieldName,
  placeholder,
  items,
  onAdd,
  onRemove,
}) => {
  const [inputVal, setInputVal] = useState('');

  const handleAdd = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    onAdd(fieldName, trimmed);
    setInputVal('');
  };

  return (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 mb-2">{label}</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 text-xs font-medium border border-black/10 focus:border-black focus:outline-none rounded-sm transition-all"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-2 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors flex-shrink-0"
        >
          <Plus size={14} />
        </button>
      </div>
      {items.length > 0 && (
        <ul className="space-y-1.5">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-2 bg-gray-50 border border-black/5 px-3 py-1.5 rounded-sm group"
            >
              <span className="flex-1 text-xs font-medium text-gray-700 leading-snug">{item}</span>
              <button
                type="button"
                onClick={() => onRemove(fieldName, i)}
                className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
              >
                <X size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
