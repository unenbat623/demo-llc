import React from 'react';
import { motion } from 'motion/react';
import { inputClass } from '../../shared/AdminShared';

interface ImageSectionProps {
  imageInputMode: 'url' | 'file';
  setImageInputMode: (mode: 'url' | 'file') => void;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  imageInputMode,
  setImageInputMode,
  formData,
  handleInputChange,
  handleFileUpload,
}) => {
  return (
    <div className="px-8 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">02</span>
        <div className="flex-1 h-px bg-black/8" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Зураг</span>
      </div>

      <div className="flex gap-2 mb-4">
        {(['url', 'file'] as const).map(mode => (
          <button
            key={mode}
            type="button"
            onClick={() => setImageInputMode(mode)}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-200 ${imageInputMode === mode
                ? 'bg-black text-white border-black'
                : 'bg-transparent text-gray-400 border-gray-200 hover:border-gray-400 hover:text-black'
              }`}
            style={{ borderRadius: '2px' }}
          >
            {mode === 'url' ? 'URL холбоос' : 'Файл оруулах'}
          </button>
        ))}
      </div>

      {imageInputMode === 'url' ? (
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          required
          placeholder="https://example.com/photo.jpg"
          className={inputClass}
        />
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="w-full px-4 py-3 bg-gray-50 border-0 border-b-2 border-gray-200 focus:border-black focus:outline-none transition-colors duration-200 text-sm rounded-none file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-[0.2em] file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
        />
      )}

      {formData.image && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex items-start gap-5"
        >
          <div className="relative w-24 flex-shrink-0" style={{ aspectRatio: '3/4' }}>
            <div className="absolute inset-0 bg-black/5" />
            <img
              src={formData.image}
              alt="Preview"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          <div className="pt-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Урьдчилсан харагдац</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageSection;
