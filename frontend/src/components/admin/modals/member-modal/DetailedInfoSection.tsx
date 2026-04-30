import React from 'react';
import { Field, textareaClass } from '../../shared/AdminShared';
import { ListField } from '../../shared/ListField';

interface DetailedInfoSectionProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFormData: (updater: (prev: any) => any) => void;
  activeLang: 'mn' | 'en';
}

const DetailedInfoSection: React.FC<DetailedInfoSectionProps> = ({ formData, handleInputChange, setFormData, activeLang }) => {
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
          <Field label={activeLang === 'mn' ? "Миний тухай" : "About Me (EN)"}>
            <textarea
              name={activeLang === 'mn' ? "aboutMe" : "aboutMe_en"}
              value={activeLang === 'mn' ? formData.aboutMe : formData.aboutMe_en}
              onChange={handleInputChange}
              rows={3}
              placeholder={activeLang === 'mn' ? "Өөрийнхөө тухай товч бичнэ үү..." : (formData.aboutMe || "Write a short bio in English...")}
              className={textareaClass}
            />
          </Field>
          <Field label={activeLang === 'mn' ? "Туршлага" : "Experience (EN)"}>
            <textarea
              name={activeLang === 'mn' ? "experience" : "experience_en"}
              value={activeLang === 'mn' ? formData.experience : formData.experience_en}
              onChange={handleInputChange}
              rows={3}
              placeholder={activeLang === 'mn' ? "Ажлын туршлагаа дэлгэрэнгүй бичнэ үү..." : (formData.experience || "Detail your work experience in English...")}
              className={textareaClass}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 mt-5">
          <ListField
            label={activeLang === 'mn' ? "Боловсрол" : "Education (EN)"}
            fieldName={activeLang === 'mn' ? "education" : "education_en"}
            placeholder={activeLang === 'mn' ? "МУИС — Компьютерийн ухаан" : "NUM — Computer Science"}
            items={toArr(activeLang === 'mn' ? formData.education : formData.education_en)}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />
          <ListField
            label={activeLang === 'mn' ? "Төслүүд" : "Projects (EN)"}
            fieldName={activeLang === 'mn' ? "projects" : "projects_en"}
            placeholder={activeLang === 'mn' ? "ERP систем" : "ERP System"}
            items={toArr(activeLang === 'mn' ? formData.projects : formData.projects_en)}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />
          <ListField
            label={activeLang === 'mn' ? "Амжилтууд" : "Achievements (EN)"}
            fieldName={activeLang === 'mn' ? "achievements" : "achievements_en"}
            placeholder={activeLang === 'mn' ? "Шилдэг ажилтан 2023" : "Best Employee 2023"}
            items={toArr(activeLang === 'mn' ? formData.achievements : formData.achievements_en)}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailedInfoSection;
