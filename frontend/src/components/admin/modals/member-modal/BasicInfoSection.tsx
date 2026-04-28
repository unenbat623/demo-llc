import React from 'react';
import { Field, inputClass, getSkillIcon } from '../../shared/AdminShared';
import { motion, AnimatePresence } from 'motion/react';

interface BasicInfoSectionProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  skillsInputRef: React.RefObject<HTMLInputElement>;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ formData, handleInputChange, skillsInputRef }) => {
  const currentSkills = formData.skills.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '');

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
          <div className="relative group">
            <input
              ref={skillsInputRef}
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="GraphQL, MySQL, PostgreSQL, MongoDB, C++, AWS"
              className={`${inputClass} transition-all duration-300 group-hover:border-black/30`}
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-4 min-h-[28px]">
            <AnimatePresence mode="popLayout">
              {currentSkills.map((skill: string, idx: number) => {
                const icon = getSkillIcon(skill);
                return (
                  <motion.div
                    key={skill + idx}
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 10 }}
                    whileHover={{ scale: 1.05, borderColor: 'rgba(0,0,0,0.2)', backgroundColor: 'rgba(0,0,0,0.03)' }}
                    className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-sm transition-colors cursor-default"
                  >
                    {icon ? (
                      <img src={icon} alt={skill} className="w-3.5 h-3.5 opacity-60 grayscale group-hover:grayscale-0 transition-all" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                    )}
                    <span className="text-[9px] font-black text-black/60 uppercase tracking-widest">{skill}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </Field>
      </div>
    </div>
  );
};

export default BasicInfoSection;
