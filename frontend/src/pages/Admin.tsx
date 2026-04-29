import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { navigateTo } from './Login';
import { LayoutDashboard, Users, Menu } from 'lucide-react';
import { motion } from 'motion/react';

// Hooks
import { useAdminData } from '../hooks/useAdminData';

// Components
import Sidebar from '../components/admin/layout/Sidebar';
import AdminHeader from '../components/admin/layout/AdminHeader';
import SidebarOverlay from '../components/admin/layout/SidebarOverlay';
import AdminContent from '../components/admin/layout/AdminContent';

// Modals
import MemberModal from '../components/admin/modals/MemberModal';
import UserModal from '../components/admin/modals/UserModal';
import DeleteConfirmModal from '../components/admin/modals/DeleteConfirmModal';
import TeamBulkImport from '../components/admin/modals/TeamBulkImport';

export default function Admin() {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const adminData = useAdminData(user, activeTab);

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Ерөнхий', icon: LayoutDashboard, roles: ['admin', 'staff'] },
    { id: 'users', label: 'Багийн гишүүд', icon: Users, roles: ['admin'] },
    { id: 'system_users', label: 'Систем хэрэглэгчид', icon: Users, roles: ['admin', 'staff'] },
    { id: 'website', label: 'Вэбсайт', icon: Menu, roles: ['admin'] },
    { id: 'logs', label: 'Лог', icon: Menu, roles: ['admin'] },
  ].filter(item => item.roles.includes(user?.role));

  const handleLogout = () => {
    logout();
    navigateTo('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans selection:bg-black selection:text-white">
      <SidebarOverlay isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-black transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
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
            />
            <DeleteConfirmModal 
              deleteConfirm={adminData.deleteConfirm} setDeleteConfirm={adminData.setDeleteConfirm} handleDeleteMember={adminData.handleDeleteMember} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}