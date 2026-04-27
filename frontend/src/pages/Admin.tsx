import React, { useEffect, useState, useMemo, useRef } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { navigateTo } from './Login';
import { generateTeamMembers } from '../services/api';
import { LayoutDashboard, Users, LogOut, Menu, X, Plus, ChevronRight, Activity, Sparkles, Edit2, Trash2, Globe, Save, ShieldCheck, UserPlus, UserMinus, Key, Trash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Admin() {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const [formData, setFormData] = useState({
    name: '', position: '', image: '', email: '', linkedin: '',
    skills: '', aboutMe: '', experience: '', education: '', projects: '', achievements: ''
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
    siteTitle: '',
    navbarLogo: '',
    heroTitle: '',
    heroDescription: '',
    ctaText: '',
    aboutTitle: '',
    aboutDescription: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    footerText: ''
  });
  const [isSettingsSaving, setIsSettingsSaving] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState({ type: '', message: '' });

  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean, memberId: string | null, memberName: string }>({
    isOpen: false,
    memberId: null,
    memberName: ''
  });

  const [systemUsers, setSystemUsers] = useState<any[]>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userFormData, setUserFormData] = useState({ username: '', password: '', role: 'staff' });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userSubmitStatus, setUserSubmitStatus] = useState({ type: '', message: '' });

  const getSkillIcon = (skill: string) => {
    const s = skill.toLowerCase().trim();
    if (s.includes('graphql')) return 'https://cdn.simpleicons.org/graphql/E10098';
    if (s.includes('mysql')) return 'https://cdn.simpleicons.org/mysql/4479A1';
    if (s.includes('postgre')) return 'https://cdn.simpleicons.org/postgresql/4169E1';
    if (s.includes('mongo')) return 'https://cdn.simpleicons.org/mongodb/47A248';
    if (s.includes('aws')) return 'https://cdn.simpleicons.org/amazonaws/232F3E';
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
  const fetchTeamMembers = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/team');
      const data = await res.json();
      setTeamMembers(data);
    } catch (err) {
      console.error('Failed to fetch team members', err);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/logs');
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error('Failed to fetch logs', err);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/settings');
      const data = await res.json();
      setSiteSettings(data);
    } catch (err) {
      console.error('Failed to fetch settings', err);
    }
  };

  const fetchSystemUsers = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/users');
      const data = await res.json();
      setSystemUsers(data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    if ((activeTab === 'users' || activeTab === 'dashboard') && user) {
      fetchTeamMembers();
    }
    if ((activeTab === 'logs' || activeTab === 'dashboard') && user?.role === 'admin') {
      fetchLogs();
    }
    if (activeTab === 'website' && user?.role === 'admin') {
      fetchSettings();
    }
    if ((activeTab === 'system_users') && user) {
      fetchSystemUsers();
    }
  }, [activeTab, user]);

  const logAction = async (action: string, description: string, position: string) => {
    if (!user) return;
    try {
      await fetch('http://localhost:5001/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.username,
          position: position || 'N/A',
          action,
          description,
          createdAt: new Date().toISOString()
        })
      });
    } catch (err) {
      console.error('Failed to log action', err);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt) return;
    setIsGeneratingImage(true);
    // cleared status

    try {
      // Enhance the prompt to ensure a professional portrait look
      const enhancedPrompt = `Professional high-quality studio portrait headshot of ${imagePrompt}, looking at camera, soft cinematic lighting, blurred professional background, 8k resolution, highly detailed, realistic skin textures`;

      const randomSeed = Math.floor(Math.random() * 999999);
      const generatedUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=800&height=1200&seed=${randomSeed}&model=flux&nologo=true`;

      // Test if the image actually loads
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.src = generatedUrl;
        img.onload = resolve;
        img.onerror = () => reject(new Error('Image failed to load'));
        // Safety timeout
        setTimeout(() => reject(new Error('Timeout')), 20000);
      });

      setFormData(prev => ({ ...prev, image: generatedUrl }));
      toast.success('Зураг амжилттай үүсгэгдлээ!');
    } catch (error) {
      console.error('Image generation error:', error);
      toast.error('Зураг үүсгэхэд алдаа гарлаа.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Зөвхөн зураг файл сонгоно уу.');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Зурагны хэмжээ 5MB-с ихгүй байх ёстой.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Create canvas for resizing
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Calculate new dimensions (max 800px width/height)
          const maxSize = 800;
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

          // Set canvas size
          canvas.width = width;
          canvas.height = height;

          // Draw resized image
          ctx?.drawImage(img, 0, 0, width, height);

          // Convert to compressed JPEG
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
    // cleared status
    try {
      const res = await fetch('http://localhost:5001/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: profileForm.username || undefined,
          password: profileForm.password || undefined
        })
      });
      if (!res.ok) throw new Error('Шинэчлэхэд алдаа гарлаа');
      toast.success('Мэдээлэл шинэчлэгдлээ');
      setProfileForm({ username: '', password: '' });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsProfileSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingMemberId(null);
    setFormData({
      name: '', position: '', image: '', email: '', linkedin: '',
      skills: '', aboutMe: '', experience: '', education: '', projects: '', achievements: ''
    });
    // cleared status
    setIsModalOpen(true);
  };

  const openEditModal = (member: any, focusTarget?: string) => {
    setEditingMemberId(member._id);
    setFormData({
      name: member.name || '',
      position: member.position || '',
      image: member.image || '',
      email: member.social?.email || '',
      linkedin: member.social?.linkedin || '',
      skills: member.skills?.join(', ') || '',
      aboutMe: member.aboutMe || '',
      experience: member.experience || '',
      education: member.education?.join(', ') || '',
      projects: member.projects?.join(', ') || '',
      achievements: member.achievements?.join(', ') || ''
    });
    // cleared status
    setFocusField(focusTarget || null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && focusField === 'skills' && skillsInputRef.current) {
      setTimeout(() => {
        skillsInputRef.current?.focus();
        setFocusField(null);
      }, 300);
    }
  }, [isModalOpen, focusField]);

  const handleDeleteMember = async () => {
    if (!deleteConfirm.memberId) return;
    try {
      const id = deleteConfirm.memberId;
      const member = teamMembers.find(m => m._id === id);
      const res = await fetch(`http://localhost:5001/api/team/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Устгахад алдаа гарлаа');

      if (member) {
        await logAction('DELETE', `Гишүүнийг устгалаа: ${member.name}`, member.position);
      }

      fetchTeamMembers();
      setDeleteConfirm({ isOpen: false, memberId: null, memberName: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = (member: any) => {
    setDeleteConfirm({
      isOpen: true,
      memberId: member._id,
      memberName: member.name
    });
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // cleared status

    try {
      const payload = {
        name: formData.name,
        position: formData.position,
        image: formData.image,
        aboutMe: formData.aboutMe,
        experience: formData.experience,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        education: formData.education.split(',').map(s => s.trim()).filter(s => s),
        projects: formData.projects.split(',').map(s => s.trim()).filter(s => s),
        achievements: formData.achievements.split(',').map(s => s.trim()).filter(s => s),
        social: {
          email: formData.email,
          linkedin: formData.linkedin || '#'
        }
      };

      const url = editingMemberId
        ? `http://localhost:5001/api/team/${editingMemberId}`
        : 'http://localhost:5001/api/team';
      const method = editingMemberId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Хадгалахад алдаа гарлаа');

      await logAction(
        editingMemberId ? 'UPDATE' : 'CREATE',
        editingMemberId ? `Гишүүний мэдээлэл заслаа: ${formData.name}` : `Шинэ гишүүн нэмлээ: ${formData.name}`,
        formData.position
      );

      fetchTeamMembers();
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateMembers = async () => {
    setIsGeneratingTeam(true);
    // cleared status
    try {
      const result = await generateTeamMembers(generateCount);
      toast.success(`${generateCount} гишүүн амжилттай үүсгэгдлээ`);
      fetchTeamMembers();
      setTimeout(() => setGenerateStatus({ type: '', message: '' }), 5000);
    } catch (error: any) {
      toast.error(error.message || 'Үүсгэхэд алдаа гарлаа');
    } finally {
      setIsGeneratingTeam(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigateTo('/login');
    }
  }, [user]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigateTo('/login');
  };

  const handleClearLogs = async () => {
    if (!window.confirm('Бүх лог мэдээллийг устгахдаа итгэлтэй байна уу?')) return;
    try {
      const res = await fetch('http://localhost:5001/api/logs', { method: 'DELETE' });
      if (!res.ok) throw new Error('Лог устгахад алдаа гарлаа');
      setLogs([]);
      await logAction('DELETE_ALL_LOGS', 'Системийн бүх лог мэдээллийг устгалаа', 'Систем');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLog = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5001/api/logs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Лог устгахад алдаа гарлаа');
      setLogs(logs.filter(l => l._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSystemUser = async (e: React.FormEvent) => {
    e.preventDefault();
    // cleared status
    try {
      const url = editingUserId 
        ? `http://localhost:5001/api/users/${editingUserId}`
        : 'http://localhost:5001/api/users';
      const method = editingUserId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userFormData)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Алдаа гарлаа');
      
      toast.success(editingUserId ? 'Хэрэглэгч шинэчлэгдлээ' : 'Шинэ хэрэглэгч нэмэгдлээ');
      fetchSystemUsers();
      setTimeout(() => {
        setIsUserModalOpen(false);
        setEditingUserId(null);
        setUserFormData({ username: '', password: '', role: 'staff' });
        // cleared status
      }, 1500);

      await logAction(editingUserId ? 'UPDATE_USER' : 'CREATE_USER', `${editingUserId ? 'Хэрэглэгч шинэчиллээ' : 'Шинэ хэрэглэгч нэмлээ'}: ${userFormData.username}`, 'Хэрэглэгчийн удирдлага');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeleteSystemUser = async (id: string, username: string) => {
    if (!window.confirm(`"${username}" хэрэглэгчийг устгахдаа итгэлтэй байна уу?`)) return;
    try {
      const res = await fetch(`http://localhost:5001/api/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Устгахад алдаа гарлаа');
      setSystemUsers(systemUsers.filter(u => u._id !== id));
      await logAction('DELETE_USER', `Хэрэглэгч устгалаа: ${username}`, 'Хэрэглэгчийн удирдлага');
    } catch (err) {
      console.error(err);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Ерөнхий', icon: LayoutDashboard, roles: ['admin', 'staff'] },
    { id: 'users', label: 'Багийн гишүүд', icon: Users, roles: ['admin'] },
    { id: 'system_users', label: 'Систем хэрэглэгчид', icon: ShieldCheck, roles: ['admin', 'staff'] },
    { id: 'website', label: 'Вэбсайт', icon: Globe, roles: ['admin'] },
    { id: 'logs', label: 'Лог', icon: Activity, roles: ['admin'] },
  ].filter(item => item.roles.includes(user.role));

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-black text-white p-6">
      <div className="mb-12 mt-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-white flex items-center justify-center transform rotate-45">
          <div className="-rotate-45">
            <LayoutDashboard size={20} className="text-black" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tighter uppercase leading-none">Админ</h2>
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 mt-1">Төв систем</div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsSidebarOpen(false);
            }}
            className={`w-full group flex items-center gap-4 px-4 py-4 rounded-sm transition-all duration-500 relative overflow-hidden ${
              activeTab === item.id 
                ? 'bg-white/10 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`}
          >
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-nav"
                className="absolute left-0 w-1 h-6 bg-white rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <item.icon 
              size={18} 
              className={`transition-all duration-500 ${
                activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'
              }`} 
            />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.label}</span>
            <ChevronRight 
              size={14} 
              className={`ml-auto transition-all duration-500 ${
                activeTab === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              }`} 
            />
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/10">
        <div className="flex items-center gap-4 px-4 py-4 mb-4 bg-white/5 rounded-sm">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black">
            {user.username[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-wider truncate">{user.username}</p>
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">{user.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-4 text-gray-500 hover:text-red-500 hover:bg-red-500/5 transition-all duration-300 rounded-sm group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em]">Гарах</span>
        </button>
      </div>
    </div>
  );

  // ─── Field component for cleaner form ────────────────────────────────────────
  const Field = ({
    label,
    hint,
    children,
    full = false,
  }: {
    label: string;
    hint?: string;
    children: React.ReactNode;
    full?: boolean;
  }) => (
    <div className={full ? 'col-span-1 sm:col-span-2' : ''}>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">{label}</label>
        {hint && <span className="text-[10px] text-gray-400">{hint}</span>}
      </div>
      {children}
    </div>
  );

  const inputClass =
    'w-full px-4 py-3 bg-gray-50 border-0 border-b-2 border-gray-200 focus:border-black focus:outline-none transition-colors duration-200 text-sm rounded-none placeholder:text-gray-300';

  const textareaClass =
    'w-full px-4 py-3 bg-gray-50 border-0 border-b-2 border-gray-200 focus:border-black focus:outline-none transition-colors duration-200 text-sm rounded-none resize-none custom-scrollbar placeholder:text-gray-300';

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

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans selection:bg-black selection:text-white">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-black transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <SidebarContent />
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative overflow-x-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white/80 backdrop-blur-xl border-b p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black flex items-center justify-center transform rotate-45">
              <div className="-rotate-45">
                <LayoutDashboard size={16} className="text-white" />
              </div>
            </div>
            <h1 className="text-lg font-black tracking-tighter uppercase">Админ</h1>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        <div className="flex-1 p-6 lg:p-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                  {menuItems.find(m => m.id === activeTab)?.label}
                </h2>
                <div className="h-px w-full bg-black/10"></div>
              </div>

              {activeTab === 'dashboard' && (
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white p-8 border border-black/10 hover:border-black hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Users size={80} className="text-black" />
                      </div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 relative z-10">Нийт гишүүд</h3>
                      <p className="text-5xl font-black relative z-10 tracking-tighter">{teamMembers.length}</p>
                      <div className="mt-4 flex items-center gap-2 text-green-500 relative z-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Active System</span>
                      </div>
                    </motion.div>
                    
                    {user.role === 'staff' ? (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-black text-white p-8 group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <ShieldCheck size={80} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-gray-400">Staff Хязгаарлалт</h3>
                        <p className="text-gray-300 text-sm leading-relaxed max-w-[80%]">Та staff эрхтэй байгаа тул зөвхөн хязгаарлагдмал цэсүүд харагдаж байна.</p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 border border-black/10 hover:border-black hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group flex flex-col relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                          <Activity size={80} className="text-black" />
                        </div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 relative z-10">Сүүлийн үйлдэл</h3>
                        <div className="space-y-4 mt-4 flex-1 relative z-10">
                          {(logs || []).slice(0, 5).map((log, idx) => (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + (idx * 0.1) }}
                              key={idx} 
                              className="flex items-center gap-4 text-xs border-b border-gray-100 pb-3 last:border-0 hover:translate-x-2 transition-transform duration-300"
                            >
                              <span className={`px-2 py-1 text-[8px] font-black uppercase tracking-[0.2em] rounded-sm ${
                                log.action === 'CREATE' ? 'bg-green-100 text-green-700' :
                                log.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                                log.action === 'DELETE' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                              }`}>{log.action}</span>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-700 truncate tracking-tight">{log.description}</p>
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">
                                  {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                          {(logs || []).length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center py-8">
                              <Activity size={24} className="text-gray-200 mb-2" />
                              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Одоогоор лог байхгүй</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'website' && user.role === 'admin' && (
                <div className="bg-white p-8 border border-black/10 hover:border-black transition-colors duration-300">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-[0.2em]">Вэбсайт тохиргоо</h3>
                      <p className="text-gray-600 mt-1">Вэбсайтын ерөнхий мэдээллийг эндээс удирдана.</p>
                    </div>
                    <button
                      onClick={async () => {
                        setIsSettingsSaving(true);
                        // cleared status
                        try {
                          const res = await fetch('http://localhost:5001/api/settings', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(siteSettings)
                          });
                          if (!res.ok) throw new Error('Хадгалахад алдаа гарлаа');
                          toast.success('Тохиргоо амжилттай хадгалагдлаа');
                          setTimeout(() => setSettingsStatus({ type: '', message: '' }), 3000);
                        } catch (err: any) {
                          toast.error(err.message);
                        } finally {
                          setIsSettingsSaving(false);
                        }
                      }}
                      disabled={isSettingsSaving}
                      className="group relative overflow-hidden bg-black rounded-sm text-white px-8 py-3 transition-all duration-500"
                    >
                      <div className="absolute inset-0 bg-gray-800 transition-transform duration-500 ease-[0.16,1,0.3,1] -translate-x-full group-hover:translate-x-0" />
                      <span className="relative text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                        {isSettingsSaving ? 'Хадгалж байна...' : <><Save size={16} /> Хадгалах</>}
                      </span>
                    </button>
                  </div>

                  {settingsStatus.message && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`mb-6 p-4 text-xs font-bold rounded-sm ${settingsStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                        }`}
                    >
                      {settingsStatus.message}
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {/* Section: Navbar & Hero */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">01</span>
                        <div className="flex-1 h-px bg-black/5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Navbar & Hero</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Вэбсайт нэр">
                          <input
                            type="text"
                            value={siteSettings.siteTitle}
                            onChange={e => setSiteSettings({ ...siteSettings, siteTitle: e.target.value })}
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Navbar Лого">
                          <input
                            type="text"
                            value={siteSettings.navbarLogo}
                            onChange={e => setSiteSettings({ ...siteSettings, navbarLogo: e.target.value })}
                            className={inputClass}
                          />
                        </Field>
                      </div>
                      <Field label="Hero Гарчиг">
                        <input
                          type="text"
                          value={siteSettings.heroTitle}
                          onChange={e => setSiteSettings({ ...siteSettings, heroTitle: e.target.value })}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Hero Тайлбар">
                        <textarea
                          rows={3}
                          value={siteSettings.heroDescription}
                          onChange={e => setSiteSettings({ ...siteSettings, heroDescription: e.target.value })}
                          className={textareaClass}
                        />
                      </Field>
                      <Field label="CTA Товчлуур">
                        <input
                          type="text"
                          value={siteSettings.ctaText}
                          onChange={e => setSiteSettings({ ...siteSettings, ctaText: e.target.value })}
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    {/* Section: About Us */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">02</span>
                        <div className="flex-1 h-px bg-black/5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Бидний тухай</span>
                      </div>
                      <Field label="Хэсгийн гарчиг">
                        <input
                          type="text"
                          value={siteSettings.aboutTitle}
                          onChange={e => setSiteSettings({ ...siteSettings, aboutTitle: e.target.value })}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Хэсгийн тайлбар">
                        <textarea
                          rows={5}
                          value={siteSettings.aboutDescription}
                          onChange={e => setSiteSettings({ ...siteSettings, aboutDescription: e.target.value })}
                          className={textareaClass}
                        />
                      </Field>
                    </div>

                    {/* Section: Contact & Footer */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">03</span>
                        <div className="flex-1 h-px bg-black/5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Холбоо барих</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="И-мэйл">
                          <input
                            type="email"
                            value={siteSettings.contactEmail}
                            onChange={e => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Утас">
                          <input
                            type="text"
                            value={siteSettings.contactPhone}
                            onChange={e => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                            className={inputClass}
                          />
                        </Field>
                      </div>
                      <Field label="Хаяг">
                        <textarea
                          rows={2}
                          value={siteSettings.address}
                          onChange={e => setSiteSettings({ ...siteSettings, address: e.target.value })}
                          className={textareaClass}
                        />
                      </Field>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">04</span>
                        <div className="flex-1 h-px bg-black/5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Footer</span>
                      </div>
                      <Field label="Copyright текст">
                        <input
                          type="text"
                          value={siteSettings.footerText}
                          onChange={e => setSiteSettings({ ...siteSettings, footerText: e.target.value })}
                          className={inputClass}
                        />
                      </Field>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'users' && user.role === 'admin' && (
                <div className="bg-white p-8 border border-black/10 hover:border-black transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-[0.2em]">Хэрэглэгчийн удирдлага</h3>
                      <p className="text-gray-600 mt-1">Энд багийн гишүүдийн жагсаалт харагдана.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center w-full md:w-auto">
                        <div className="relative flex-1 min-w-[200px]">
                          <input
                            type="text"
                            placeholder="ГИШҮҮДЭЭС ХАЙХ..."
                            value={teamSearch}
                            onChange={(e) => setTeamSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-black/5 focus:border-black focus:outline-none transition-all duration-300 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:border-black/20"
                          />
                          <Users size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 border border-gray-100 rounded-sm">
                            <input
                              type="number"
                              min="1"
                              max="50"
                              value={generateCount}
                              onChange={(e) => setGenerateCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 5)))}
                              className="w-12 bg-transparent text-center text-xs font-bold focus:outline-none"
                              disabled={isGeneratingTeam}
                            />
                            <button
                              onClick={handleGenerateMembers}
                              disabled={isGeneratingTeam}
                              className="bg-purple-600 hover:bg-purple-700 text-white p-1.5 rounded-sm transition-colors disabled:opacity-50"
                              title="Олноор үүсгэх"
                            >
                              <Sparkles size={14} className={isGeneratingTeam ? 'animate-pulse' : ''} />
                            </button>
                          </div>
                          <button
                            onClick={openAddModal}
                            className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-gray-800 transition-colors rounded-sm"
                          >
                            <Plus size={14} /> <span className="hidden xs:inline">Нэмэх</span>
                          </button>
                        </div>
                      </div>
                      {generateStatus.message && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className={`p-3 text-xs font-bold rounded-sm ${generateStatus.type === 'success'
                              ? 'bg-green-100 text-green-700 border border-green-200'
                              : 'bg-red-100 text-red-700 border border-red-200'
                            }`}
                        >
                          {generateStatus.message}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-black/10 text-xs font-bold uppercase tracking-wider text-gray-500">
                          <th className="py-3 px-4">Зураг</th>
                          <th className="py-3 px-4">Нэр</th>
                          <th className="py-3 px-4 hidden md:table-cell">Албан тушаал</th>
                          <th className="py-3 px-4 hidden lg:table-cell">Ур чадвар</th>
                          <th className="py-3 px-4 text-right">Үйлдэл</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTeamMembers.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-8 text-center text-gray-500 text-sm">Хэрэглэгч олдсонгүй</td>
                          </tr>
                        ) : (
                          filteredTeamMembers.map((member, idx) => (
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              key={member._id} 
                              className="border-b border-black/5 hover:bg-gray-50/80 transition-colors group/row"
                            >
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <img src={member.image} alt={member.name} className="w-10 h-10 object-cover rounded-sm grayscale flex-shrink-0" />
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="font-bold text-sm leading-tight">{member.name}</div>
                                <div className="md:hidden text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{member.position}</div>
                              </td>
                              <td className="py-3 px-4 text-gray-600 text-sm hidden md:table-cell">{member.position}</td>
                              <td 
                                className="py-3 px-4 hidden lg:table-cell cursor-pointer group/skills"
                                onClick={() => openEditModal(member, 'skills')}
                                title="Ур чадвар засах"
                              >
                                <div className="flex flex-wrap gap-1.5 max-w-[300px] group-hover/skills:scale-[1.02] transition-transform">
                                  {(member.skills || []).slice(0, 3).map((skill: string, idx: number) => {
                                    const icon = getSkillIcon(skill);
                                    return (
                                      <div key={idx} className="flex items-center gap-1.5 bg-[#0a0c10] border border-white/10 px-2 py-1 rounded-full">
                                        {icon && <img src={icon} alt={skill} className="w-3 h-3 invert opacity-60" />}
                                        <span className="text-[9px] font-black text-white/80 uppercase tracking-wider">{skill}</span>
                                      </div>
                                    );
                                  })}
                                  {member.skills && member.skills.length > 3 && (
                                    <span className="text-[9px] font-black text-gray-400 self-center">+{member.skills.length - 3}</span>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex justify-end gap-2 sm:gap-3">
                                  <button
                                    onClick={() => openEditModal(member)}
                                    className="group flex items-center justify-center sm:justify-start gap-2 p-2 sm:px-4 sm:py-2 bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-sm"
                                    title="Засах"
                                  >
                                    <Edit2 size={12} className="group-hover:rotate-12 transition-transform duration-300" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:inline">Засах</span>
                                  </button>
                                  <button
                                    onClick={() => confirmDelete(member)}
                                    className="group flex items-center justify-center sm:justify-start gap-2 p-2 sm:px-4 sm:py-2 border border-black/10 text-gray-400 hover:text-red-600 hover:border-red-500 hover:bg-red-50/50 transition-all duration-300 rounded-sm"
                                    title="Устгах"
                                  >
                                    <Trash2 size={12} className="group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:inline">Устгах</span>
                                  </button>
                                </div>
                              </td>
                            </motion.tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* ─── REDESIGNED MODAL ──────────────────────────────────────── */}
                  <AnimatePresence>
                    {isModalOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/85 backdrop-blur-md"
                        onClick={() => setIsModalOpen(false)}
                      >
                        {/* subtle grid overlay */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-[0.04]"
                          style={{
                            backgroundImage:
                              'repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 48px), repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 48px)',
                          }}
                        />

                        <motion.div
                          initial={{ y: 48, opacity: 0, scale: 0.98 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          exit={{ y: 32, opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="relative bg-white w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden"
                          style={{ borderRadius: '2px' }}
                          onClick={e => e.stopPropagation()}
                        >
                          {/* top accent line */}
                          <div className="h-[3px] w-full bg-black flex-shrink-0" />

                          {/* ── HEADER ── */}
                          <div className="flex items-center justify-between px-8 py-6 border-b border-black/8 flex-shrink-0">
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-black flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs font-black">
                                  {editingMemberId ? '✎' : '+'}
                                </span>
                              </div>
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 leading-none mb-1">
                                  {editingMemberId ? 'Засах' : 'Шинэ'}
                                </p>
                                <h3 className="text-lg font-black uppercase tracking-tight leading-none">
                                  Багийн гишүүн
                                </h3>
                              </div>
                            </div>
                            <button
                              title="Хаах"
                              onClick={() => setIsModalOpen(false)}
                              className="w-9 h-9 flex items-center justify-center border border-black/15 hover:border-black hover:bg-black hover:text-white transition-all duration-200 group"
                              style={{ borderRadius: '2px' }}
                            >
                              <X size={16} className="transition-transform duration-200 group-hover:rotate-90" />
                            </button>
                          </div>

                          {/* ── STATUS BANNER ── */}
                          <AnimatePresence>
                            {submitStatus.message && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden flex-shrink-0"
                              >
                                <div
                                  className={`px-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 ${submitStatus.type === 'success'
                                      ? 'bg-emerald-50 text-emerald-700 border-b border-emerald-200'
                                      : 'bg-red-50 text-red-600 border-b border-red-200'
                                    }`}
                                >
                                  <span>{submitStatus.type === 'success' ? '✓' : '✕'}</span>
                                  {submitStatus.message}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* ── SCROLLABLE FORM BODY ── */}
                          <div className="overflow-y-auto flex-1 custom-scrollbar">
                            <form onSubmit={handleSaveMember}>
                              {/* Section: Үндсэн мэдээлэл */}
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
                                    <input
                                      ref={skillsInputRef}
                                      type="text"
                                      name="skills"
                                      value={formData.skills}
                                      onChange={handleInputChange}
                                      placeholder="GraphQL, MySQL, PostgreSQL, MongoDB, C++, AWS"
                                      className={inputClass}
                                    />
                                    <div className="flex flex-wrap gap-2 mt-4">
                                      {formData.skills.split(',').map(s => s.trim()).filter(s => s !== '').map((skill, idx) => {
                                        const icon = getSkillIcon(skill);
                                        return (
                                          <div
                                            key={idx}
                                            className="flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-1 rounded-sm"
                                          >
                                            {icon ? (
                                              <img src={icon} alt={skill} className="w-3 h-3 opacity-60" />
                                            ) : (
                                              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                            )}
                                            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider">{skill}</span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </Field>
                                </div>
                              </div>

                              {/* Section: Зураг */}
                              <div className="px-8 pt-2 pb-6">
                                <div className="flex items-center gap-3 mb-6">
                                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">02</span>
                                  <div className="flex-1 h-px bg-black/8" />
                                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Зураг</span>
                                </div>

                                <div className="flex gap-2 mb-4">
                                  {(['url', 'generate', 'file'] as const).map(mode => (
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
                                      {mode === 'url' ? 'URL холбоос' : 'AI үүсгэх'}
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
                                ) : imageInputMode === 'file' ? (
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="w-full px-4 py-3 bg-gray-50 border-0 border-b-2 border-gray-200 focus:border-black focus:outline-none transition-colors duration-200 text-sm rounded-none file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-[0.2em] file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                                  />
                                ) : (
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={imagePrompt}
                                      onChange={e => setImagePrompt(e.target.value)}
                                      placeholder="Professional portrait of a software engineer..."
                                      className={`${inputClass} flex-1`}
                                    />
                                    <button
                                      type="button"
                                      onClick={handleGenerateImage}
                                      disabled={isGeneratingImage || !imagePrompt}
                                      className="px-5 py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] disabled:opacity-40 transition-opacity whitespace-nowrap hover:bg-gray-800"
                                      style={{ borderRadius: '2px' }}
                                    >
                                      {isGeneratingImage ? (
                                        <span className="flex items-center gap-2">
                                          <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                          Үүсгэж байна
                                        </span>
                                      ) : (
                                        'Үүсгэх'
                                      )}
                                    </button>
                                  </div>
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

                              {/* Section: Дэлгэрэнгүй */}
                              <div className="px-8 pt-2 pb-6">
                                <div className="flex items-center gap-3 mb-6">
                                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">03</span>
                                  <div className="flex-1 h-px bg-black/8" />
                                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Дэлгэрэнгүй</span>
                                </div>

                                <div className="space-y-5">
                                  <Field label="Миний тухай">
                                    <textarea
                                      name="aboutMe"
                                      value={formData.aboutMe}
                                      onChange={handleInputChange}
                                      rows={3}
                                      placeholder="Өөрийнхөө тухай товч бичнэ үү..."
                                      className={textareaClass}
                                    />
                                  </Field>
                                  <Field label="Туршлага">
                                    <textarea
                                      name="experience"
                                      value={formData.experience}
                                      onChange={handleInputChange}
                                      rows={3}
                                      placeholder="Ажлын туршлагаа дэлгэрэнгүй бичнэ үү..."
                                      className={textareaClass}
                                    />
                                  </Field>
                                  <Field label="Боловсрол" hint="Таслалаар тусгаарлах">
                                    <input
                                      type="text"
                                      name="education"
                                      value={formData.education}
                                      onChange={handleInputChange}
                                      placeholder="МУИС — Компьютерийн ухаан, MIT — AI"
                                      className={inputClass}
                                    />
                                  </Field>
                                  <Field label="Гол төслүүд" hint="Таслалаар тусгаарлах">
                                    <input
                                      type="text"
                                      name="projects"
                                      value={formData.projects}
                                      onChange={handleInputChange}
                                      placeholder="E-commerce платформ, HR систем"
                                      className={inputClass}
                                    />
                                  </Field>
                                  <Field label="Амжилтууд" hint="Таслалаар тусгаарлах">
                                    <input
                                      type="text"
                                      name="achievements"
                                      value={formData.achievements}
                                      onChange={handleInputChange}
                                      placeholder="Хамгийн шилдэг ажилтан 2023, ..."
                                      className={inputClass}
                                    />
                                  </Field>
                                </div>
                              </div>

                              {/* ── FOOTER ── */}
                              <div className="px-8 py-6 border-t border-black/8 bg-gray-50/80 flex items-center justify-between gap-4 flex-shrink-0">
                                <button
                                  type="button"
                                  onClick={() => setIsModalOpen(false)}
                                  className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-colors px-4 py-3"
                                >
                                  Цуцлах
                                </button>
                                <button
                                  type="submit"
                                  disabled={isSubmitting}
                                  className="group relative overflow-hidden bg-black text-white px-8 py-3.5 flex items-center gap-3 disabled:opacity-50 transition-opacity hover:bg-gray-900"
                                  style={{ borderRadius: '2px' }}
                                >
                                  {isSubmitting ? (
                                    <>
                                      <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Хадгалж байна...</span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Хадгалах</span>
                                      <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                                    </>
                                  )}
                                </button>
                              </div>
                            </form>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* ─── END MODAL ─────────────────────────────────────────────── */}
                </div>
              )}

              {activeTab === 'logs' && user.role === 'admin' && (
                <div className="space-y-8">
                  {/* Chart Section */}
                  <div className="bg-white p-8 border border-black/10 hover:border-black transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">01</span>
                      <div className="flex-1 h-px bg-black/8" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Статистик</span>
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6">Үйлдэл (Албан тушаалаар)</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                          <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} tickLine={false} axisLine={false} />
                          <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} tickLine={false} axisLine={false} />
                          <RechartsTooltip
                            cursor={{ fill: '#F3F4F6' }}
                            contentStyle={{ borderRadius: '2px', border: '1px solid #E5E7EB', boxShadow: 'none', fontSize: '12px', fontWeight: 'bold' }}
                          />
                          <Bar dataKey="count" fill="#000000" radius={[2, 2, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="bg-white p-8 border border-black/10 hover:border-black transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">02</span>
                      <div className="flex-1 h-px bg-black/8" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Лог Жагсаалт</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em]">Бүх лог</h3>
                      <select
                        value={logFilter}
                        onChange={(e) => setLogFilter(e.target.value)}
                        className="px-4 py-2 bg-gray-50 border-0 border-b-2 border-gray-200 focus:border-black focus:outline-none transition-colors duration-200 text-xs font-bold uppercase tracking-wider rounded-none cursor-pointer"
                      >
                        <option value="">Бүх үйлдэл</option>
                        <option value="CREATE">CREATE</option>
                        <option value="UPDATE">UPDATE</option>
                        <option value="DELETE">DELETE</option>
                      </select>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-black/10 text-[10px] font-black uppercase tracking-wider text-gray-400">
                            <th className="py-3 px-4">Огноо</th>
                            <th className="py-3 px-4">Хэрэглэгч</th>
                            <th className="py-3 px-4">Албан тушаал</th>
                            <th className="py-3 px-4">Үйлдэл</th>
                            <th className="py-3 px-4">Тайлбар</th>
                            <th className="py-3 px-4 text-right">Устгах</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredLogs.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="py-8 text-center text-gray-500 text-sm">Лог олдсонгүй</td>
                            </tr>
                          ) : (
                            filteredLogs.map((log, idx) => (
                              <motion.tr
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                key={idx}
                                className="border-b border-black/5 hover:bg-gray-50 transition-colors"
                              >
                                <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">
                                  {new Date(log.createdAt).toLocaleString()}
                                </td>
                                <td className="py-3 px-4 text-xs font-bold">{log.username}</td>
                                <td className="py-3 px-4 text-xs text-gray-600">{log.position}</td>
                                <td className="py-3 px-4">
                                  <span className={`inline-block px-2 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm ${log.action === 'CREATE' ? 'bg-green-100 text-green-700' :
                                      log.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                                        log.action === 'DELETE' ? 'bg-red-100 text-red-700' :
                                          'bg-gray-100 text-gray-700'
                                    }`}>
                                    {log.action}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-xs text-gray-600 max-w-xs truncate" title={log.description}>
                                  {log.description}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <button
                                    onClick={() => handleDeleteLog(log._id)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </td>
                              </motion.tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                    {logs.length > 0 && (
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={handleClearLogs}
                          className="flex items-center gap-2 px-6 py-3 border border-red-200 text-red-600 hover:bg-red-50 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-sm"
                        >
                          <Trash size={14} /> Бүх логийг устгах
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

               {activeTab === 'system_users' && (
                <div className="bg-white p-8 border border-black/10 hover:border-black transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-[0.2em]">Систем хэрэглэгчид</h3>
                      <p className="text-gray-600 mt-1">Системд нэвтрэх эрхтэй хэрэглэгчдийг энд удирдана.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingUserId(null);
                        setUserFormData({ username: '', password: '', role: 'staff' });
                        setIsUserModalOpen(true);
                      }}
                      className="bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-gray-800 transition-colors rounded-sm"
                    >
                      <UserPlus size={14} /> Шинэ хэрэглэгч
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {systemUsers.map((u) => (
                      <motion.div
                        key={u._id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 border border-black/5 hover:border-black transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-12 h-12 rounded-sm flex items-center justify-center ${u.role === 'admin' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
                            {u.role === 'admin' ? <ShieldCheck size={20} /> : <Users size={20} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-black uppercase tracking-tight truncate">{u.username}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{u.role}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingUserId(u._id);
                              setUserFormData({ username: u.username, password: '', role: u.role });
                              setIsUserModalOpen(true);
                            }}
                            className="flex-1 py-2 border border-black/5 text-[9px] font-black uppercase tracking-widest hover:border-black transition-colors rounded-sm"
                          >
                            Засах
                          </button>
                          {user.role === 'admin' && (
                            <button
                              onClick={() => handleDeleteSystemUser(u._id, u.username)}
                              className="px-3 py-2 border border-black/5 text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors rounded-sm"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* User Modal */}
                  <AnimatePresence>
                    {isUserModalOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[210] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
                        onClick={() => setIsUserModalOpen(false)}
                      >
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.95, opacity: 0 }}
                          className="bg-white w-full max-w-md p-8 rounded-sm shadow-2xl relative"
                          onClick={e => e.stopPropagation()}
                        >
                          <button
                            onClick={() => setIsUserModalOpen(false)}
                            className="absolute right-6 top-6 text-gray-400 hover:text-black"
                          >
                            <X size={20} />
                          </button>
                          <h3 className="text-xl font-black uppercase tracking-tighter mb-8">
                            {editingUserId ? 'Хэрэглэгч засах' : 'Шинэ хэрэглэгч нэмэх'}
                          </h3>

                          {userSubmitStatus.message && (
                            <div className={`mb-6 p-4 text-xs font-bold rounded-sm ${userSubmitStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                              {userSubmitStatus.message}
                            </div>
                          )}

                          <form onSubmit={handleSaveSystemUser} className="space-y-6">
                            <Field label="Нэвтрэх нэр">
                              <input
                                type="text"
                                value={userFormData.username}
                                onChange={e => setUserFormData({ ...userFormData, username: e.target.value })}
                                required
                                className={inputClass}
                              />
                            </Field>
                            <Field label={editingUserId ? "Шинэ нууц үг (Заавал биш)" : "Нууц үг"}>
                              <input
                                type="password"
                                value={userFormData.password}
                                onChange={e => setUserFormData({ ...userFormData, password: e.target.value })}
                                required={!editingUserId}
                                className={inputClass}
                              />
                            </Field>
                            {user.role === 'admin' && (
                              <Field label="Эрх">
                                <select
                                  value={userFormData.role}
                                  onChange={e => setUserFormData({ ...userFormData, role: e.target.value })}
                                  className={inputClass}
                                >
                                  <option value="staff">Staff</option>
                                  <option value="admin">Admin</option>
                                </select>
                              </Field>
                            )}
                            <button
                              type="submit"
                              className="w-full bg-black text-white py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors rounded-sm"
                            >
                              {editingUserId ? 'Шинэчлэх' : 'Хадгалах'}
                            </button>
                          </form>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {activeTab === 'settings' && user.role === 'admin' && (
                <div className="bg-white p-8 border border-black/10 hover:border-black transition-colors duration-300 max-w-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">01</span>
                    <div className="flex-1 h-px bg-black/8" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Профайл</span>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6">Нэвтрэх мэдээлэл солих</h3>

                  <AnimatePresence>
                    {profileSubmitStatus.message && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-6 overflow-hidden"
                      >
                        <div className={`px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 ${profileSubmitStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-b border-emerald-200' : 'bg-red-50 text-red-600 border-b border-red-200'
                          }`}>
                          <span>{profileSubmitStatus.type === 'success' ? '✓' : '✕'}</span>
                          {profileSubmitStatus.message}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleProfileUpdate} className="space-y-5">
                    <Field label="Шинэ нэвтрэх нэр" hint="Хоосон орхивол өөрчлөгдөхгүй">
                      <input
                        type="text"
                        value={profileForm.username}
                        onChange={e => setProfileForm(p => ({ ...p, username: e.target.value }))}
                        placeholder={user.username}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Шинэ нууц үг" hint="Хоосон орхивол өөрчлөгдөхгүй">
                      <input
                        type="password"
                        value={profileForm.password}
                        onChange={e => setProfileForm(p => ({ ...p, password: e.target.value }))}
                        placeholder="••••••••"
                        className={inputClass}
                      />
                    </Field>
                    <button
                      type="submit"
                      disabled={isProfileSubmitting || (!profileForm.username && !profileForm.password)}
                      className="group relative overflow-hidden bg-black text-white px-8 py-3.5 flex items-center gap-3 disabled:opacity-50 transition-opacity hover:bg-gray-900 mt-4"
                      style={{ borderRadius: '2px' }}
                    >
                      {isProfileSubmitting ? (
                        <>
                          <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Хадгалж байна...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Хадгалах</span>
                          <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
            {/* Delete Confirmation Modal */}
            <AnimatePresence>
              {deleteConfirm.isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white max-w-sm w-full p-8 rounded-sm shadow-2xl border border-black/10"
                  >
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Trash2 size={28} className="text-red-500" />
                    </div>
                    <h3 className="text-center text-lg font-black uppercase tracking-tighter mb-2">Устгахдаа итгэлтэй байна уу?</h3>
                    <p className="text-center text-gray-500 text-xs font-bold uppercase tracking-wider mb-8 leading-relaxed">
                      "{deleteConfirm.memberName}"-ийг устгаснаар мэдээллийг сэргээх боломжгүй болно.
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setDeleteConfirm({ isOpen: false, memberId: null, memberName: '' })}
                        className="flex-1 px-6 py-4 bg-gray-100 text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors rounded-sm"
                      >
                        Цуцлах
                      </button>
                      <button
                        onClick={handleDeleteMember}
                        className="flex-1 px-6 py-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-700 transition-colors rounded-sm shadow-lg shadow-red-600/20"
                      >
                        Устгах
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </main>
    </div>
  );
}