import React from 'react';
import { Field, inputClass, getSkillIcon } from '../../shared/AdminShared';

interface BasicInfoSectionProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  skillsInputRef: React.RefObject<HTMLInputElement>;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ formData, handleInputChange, skillsInputRef }) => {
  return (
    <div className="px-8 pt-8 pb-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">01</span>
        <div className="flex-1 h-px bg-black/8" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Үндсэн мэдээлэл</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        <Field label="Нэр">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Бат-Эрдэнэ Дорж"
            className={inputClass}
          />
        </Field>
        <Field label="Name (EN)">
          <input
            type="text"
            name="name_en"
            value={formData.name_en}
            onChange={handleInputChange}
            placeholder="Bat-Erdene Dorj"
            className={inputClass}
          />
        </Field>
        <Field label="Албан тушаал">
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            required
            placeholder="Ахлах инженер"
            className={inputClass}
          />
        </Field>
        <Field label="Position (EN)">
          <input
            type="text"
            name="position_en"
            value={formData.position_en}
            onChange={handleInputChange}
            placeholder="Senior Engineer"
            className={inputClass}
          />
        </Field>
        <Field label="И-мэйл">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="name@company.mn"
            className={inputClass}
          />
        </Field>
        <Field label="LinkedIn">
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            placeholder="https://linkedin.com/in/..."
            className={inputClass}
          />
        </Field>
        <Field label="Ур чадварууд" hint="Таслалаар тусгаарлах" full>
          <input
            ref={skillsInputRef}
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            placeholder="GraphQL, MySQL, PostgreSQL, MongoDB, C++, AWS"
            className={inputClass}
          />
          <div className="flex flex-wrap gap-2 mt-4">
            {formData.skills.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '').map((skill: string, idx: number) => {
              const icon = getSkillIcon(skill);
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-1 rounded-sm"
                >
                  {icon ? (
                    <img src={icon} alt={skill} className="w-3 h-3 opacity-60" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  )}
                  <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider">{skill}</span>
                </div>
              );
            })}
          </div>
        </Field>
      </div>
    </div>
  );
};

export default BasicInfoSection;
