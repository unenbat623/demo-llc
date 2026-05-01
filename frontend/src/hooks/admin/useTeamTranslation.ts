import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../services/api';

export const useTeamTranslation = (formData: any, setFormData: React.Dispatch<React.SetStateAction<any>>) => {
  const [isTranslating, setIsTranslating] = useState(false);

  const handleAutoTranslate = async () => {
    setIsTranslating(true);
    const fieldsToTranslate = {
      name_en: formData.name || null,
      position_en: formData.position || null,
      aboutMe_en: formData.aboutMe || null,
      experience_en: formData.experience || null,
      education_en: formData.education || null,
      projects_en: formData.projects || null,
      achievements_en: formData.achievements || null
    };

    const payload: Record<string, string> = {};
    Object.entries(fieldsToTranslate).forEach(([key, val]) => {
      if (val) payload[key] = val;
    });

    if (Object.keys(payload).length === 0) {
      toast.info('Орчуулах мэдээлэл алга байна');
      setIsTranslating(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts: payload })
      });
      if (!res.ok) throw new Error('Орчуулахад алдаа гарлаа');
      const data = await res.json();
      setFormData((prev: any) => ({ ...prev, ...data }));
      toast.success('Мэдээлэл амжилттай орчуулагдлаа (Google Translate)');
    } catch (err) {
      toast.error('Орчуулахад алдаа гарлаа');
    } finally {
      setIsTranslating(false);
    }
  };

  return { isTranslating, handleAutoTranslate };
};
