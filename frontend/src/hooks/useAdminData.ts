import React, { useState, useEffect, useMemo, useRef } from 'react';
import { toast } from 'react-toastify';
import { generateTeamMembers as apiGenerateTeamMembers } from '../services/api';

export const useAdminData = (user: any, activeTab: string) => {
  const [formData, setFormData] = useState({
    name: '', name_en: '', position: '', position_en: '', image: '', email: '', linkedin: '',
    skills: '', aboutMe: '', aboutMe_en: '', experience: '', experience_en: '', 
    education: '', education_en: '', projects: '', projects_en: '', achievements: '', achievements_en: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const [imageInputMode, setImageInputMode] = useState<'url' | 'generate' | 'file'>('url');
  const [imagePrompt, setImagePrompt] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [focusField, setFocusField] = useState<string | null>(null);
  const skillsInputRef = useRef<HTMLInputElement>(null);

  const [logs, setLogs] = useState<any[]>([]);
  const [logFilter, setLogFilter] = useState('');
  const [teamSearch, setTeamSearch] = useState('');

  const [profileForm, setProfileForm] = useState({ username: '', password: '' });
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
  const [profileSubmitStatus, setProfileSubmitStatus] = useState({ type: '', message: '' });

  const [isGeneratingTeam, setIsGeneratingTeam] = useState(false);
  const [generateCount, setGenerateCount] = useState(5);
  const [generateStatus, setGenerateStatus] = useState({ type: '', message: '' });

  const [siteSettings, setSiteSettings] = useState({
    siteTitle: '', navbarLogo: '', heroTitle: '', heroDescription: '',
    ctaText: '', aboutTitle: '', aboutDescription: '', contactEmail: '',
    contactPhone: '', address: '', footerText: ''
  });
  const [isSettingsSaving, setIsSettingsSaving] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState({ type: '', message: '' });

  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean, memberId: string | null, memberName: string }>({
    isOpen: false, memberId: null, memberName: ''
  });

  const [systemUsers, setSystemUsers] = useState<any[]>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userFormData, setUserFormData] = useState({ username: '', password: '', role: 'staff' });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userSubmitStatus, setUserSubmitStatus] = useState({ type: '', message: '' });

  const fetchTeamMembers = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/team');
      const data = await res.json();
      setTeamMembers(data);
    } catch (err) { console.error(err); }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/logs');
      const data = await res.json();
      setLogs(data);
    } catch (err) { console.error(err); }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/settings');
      const data = await res.json();
      setSiteSettings(data);
    } catch (err) { console.error(err); }
  };

  const fetchSystemUsers = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/users');
      const data = await res.json();
      setSystemUsers(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if ((activeTab === 'users' || activeTab === 'dashboard') && user) fetchTeamMembers();
    if ((activeTab === 'logs' || activeTab === 'dashboard') && user?.role === 'admin') fetchLogs();
    if (activeTab === 'website' && user?.role === 'admin') fetchSettings();
    if (activeTab === 'system_users' && user) fetchSystemUsers();
  }, [activeTab, user]);

  const logAction = async (action: string, description: string, position: string) => {
    if (!user) return;
    try {
      await fetch('http://localhost:5001/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.username, position: position || 'N/A', action, description, createdAt: new Date().toISOString()
        })
      });
    } catch (err) { console.error(err); }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt) return;
    setIsGeneratingImage(true);
    try {
      const enhancedPrompt = `Professional high-quality studio portrait headshot of ${imagePrompt}, looking at camera, soft cinematic lighting, blurred professional background, 8k resolution, highly detailed, realistic skin textures`;
      const randomSeed = Math.floor(Math.random() * 999999);
      const generatedUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=800&height=1200&seed=${randomSeed}&model=flux&nologo=true`;
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.src = generatedUrl;
        img.onload = resolve;
        img.onerror = () => reject(new Error('Image failed to load'));
        setTimeout(() => reject(new Error('Timeout')), 20000);
      });
      setFormData(prev => ({ ...prev, image: generatedUrl }));
      toast.success('Зураг амжилттай үүсгэгдлээ!');
    } catch (error) { toast.error('Зураг үүсгэхэд алдаа гарлаа.'); }
    finally { setIsGeneratingImage(false); }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) { toast.error('Зөвхөн зураг файл сонгоно уу.'); return; }
      if (file.size > 5 * 1024 * 1024) { toast.error('Зурагны хэмжээ 5MB-с ихгүй байх ёстой.'); return; }
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxSize = 800;
          let { width, height } = img;
          if (width > height) { if (width > maxSize) { height = (height * maxSize) / width; width = maxSize; } }
          else { if (height > maxSize) { width = (width * maxSize) / height; height = maxSize; } }
          canvas.width = width; canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setFormData(prev => ({ ...prev, image: compressedDataUrl }));
          toast.success('Зураг амжилттай upload хийгдлээ!');
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm.username && !profileForm.password) return;
    setIsProfileSubmitting(true);
    try {
      const res = await fetch('http://localhost:5001/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: profileForm.username || undefined, password: profileForm.password || undefined })
      });
      if (!res.ok) throw new Error('Шинэчлэхэд алдаа гарлаа');
      toast.success('Мэдээлэл шинэчлэгдлээ');
      setProfileForm({ username: '', password: '' });
      setProfileSubmitStatus({ type: 'success', message: 'Амжилттай шинэчлэгдлээ' });
    } catch (err: any) { setProfileSubmitStatus({ type: 'error', message: err.message }); }
    finally { setIsProfileSubmitting(false); setTimeout(() => setProfileSubmitStatus({ type: '', message: '' }), 3000); }
  };

  const [isTranslating, setIsTranslating] = useState(false);
  const handleAutoTranslate = async () => {
    setIsTranslating(true);
    const fieldsToTranslate = [
      { mn: formData.name, en: 'name_en' }, { mn: formData.position, en: 'position_en' },
      { mn: formData.aboutMe, en: 'aboutMe_en' }, { mn: formData.experience, en: 'experience_en' },
      { mn: formData.education, en: 'education_en' }, { mn: formData.projects, en: 'projects_en' },
      { mn: formData.achievements, en: 'achievements_en' }
    ];
    const newFormData = { ...formData };
    try {
      for (const field of fieldsToTranslate) {
        if (field.mn && !formData[field.en as keyof typeof formData]) {
          const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(field.mn)}&langpair=mn|en`);
          const data = await res.json();
          if (data.responseData?.translatedText) newFormData[field.en as keyof typeof formData] = data.responseData.translatedText;
        }
      }
      setFormData(newFormData);
      toast.success('Мэдээлэл амжилттай орчуулагдлаа');
    } catch (err) { toast.error('Орчуулахад алдаа гарлаа'); }
    finally { setIsTranslating(false); }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingMemberId(null);
    setFormData({
      name: '', name_en: '', position: '', position_en: '', image: '', email: '', linkedin: '',
      skills: '', aboutMe: '', aboutMe_en: '', experience: '', experience_en: '', 
      education: '', education_en: '', projects: '', projects_en: '', achievements: '', achievements_en: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (member: any, focusTarget?: string) => {
    setEditingMemberId(member._id);
    setFormData({
      name: member.name || '', name_en: member.name_en || '', position: member.position || '',
      position_en: member.position_en || '', image: member.image || '', email: member.social?.email || '',
      linkedin: member.social?.linkedin || '', skills: member.skills?.join(', ') || '',
      aboutMe: member.aboutMe || '', aboutMe_en: member.aboutMe_en || '', experience: member.experience || '',
      experience_en: member.experience_en || '', education: member.education?.join(', ') || '',
      education_en: member.education_en?.join(', ') || '', projects: member.projects?.join(', ') || '',
      projects_en: member.projects_en?.join(', ') || '', achievements: member.achievements?.join(', ') || '',
      achievements_en: member.achievements_en?.join(', ') || ''
    });
    setFocusField(focusTarget || null);
    setIsModalOpen(true);
  };

  const handleDeleteMember = async () => {
    if (!deleteConfirm.memberId) return;
    try {
      const id = deleteConfirm.memberId;
      const member = teamMembers.find(m => m._id === id);
      const res = await fetch(`http://localhost:5001/api/team/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Устгахад алдаа гарлаа');
      if (member) await logAction('DELETE', `Гишүүнийг устгалаа: ${member.name}`, member.position);
      fetchTeamMembers();
      setDeleteConfirm({ isOpen: false, memberId: null, memberName: '' });
      toast.success('Амжилттай устгагдлаа');
    } catch (error) { toast.error('Устгахад алдаа гарлаа'); }
  };

  const confirmDelete = (member: any) => {
    setDeleteConfirm({ isOpen: true, memberId: member._id, memberName: member.name });
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name, name_en: formData.name_en, position: formData.position,
        position_en: formData.position_en, image: formData.image, aboutMe: formData.aboutMe,
        aboutMe_en: formData.aboutMe_en, experience: formData.experience,
        experience_en: formData.experience_en, skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        education: formData.education.split(',').map(s => s.trim()).filter(s => s),
        education_en: formData.education_en.split(',').map(s => s.trim()).filter(s => s),
        projects: formData.projects.split(',').map(s => s.trim()).filter(s => s),
        projects_en: formData.projects_en.split(',').map(s => s.trim()).filter(s => s),
        achievements: formData.achievements.split(',').map(s => s.trim()).filter(s => s),
        achievements_en: formData.achievements_en.split(',').map(s => s.trim()).filter(s => s),
        social: { email: formData.email, linkedin: formData.linkedin || '#' }
      };
      const url = editingMemberId ? `http://localhost:5001/api/team/${editingMemberId}` : 'http://localhost:5001/api/team';
      const method = editingMemberId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Хадгалахад алдаа гарлаа');
      await logAction(editingMemberId ? 'UPDATE' : 'CREATE', editingMemberId ? `Гишүүний мэдээлэл заслаа: ${formData.name}` : `Шинэ гишүүн нэмлээ: ${formData.name}`, formData.position);
      fetchTeamMembers();
      setIsModalOpen(false);
      toast.success('Амжилттай хадгалагдлаа');
    } catch (error: any) { toast.error(error.message); }
    finally { setIsSubmitting(false); }
  };

  const handleGenerateMembers = async () => {
    setIsGeneratingTeam(true);
    try {
      await apiGenerateTeamMembers(generateCount);
      toast.success(`${generateCount} гишүүн амжилттай үүсгэгдлээ`);
      fetchTeamMembers();
    } catch (error: any) { toast.error(error.message || 'Үүсгэхэд алдаа гарлаа'); }
    finally { setIsGeneratingTeam(false); }
  };

  const handleClearLogs = async () => {
    if (!window.confirm('Бүх лог мэдээллийг устгахдаа итгэлтэй байна уу?')) return;
    try {
      const res = await fetch('http://localhost:5001/api/logs', { method: 'DELETE' });
      if (!res.ok) throw new Error('Лог устгахад алдаа гарлаа');
      setLogs([]);
      await logAction('DELETE_ALL_LOGS', 'Системийн бүх лог мэдээллийг устлаа', 'Систем');
      toast.success('Бүх лог устгагдлаа');
    } catch (err) { toast.error('Устгахад алдаа гарлаа'); }
  };

  const handleDeleteLog = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5001/api/logs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Лог устгахад алдаа гарлаа');
      setLogs(logs.filter(l => l._id !== id));
      toast.success('Лог устгагдлаа');
    } catch (err) { toast.error('Устгахад алдаа гарлаа'); }
  };

  const handleSaveSystemUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingUserId ? `http://localhost:5001/api/users/${editingUserId}` : 'http://localhost:5001/api/users';
      const method = editingUserId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userFormData) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Алдаа гарлаа');
      toast.success(editingUserId ? 'Хэрэглэгч шинэчлэгдлээ' : 'Шинэ хэрэглэгч нэмэгдлээ');
      fetchSystemUsers();
      setIsUserModalOpen(false);
      setEditingUserId(null);
      setUserFormData({ username: '', password: '', role: 'staff' });
      await logAction(editingUserId ? 'UPDATE_USER' : 'CREATE_USER', `${editingUserId ? 'Хэрэглэгч шинэчиллээ' : 'Шинэ хэрэглэгч нэмлээ'}: ${userFormData.username}`, 'Хэрэглэгчийн удирдлага');
    } catch (err: any) { toast.error(err.message); }
  };

  const handleDeleteSystemUser = async (id: string, username: string) => {
    if (!window.confirm(`"${username}" хэрэглэгчийг устгахдаа итгэлтэй байна уу?`)) return;
    try {
      const res = await fetch(`http://localhost:5001/api/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Устгахад алдаа гарлаа');
      setSystemUsers(systemUsers.filter(u => u._id !== id));
      await logAction('DELETE_USER', `Хэрэглэгч устлаа: ${username}`, 'Хэрэглэгчийн удирдлага');
      toast.success('Хэрэглэгч устгагдлаа');
    } catch (err) { toast.error('Устгахад алдаа гарлаа'); }
  };

  const handleSaveSettings = async () => {
    setIsSettingsSaving(true);
    try {
      const res = await fetch('http://localhost:5001/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteSettings)
      });
      if (!res.ok) throw new Error('Хадгалахад алдаа гарлаа');
      toast.success('Тохиргоо амжилттай хадгалагдлаа');
      setSettingsStatus({ type: 'success', message: 'Амжилттай хадгалагдлаа' });
    } catch (err: any) { setSettingsStatus({ type: 'error', message: err.message }); }
    finally { setIsSettingsSaving(false); setTimeout(() => setSettingsStatus({ type: '', message: '' }), 3000); }
  };

  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    logs.forEach(log => {
      const pos = log.position || 'Тодорхойгүй';
      counts[pos] = (counts[pos] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [logs]);

  const filteredLogs = logs.filter(log => logFilter === '' || log.action === logFilter);
  const filteredTeamMembers = useMemo(() => {
    return teamMembers.filter(m =>
      (m.name || '').toLowerCase().includes(teamSearch.toLowerCase()) ||
      (m.position || '').toLowerCase().includes(teamSearch.toLowerCase())
    );
  }, [teamMembers, teamSearch]);

  return {
    formData, setFormData, isSubmitting, submitStatus, imageInputMode, setImageInputMode,
    imagePrompt, setImagePrompt, isGeneratingImage, teamMembers, isModalOpen, setIsModalOpen,
    editingMemberId, focusField, skillsInputRef, logs, logFilter, setLogFilter, teamSearch, setTeamSearch,
    profileForm, setProfileForm, isProfileSubmitting, profileSubmitStatus, isGeneratingTeam,
    generateCount, setGenerateCount, generateStatus, siteSettings, setSiteSettings,
    isSettingsSaving, settingsStatus, deleteConfirm, setDeleteConfirm, systemUsers,
    isUserModalOpen, setIsUserModalOpen, userFormData, setUserFormData, editingUserId,
    setEditingUserId, userSubmitStatus, handleGenerateImage, handleFileUpload, handleProfileUpdate,
    handleAutoTranslate, handleInputChange, openAddModal, openEditModal, handleDeleteMember,
    confirmDelete, handleSaveMember, handleGenerateMembers, handleClearLogs, handleDeleteLog,
    handleSaveSystemUser, handleDeleteSystemUser, handleSaveSettings,
    chartData, filteredLogs, filteredTeamMembers, isTranslating, fetchTeamMembers
  };
};
