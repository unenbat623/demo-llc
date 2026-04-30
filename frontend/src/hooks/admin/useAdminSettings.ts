import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../services/api';
import { SiteSettings } from '../../types/admin';

export const useAdminSettings = (user: any, logAction: Function) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteTitle: '', siteTitle_en: '', navbarLogo: '', 
    heroTitle: '', heroTitle_en: '', heroDescription: '', heroDescription_en: '',
    ctaText: '', ctaText_en: '', heroBgUrl: '', heroImageUrl: '',
    aboutTitle: '', aboutTitle_en: '', aboutDescription: '', aboutDescription_en: '', 
    

    stats1Value: '', stats1Label: '', stats1Label_en: '', stats1Detail: '', stats1Detail_en: '',
    stats2Value: '', stats2Label: '', stats2Label_en: '', stats2Detail: '', stats2Detail_en: '',
    stats3Value: '', stats3Label: '', stats3Label_en: '', stats3Detail: '', stats3Detail_en: '',
    stats4Value: '', stats4Label: '', stats4Label_en: '', stats4Detail: '', stats4Detail_en: '',


    visionTitle: '', visionTitle_en: '', visionText: '', visionText_en: '',
    missionTitle: '', missionTitle_en: '', missionText: '', missionText_en: '',

    contactEmail: '', contactPhone: '', 
    address: '', address_en: '',
    facebook: '', twitter: '', linkedin: '', instagram: '',
    footerText: '', footerText_en: ''
  });
  const [isSettingsSaving, setIsSettingsSaving] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState({ type: '', message: '' });

  const [bgInputMode, setBgInputMode] = useState<'url' | 'file'>('url');
  const [imgInputMode, setImgInputMode] = useState<'url' | 'file'>('url');

  const [profileForm, setProfileForm] = useState({ username: '', password: '' });
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
  const [profileSubmitStatus, setProfileSubmitStatus] = useState({ type: '', message: '' });

  const fetchSettings = async () => {
    try {
      const endpoint = user?.role === 'client' ? `${API_URL}/client/${user.id}` : `${API_URL}/settings`;
      const res = await fetch(endpoint);
      const data = await res.json();
      
      if (user?.role === 'client') {


        setSiteSettings(prev => ({ ...prev, ...(data.settings || {}) }));
      } else {
        setSiteSettings(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSettings = async (e?: React.FormEvent, overrideSettings?: SiteSettings) => {
    if (e) e.preventDefault();
    setIsSettingsSaving(true);
    try {
      const endpoint = user?.role === 'client' ? `${API_URL}/client/${user.id}/settings` : `${API_URL}/settings`;
      const method = user?.role === 'client' ? 'PUT' : 'POST';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(overrideSettings || siteSettings)
      });
      if (!res.ok) throw new Error('Хадгалахад алдаа гарлаа');
      await logAction('UPDATE', 'Вэбсайтын тохиргоог шинэчиллээ', 'System');
      setSettingsStatus({ type: 'success', message: 'Тохиргоо амжилттай хадгалагдлаа' });
      toast.success('Тохиргоо амжилттай хадгалагдлаа');
    } catch (err: any) {
      setSettingsStatus({ type: 'error', message: err.message });
      toast.error(err.message);
    } finally {
      setIsSettingsSaving(false);
      setTimeout(() => setSettingsStatus({ type: '', message: '' }), 3000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'heroBgUrl' | 'heroImageUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');

      if (!isVideo && !isImage) {
        toast.error('Зөвхөн зураг эсвэл видео файл сонгоно уу.');
        return;
      }

      if (file.size > 20 * 1024 * 1024) { // 20MB limit for hero assets
        toast.error('Файлын хэмжээ 20MB-с ихгүй байх ёстой.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setSiteSettings((prev) => ({ ...prev, [field]: dataUrl }));
        toast.success('Файл амжилттай сонгогдлоа!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm.username && !profileForm.password) return;
    setIsProfileSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: profileForm.username || undefined, password: profileForm.password || undefined })
      });
      if (!res.ok) throw new Error('Шинэчлэхэд алдаа гарлаа');
      toast.success('Мэдээлэл шинэчлэгдлээ');
      setProfileForm({ username: '', password: '' });
      setProfileSubmitStatus({ type: 'success', message: 'Амжилттай шинэчлэгдлээ' });
    } catch (err: any) {
      setProfileSubmitStatus({ type: 'error', message: err.message });
    } finally {
      setIsProfileSubmitting(false);
      setTimeout(() => setProfileSubmitStatus({ type: '', message: '' }), 3000);
    }
  };

  return {
    siteSettings, setSiteSettings,
    isSettingsSaving, settingsStatus,
    fetchSettings, handleSaveSettings,
    profileForm, setProfileForm,
    isProfileSubmitting, profileSubmitStatus,
    handleProfileUpdate,
    handleSettingsFileUpload: handleFileUpload,
    bgInputMode, setBgInputMode,
    imgInputMode, setImgInputMode
  };
};
