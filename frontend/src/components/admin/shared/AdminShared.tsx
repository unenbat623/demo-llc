import React from 'react';

export const Field = ({
  label,
  hint,
  children,
  icon,
  full = false,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  full?: boolean;
}) => (
  <div className={full ? 'col-span-1 sm:col-span-2' : ''}>
    <div className="flex items-baseline justify-between mb-2">
      <div className="flex items-center gap-2">
        {icon}
        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">{label}</label>
      </div>
      {hint && <span className="text-[10px] text-gray-400">{hint}</span>}
    </div>
    {children}
  </div>
);

export const inputClass = "w-full bg-gray-50/50 border-0 border-b-2 border-gray-100 px-4 py-3 text-sm font-bold focus:border-black focus:bg-white focus:outline-none transition-all duration-300 placeholder:text-gray-300 placeholder:font-normal";
export const textareaClass = "w-full bg-gray-50/50 border-0 border-b-2 border-gray-100 px-4 py-3 text-sm font-bold focus:border-black focus:bg-white focus:outline-none transition-all duration-300 placeholder:text-gray-300 placeholder:font-normal resize-none";

export const getSkillIcon = (skill: string) => {
  const s = skill.toLowerCase().trim();
  if (s.includes('graphql')) return 'https://cdn.simpleicons.org/graphql/E10098';
  if (s.includes('mysql')) return 'https://cdn.simpleicons.org/mysql/4479A1';
  if (s.includes('postgre')) return 'https://cdn.simpleicons.org/postgresql/4169E1';
  if (s.includes('mongo')) return 'https://cdn.simpleicons.org/mongodb/47A248';
  if (s.includes('aws')) return 'https://cdn.simpleicons.org/amazonwebservices/232F3E';
  if (s.includes('c++') || s.includes('cpp')) return 'https://cdn.simpleicons.org/cplusplus/00599C';
  if (s.includes('react')) return 'https://cdn.simpleicons.org/react/61DAFB';
  if (s.includes('typescript') || s.includes('ts')) return 'https://cdn.simpleicons.org/typescript/3178C6';
  if (s.includes('node')) return 'https://cdn.simpleicons.org/nodedotjs/339933';
  if (s.includes('python')) return 'https://cdn.simpleicons.org/python/3776AB';
  if (s.includes('docker')) return 'https://cdn.simpleicons.org/docker/2496ED';
  if (s.includes('kubernetes') || s.includes('k8s')) return 'https://cdn.simpleicons.org/kubernetes/326CE5';
  if (s.includes('figma')) return 'https://cdn.simpleicons.org/figma/F24E1E';
  if (s.includes('javascript') || s.includes('js')) return 'https://cdn.simpleicons.org/javascript/F7DF1E';
  if (s.includes('tailwind')) return 'https://cdn.simpleicons.org/tailwindcss/06B6D4';
  if (s.includes('next')) return 'https://cdn.simpleicons.org/nextdotjs/000000';
  return null;
};
