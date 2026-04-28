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
import DashboardTab from '../components/admin/tabs/DashboardTab';
import WebsiteTab from '../components/admin/tabs/WebsiteTab';
import TeamTab from '../components/admin/tabs/TeamTab';
import SystemUsersTab from '../components/admin/tabs/SystemUsersTab';
import LogsTab from '../components/admin/tabs/LogsTab';
import ProfileTab from '../components/admin/tabs/ProfileTab';

// Modals
import MemberModal from '../components/admin/modals/MemberModal';
import UserModal from '../components/admin/modals/UserModal';
import DeleteConfirmModal from '../components/admin/modals/DeleteConfirmModal';
import TeamBulkImport from '../components/admin/modals/TeamBulkImport';

export default function Admin() {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const {
    formData, isSubmitting, submitStatus, imageInputMode, setImageInputMode,
    imagePrompt, setImagePrompt, isGeneratingImage, teamMembers, isModalOpen, setIsModalOpen,
    editingMemberId, skillsInputRef, logs, logFilter, setLogFilter, teamSearch, setTeamSearch,
    profileForm, setProfileForm, isProfileSubmitting, profileSubmitStatus, isGeneratingTeam,
    generateCount, setGenerateCount, generateStatus, siteSettings, setSiteSettings,
    isSettingsSaving, settingsStatus, deleteConfirm, setDeleteConfirm, systemUsers,
    isUserModalOpen, setIsUserModalOpen, userFormData, setUserFormData, editingUserId,
    setEditingUserId, userSubmitStatus, handleGenerateImage, handleFileUpload, handleProfileUpdate,
    handleAutoTranslate, handleInputChange, openAddModal, openEditModal, handleDeleteMember,
    confirmDelete, handleSaveMember, handleGenerateMembers, handleClearLogs, handleDeleteLog,
    handleSaveSystemUser, handleDeleteSystemUser, handleSaveSettings, chartData, filteredLogs, filteredTeamMembers, isTranslating, fetchTeamMembers
  } = useAdminData(user, activeTab);

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
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                  {menuItems.find(m => m.id === activeTab)?.label || (activeTab === 'settings' ? 'Тохиргоо' : '')}
                </h2>
                <div className="h-px w-full bg-black/10" />
              </div>

              {activeTab === 'dashboard' && <DashboardTab teamMembers={teamMembers} user={user} logs={logs} />}
              {activeTab === 'website' && user.role === 'admin' && (
                <WebsiteTab 
                  siteSettings={siteSettings} setSiteSettings={setSiteSettings} 
                  isSettingsSaving={isSettingsSaving} handleSaveSettings={handleSaveSettings} settingsStatus={settingsStatus} 
                />
              )}
              {activeTab === 'users' && user.role === 'admin' && (
                <TeamTab 
                  teamSearch={teamSearch} setTeamSearch={setTeamSearch} generateCount={generateCount} 
                  setGenerateCount={setGenerateCount} isGeneratingTeam={isGeneratingTeam} 
                  handleGenerateMembers={handleGenerateMembers} openAddModal={openAddModal} 
                  generateStatus={generateStatus} filteredTeamMembers={filteredTeamMembers} 
                  openEditModal={openEditModal} confirmDelete={confirmDelete} 
                  openImportModal={() => setIsImportModalOpen(true)}
                />
              )}
              {activeTab === 'logs' && user.role === 'admin' && (
                <LogsTab 
                  chartData={chartData} logFilter={logFilter} setLogFilter={setLogFilter} 
                  filteredLogs={filteredLogs} handleDeleteLog={handleDeleteLog} 
                  handleClearLogs={handleClearLogs} logs={logs} 
                />
              )}
              {activeTab === 'system_users' && (
                <SystemUsersTab 
                  systemUsers={systemUsers} user={user} setEditingUserId={setEditingUserId} 
                  setUserFormData={setUserFormData} setIsUserModalOpen={setIsUserModalOpen} 
                  handleDeleteSystemUser={handleDeleteSystemUser} 
                />
              )}
              {activeTab === 'settings' && (
                <ProfileTab 
                  user={user} profileForm={profileForm} setProfileForm={setProfileForm} 
                  handleProfileUpdate={handleProfileUpdate} isProfileSubmitting={isProfileSubmitting} 
                  profileSubmitStatus={profileSubmitStatus} 
                />
              )}
            </motion.div>

            <MemberModal 
              isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} editingMemberId={editingMemberId} 
              handleAutoTranslate={handleAutoTranslate} isTranslating={isTranslating} submitStatus={submitStatus} 
              handleSaveMember={handleSaveMember} formData={formData} handleInputChange={handleInputChange} 
              skillsInputRef={skillsInputRef} imageInputMode={imageInputMode} setImageInputMode={setImageInputMode} 
              handleFileUpload={handleFileUpload} imagePrompt={imagePrompt} setImagePrompt={setImagePrompt} 
              handleGenerateImage={handleGenerateImage} isGeneratingImage={isGeneratingImage} isSubmitting={isSubmitting} 
            />
            <UserModal 
              isUserModalOpen={isUserModalOpen} setIsUserModalOpen={setIsUserModalOpen} editingUserId={editingUserId} 
              userSubmitStatus={userSubmitStatus} handleSaveSystemUser={handleSaveSystemUser} 
              userFormData={userFormData} setUserFormData={setUserFormData} user={user} 
            />
            <TeamBulkImport 
              isOpen={isImportModalOpen} 
              onClose={() => setIsImportModalOpen(false)} 
              onImportDone={() => fetchTeamMembers()} 
            />
            <DeleteConfirmModal 
              deleteConfirm={deleteConfirm} setDeleteConfirm={setDeleteConfirm} handleDeleteMember={handleDeleteMember} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}