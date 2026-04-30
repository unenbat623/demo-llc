import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../services/api';
import { TeamMember } from '../../types/admin';
import { useTeamFileUpload } from './useTeamFileUpload';
import { useTeamTranslation } from './useTeamTranslation';

export const useAdminTeam = (user: any, logAction: Function, openConfirm: (t: string, d: string, o: () => void) => void) => {
  const [formData, setFormData] = useState({
    name: '', name_en: '', position: '', position_en: '', image: '', email: '', linkedin: '',
    skills: '', aboutMe: '', aboutMe_en: '', experience: '', experience_en: '',
    education: '', education_en: '', projects: '', projects_en: '', achievements: '', achievements_en: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const [imageInputMode, setImageInputMode] = useState<'url' | 'file'>('url');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [teamSearch, setTeamSearch] = useState('');
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);


  const { handleFileUpload, isUploading } = useTeamFileUpload(setFormData);
  const { isTranslating, handleAutoTranslate } = useTeamTranslation(formData, setFormData);

  const fetchTeamMembers = async () => {
    try {
      const isScoped = user?.role === 'client' || user?.role === 'staff';
      const endpoint = isScoped ? `${API_URL}/client/${user.id}/team` : `${API_URL}/team`;
      const res = await fetch(endpoint);
      const data = await res.json();
      setTeamMembers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const openEditModal = (member: TeamMember, _focusTarget?: string) => {
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
    setIsModalOpen(true);
  };

  const confirmDelete = (member: TeamMember) => {
    openConfirm(
      'Устгахдаа итгэлтэй байна уу?',
      `"${member.name}"-ийг устгаснаар мэдээллийг сэргээх боломжгүй болно.`,
      async () => {
        try {
          const endpoint = user?.role === 'client' 
            ? `${API_URL}/client/${user.id}/team/${member._id}` 
            : `${API_URL}/team/${member._id}`;
          const res = await fetch(endpoint, { method: 'DELETE' });
          if (!res.ok) throw new Error('Устгахад алдаа гарлаа');
          await logAction('DELETE', `Гишүүнийг устгалаа: ${member.name}`, member.position);
          fetchTeamMembers();
          setSelectedTeamMembers((prev) => prev.filter((selectedId) => selectedId !== member._id));
          toast.success('Амжилттай устлаа');
        } catch (err: any) {
          toast.error(err.message);
        }
      }
    );
  };

  const handleBulkDeleteTeamMembers = async () => {
    if (selectedTeamMembers.length === 0) return;
    
    openConfirm(
      'Бөөнөөр устгах уу?',
      `Та сонгосон ${selectedTeamMembers.length} гишүүнийг устгахдаа итгэлтэй байна уу? Мэдээлэл сэргээх боломжгүй.`,
      async () => {
        try {
          const isScoped = user?.role === 'client' || user?.role === 'staff';
          const endpoint = isScoped 
            ? `${API_URL}/client/${user.id}/team/bulk-delete` 
            : `${API_URL}/team/bulk-delete`;

          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: selectedTeamMembers })
          });
          if (!res.ok) throw new Error('Бөөнөөр устгахад алдаа гарлаа');
          await logAction('DELETE', `Олон гишүүн устгалаа (${selectedTeamMembers.length})`, 'Admin');
          fetchTeamMembers();
          setSelectedTeamMembers([]);
          toast.success(`${selectedTeamMembers.length} гишүүнийг амжилттай устгалаа`);
        } catch (err: any) {
          toast.error(err.message);
        }
      }
    );
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const isUpdate = !!editingMemberId;
      const isScoped = user?.role === 'client' || user?.role === 'staff';
      
      let url = isUpdate ? `${API_URL}/team/${editingMemberId}` : `${API_URL}/team`;
      if (isScoped) {
        url = isUpdate 
          ? `${API_URL}/client/${user.id}/team/${editingMemberId}` 
          : `${API_URL}/client/${user.id}/team`;
      }
      const method = isUpdate ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        social: { email: formData.email, linkedin: formData.linkedin },
        skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
        education: formData.education.split('\n').filter(Boolean),
        education_en: formData.education_en.split('\n').filter(Boolean),
        projects: formData.projects.split('\n').filter(Boolean),
        projects_en: formData.projects_en.split('\n').filter(Boolean),
        achievements: formData.achievements.split('\n').filter(Boolean),
        achievements_en: formData.achievements_en.split('\n').filter(Boolean)
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Хадгалахад алдаа гарлаа');
      
      await logAction(isUpdate ? 'UPDATE' : 'CREATE', `${isUpdate ? 'Гишүүний мэдээлэл заслаа' : 'Шинэ гишүүн нэмлээ'}: ${formData.name}`, formData.position);
      
      setSubmitStatus({ type: 'success', message: 'Амжилттай хадгалагдлаа' });
      fetchTeamMembers();
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus({ type: '', message: '' });
      }, 1000);
    } catch (err: any) {
      setSubmitStatus({ type: 'error', message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTeamMembers = useMemo(() => {
    return teamMembers.filter((m) =>
      (m.name || '').toLowerCase().includes(teamSearch.toLowerCase()) ||
      (m.position || '').toLowerCase().includes(teamSearch.toLowerCase())
    );
  }, [teamMembers, teamSearch]);

  return {
    teamMembers, formData, setFormData, isSubmitting, submitStatus, imageInputMode, setImageInputMode,
    isModalOpen, setIsModalOpen, editingMemberId,
    teamSearch, setTeamSearch,
    selectedTeamMembers, setSelectedTeamMembers,
    isTranslating, isUploading, fetchTeamMembers, handleInputChange, openAddModal, openEditModal, confirmDelete,
    handleBulkDeleteTeamMembers, handleSaveMember,
    handleAutoTranslate, handleFileUpload, filteredTeamMembers
  };
};
