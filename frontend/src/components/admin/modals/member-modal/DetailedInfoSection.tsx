import React from 'react';
import { Field, textareaClass, inputClass } from '../../shared/AdminShared';

interface DetailedInfoSectionProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const DetailedInfoSection: React.FC<DetailedInfoSectionProps> = ({ formData, handleInputChange }) => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mt-5">
          <Field label="Боловсрол" hint="Таслалаар тусгаарлах">
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              placeholder="МУИС — Компьютерийн ухаан"
              className={inputClass}
            />
          </Field>
          <Field label="Education (EN)" hint="Comma separated">
            <input
              type="text"
              name="education_en"
              value={formData.education_en}
              onChange={handleInputChange}
              placeholder="NUM — Computer Science"
              className={inputClass}
            />
          </Field>
          <Field label="Гол төслүүд" hint="Таслалаар тусгаарлах">
            <input
              type="text"
              name="projects"
              value={formData.projects}
              onChange={handleInputChange}
              placeholder="E-commerce платформ, HR систем"
              className={inputClass}
            />
          </Field>
          <Field label="Projects (EN)" hint="Comma separated">
            <input
              type="text"
              name="projects_en"
              value={formData.projects_en}
              onChange={handleInputChange}
              placeholder="E-commerce platform, HR system"
              className={inputClass}
            />
          </Field>
          <Field label="Амжилтууд" hint="Таслалаар тусгаарлах">
            <input
              type="text"
              name="achievements"
              value={formData.achievements}
              onChange={handleInputChange}
              placeholder="Хамгийн шилдэг ажилтан 2023"
              className={inputClass}
            />
          </Field>
          <Field label="Achievements (EN)" hint="Comma separated">
            <input
              type="text"
              name="achievements_en"
              value={formData.achievements_en}
              onChange={handleInputChange}
              placeholder="Employee of the Year 2023"
              className={inputClass}
            />
          </Field>
        </div>
      </div>
    </div>
  );
};

export default DetailedInfoSection;
