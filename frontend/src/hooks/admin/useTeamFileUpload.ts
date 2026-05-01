import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../services/api';

export const useTeamFileUpload = (setFormData: React.Dispatch<React.SetStateAction<any>>) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Зөвхөн зураг файл сонгоно уу.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Зурагны хэмжээ 5MB-с ихгүй байх ёстой.');
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading('Зураг хуулж байна...');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_URL}/upload/image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Зураг хуулахад алдаа гарлаа.');
      }

      const data = await response.json();
      setFormData((prev: any) => ({ ...prev, image: data.url }));
      
      toast.update(toastId, {
        render: 'Зураг амжилттай хуулагдлаа!',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast.update(toastId, {
        render: 'Зураг хуулахад алдаа гарлаа.',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setIsUploading(false);
    }
  };

  return { handleFileUpload, isUploading };
};
