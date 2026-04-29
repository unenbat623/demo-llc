import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Field, textareaClass } from '../../shared/AdminShared';

interface DetailedInfoSectionProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFormData: (updater: (prev: any) => any) => void;
}

// Reusable dynamic list field
const ListField = ({
  label,
  fieldName,
  placeholder,
  items,
  onAdd,
  onRemove,
}: {
  label: string;
  fieldName: string;
  placeholder: string;
  items: string[];
  onAdd: (field: string, value: string) => void;
  onRemove: (field: string, index: number) => void;
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

const DetailedInfoSection: React.FC<DetailedInfoSectionProps> = ({ formData, handleInputChange, setFormData }) => {
  // Parse comma/newline-joined strings into arrays for list fields
  const toArr = (val: string) => val ? val.split(/[\n,]/).map(s => s.trim()).filter(Boolean) : [];

  const handleAddItem = (field: string, value: string) => {
    setFormData((prev: any) => {
      const current = toArr(prev[field]);
      return { ...prev, [field]: [...current, value].join('\n') };
    });
  };

  const handleRemoveItem = (field: string, index: number) => {
    setFormData((prev: any) => {
      const current = toArr(prev[field]);
      current.splice(index, 1);
      return { ...prev, [field]: current.join('\n') };
    });
  };

  return (
    <div className="px-8 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">03</span>
        <div className="flex-1 h-px bg-black/8" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Дэлгэрэнгүй</span>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <Field label="Миний тухай">
            <textarea
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleInputChange}
              rows={3}
              placeholder="Өөрийнхөө тухай товч бичнэ үү..."
              className={textareaClass}
            />
          </Field>
          <Field label="About Me (EN)">
            <textarea
              name="aboutMe_en"
              value={formData.aboutMe_en}
              onChange={handleInputChange}
              rows={3}
              placeholder="Write a short bio in English..."
              className={textareaClass}
            />
          </Field>
          <Field label="Туршлага">
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              rows={3}
              placeholder="Ажлын туршлагаа дэлгэрэнгүй бичнэ үү..."
              className={textareaClass}
            />
          </Field>
          <Field label="Experience (EN)">
            <textarea
              name="experience_en"
              value={formData.experience_en}
              onChange={handleInputChange}
              rows={3}
              placeholder="Detail your work experience in English..."
              className={textareaClass}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 mt-5">
          <ListField
            label="Боловсрол"
            fieldName="education"
            placeholder="МУИС — Компьютерийн ухаан"
            items={toArr(formData.education)}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />
          <ListField
            label="Education (EN)"
            fieldName="education_en"
            placeholder="NUM — Computer Science"
            items={toArr(formData.education_en)}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />
          <ListField
            label="Гол төслүүд"
            fieldName="projects"
            placeholder="E-commerce платформ"
            items={toArr(formData.projects)}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />
          <ListField
            label="Projects (EN)"
            fieldName="projects_en"
            placeholder="E-commerce platform"
            items={toArr(formData.projects_en)}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />
          <ListField
            label="Амжилтууд"
            fieldName="achievements"
            placeholder="Хамгийн шилдэг ажилтан 2023"
            items={toArr(formData.achievements)}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />
          <ListField
            label="Achievements (EN)"
            fieldName="achievements_en"
            placeholder="Employee of the Year 2023"
            items={toArr(formData.achievements_en)}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailedInfoSection;
