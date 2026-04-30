import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { navigateTo } from './Login';
import { LayoutDashboard, Users, Menu } from 'lucide-react';
import { motion } from 'motion/react';


import { useAdminData } from '../hooks/useAdminData';


import Sidebar from '../components/admin/layout/Sidebar';
import AdminHeader from '../components/admin/layout/AdminHeader';
import SidebarOverlay from '../components/admin/layout/SidebarOverlay';
import AdminContent from '../components/admin/layout/AdminContent';


import MemberModal from '../components/admin/modals/MemberModal';
import UserModal from '../components/admin/modals/UserModal';
import ConfirmModal from '../components/admin/modals/ConfirmModal';
import TeamBulkImport from '../components/admin/modals/TeamBulkImport';

import { useTranslation } from 'react-i18next';

export default function Admin() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const initialTab = (user?.role === 'admin' || user?.permissions?.includes('dashboard')) ? 'dashboard' : 'website';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: null as (() => void) | null,
  });

  const openConfirm = (title: string, description: string, onConfirm: () => void) => {
    setConfirmModal({ isOpen: true, title, description, onConfirm });
  };

  const adminData = useAdminData(user, activeTab, openConfirm);

  const menuItems = [
    { id: 'dashboard', label: t('admin.dashboard'), icon: LayoutDashboard },
    { id: 'users', label: t('admin.teamMembers'), icon: Users },
    { id: 'system_users', label: t('admin.systemUsers'), icon: Users },
    { id: 'website', label: t('admin.website'), icon: Menu },
    { id: 'logs', label: t('admin.logs'), icon: Menu },
  ].filter(item => {
    if (user?.role === 'admin' || user?.permissions?.includes('all')) return true;
    


    return user?.permissions?.includes(item.id);
  });

  const handleLogout = () => {
    logout();
    navigateTo('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans selection:bg-black selection:text-white">
      <SidebarOverlay isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-black transform transition-transform duration-300 lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:block ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar 
          user={user} activeTab={activeTab} setActiveTab={setActiveTab} 
          setIsSidebarOpen={setIsSidebarOpen} menuItems={menuItems} handleLogout={handleLogout} 
        />
      </motion.aside>

      <main className="flex-1 flex flex-col min-h-screen relative overflow-x-hidden">
        <AdminHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex-1 p-6 lg:p-12">
          <div className="max-w-5xl mx-auto">
            <AdminContent 
              {...adminData} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              user={user} 
              menuItems={menuItems} 
              openImportModal={() => setIsImportModalOpen(true)}
            />

            <MemberModal 
              isModalOpen={adminData.isModalOpen} setIsModalOpen={adminData.setIsModalOpen} editingMemberId={adminData.editingMemberId} 
              handleAutoTranslate={adminData.handleAutoTranslate} isTranslating={adminData.isTranslating} submitStatus={adminData.submitStatus} 
              handleSaveMember={adminData.handleSaveMember} formData={adminData.formData} handleInputChange={adminData.handleInputChange} 
              setFormData={adminData.setFormData}
              imageInputMode={adminData.imageInputMode} setImageInputMode={adminData.setImageInputMode} 
              handleFileUpload={adminData.handleFileUpload} isSubmitting={adminData.isSubmitting} 
            />
            <UserModal 
              isUserModalOpen={adminData.isUserModalOpen} setIsUserModalOpen={adminData.setIsUserModalOpen} editingUserId={adminData.editingUserId} 
              userSubmitStatus={adminData.userSubmitStatus} handleSaveSystemUser={adminData.handleSaveSystemUser} 
              userFormData={adminData.userFormData} setUserFormData={adminData.setUserFormData} user={user} 
            />
            <TeamBulkImport 
              isOpen={isImportModalOpen} 
              onClose={() => setIsImportModalOpen(false)} 
              onImportDone={() => adminData.fetchTeamMembers()} 
              user={user}
            />
            <ConfirmModal 
              state={confirmModal} 
              onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}