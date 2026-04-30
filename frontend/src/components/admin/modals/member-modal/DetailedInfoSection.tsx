import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Field, textareaClass } from '../../shared/AdminShared';
import { ListField } from '../../shared/ListField';

interface DetailedInfoSectionProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFormData: (updater: (prev: any) => any) => void;
}



const DetailedInfoSection: React.FC<DetailedInfoSectionProps> = ({ formData, handleInputChange, setFormData }) => {
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
