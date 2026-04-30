import React, { useState, useRef } from 'react';
import { Field, inputClass, getSkillIcon } from '../../shared/AdminShared';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface BasicInfoSectionProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFormData: (updater: (prev: any) => any) => void;
  activeLang: 'mn' | 'en';
}

const SKILL_SUGGESTIONS = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Vue', 'Next.js',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'AWS', 'Figma',
  'Flutter', 'Swift', 'Kotlin', 'Java', 'C#', 'C++', 'Go', 'Rust',
  'Angular', 'Django', 'Laravel', 'Spring', 'GraphQL', 'Firebase', 'Git',
  'GitHub', 'Kubernetes', 'Linux', 'PHP', 'Unity', 'Blender'
];

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ formData, handleInputChange, setFormData, activeLang }) => {
  const [skillInput, setSkillInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentSkills: string[] = formData.skills
    ? formData.skills.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '')
    : [];

  const filteredSuggestions = SKILL_SUGGESTIONS.filter(
    s => s.toLowerCase().includes(skillInput.toLowerCase()) && !currentSkills.includes(s)
  );

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || currentSkills.includes(trimmed)) { setSkillInput(''); return; }
    setFormData((prev: any) => ({
      ...prev,
      skills: [...currentSkills, trimmed].join(', ')
    }));
    setSkillInput('');
    setShowSuggestions(false);
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev: any) => ({
      ...prev,
      skills: currentSkills.filter((s: string) => s !== skillToRemove).join(', ')
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (skillInput.trim()) addSkill(skillInput);
    } else if (e.key === 'Backspace' && !skillInput && currentSkills.length > 0) {
      removeSkill(currentSkills[currentSkills.length - 1]);
    }
  };

  return (
    <div className="px-8 pt-8 pb-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">01</span>
        <div className="flex-1 h-px bg-black/8" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Үндсэн мэдээлэл</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        <Field label={activeLang === 'mn' ? "Нэр" : "Name (EN)"}>
          <input 
            type="text" 
            name={activeLang === 'mn' ? "name" : "name_en"} 
            value={activeLang === 'mn' ? formData.name : formData.name_en} 
            onChange={handleInputChange} 
            required={activeLang === 'mn'} 
            placeholder={activeLang === 'mn' ? "Бат-Эрдэнэ Дорж" : (formData.name || "Bat-Erdene Dorj")} 
            className={inputClass} 
          />
        </Field>
        <Field label={activeLang === 'mn' ? "Албан тушаал" : "Position (EN)"}>
          <input 
            type="text" 
            name={activeLang === 'mn' ? "position" : "position_en"} 
            value={activeLang === 'mn' ? formData.position : formData.position_en} 
            onChange={handleInputChange} 
            required={activeLang === 'mn'} 
            placeholder={activeLang === 'mn' ? "Ахлах инженер" : (formData.position || "Senior Engineer")} 
            className={inputClass} 
          />
        </Field>
        <Field label="И-мэйл">
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@company.mn" className={inputClass} />
        </Field>
        <Field label="LinkedIn">
          <input type="text" name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="https://linkedin.com/in/..." className={inputClass} />
        </Field>

        <Field label="Ур чадварууд" hint="Enter эсвэл таслал дарж нэмэх" full>
          <div
            className="min-h-[44px] flex flex-wrap gap-2 p-2 border border-black/10 focus-within:border-black transition-all duration-200 rounded-sm cursor-text bg-white"
            onClick={() => inputRef.current?.focus()}
          >
            <AnimatePresence mode="popLayout">
              {currentSkills.map((skill: string) => {
                const icon = getSkillIcon(skill);
                return (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    className="flex items-center gap-1.5 bg-black text-white pl-2 pr-1.5 py-1 rounded-sm group"
                  >
                    {icon ? (
                      <img
                        src={icon}
                        alt={skill}
                        className="w-3 h-3 invert opacity-80"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-1 h-1 rounded-full bg-white/50" />
                    )}
                    <span className="text-[10px] font-black uppercase tracking-widest">{skill}</span>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeSkill(skill); }}
                      className="ml-0.5 text-white/50 hover:text-white transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <div className="relative flex-1 min-w-[120px]">
              <input
                ref={inputRef}
                type="text"
                value={skillInput}
                onChange={(e) => { setSkillInput(e.target.value); setShowSuggestions(true); }}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                placeholder={currentSkills.length === 0 ? "React, Python, Figma ..." : ''}
                className="w-full bg-transparent text-xs font-medium focus:outline-none py-1 px-1 placeholder:text-gray-300"
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-black/10 shadow-xl rounded-sm max-h-48 overflow-y-auto w-56">
                  {filteredSuggestions.slice(0, 10).map((suggestion) => {
                    const icon = getSkillIcon(suggestion);
                    return (
                      <button
                        key={suggestion}
                        type="button"
                        onMouseDown={() => addSkill(suggestion)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                      >
                        {icon ? (
                          <img
                            src={icon}
                            alt={suggestion}
                            className="w-4 h-4"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-4 h-4 rounded-sm bg-gray-200 flex items-center justify-center">
                            <span className="text-[8px] font-black text-gray-500">{suggestion.slice(0, 2).toUpperCase()}</span>
                          </div>
                        )}
                        <span className="text-xs font-bold text-black">{suggestion}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </Field>
      </div>
    </div>
  );
};

export default BasicInfoSection;
