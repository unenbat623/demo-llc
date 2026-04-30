import { toast } from 'react-toastify';

export const useTeamFileUpload = (setFormData: React.Dispatch<React.SetStateAction<any>>) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Зөвхөн зураг файл сонгоно уу.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Зурагны хэмжээ 5MB-с ихгүй байх ёстой.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxSize = 2048;
          let { width, height } = img;
          
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 1.0);
          setFormData((prev: any) => ({ ...prev, image: compressedDataUrl }));
          toast.success('Зураг амжилттай upload хийгдлээ!');
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return { handleFileUpload };
};
