import React from 'react';
import { motion } from 'motion/react';
import { TeamMember, AdminLog, SystemUser, SiteSettings } from '../../../types/admin';

// Tabs
import DashboardTab from '../tabs/DashboardTab';
import WebsiteTab from '../tabs/WebsiteTab';
import TeamTab from '../tabs/TeamTab';
import LogsTab from '../tabs/LogsTab';
import SystemUsersTab from '../tabs/SystemUsersTab';
import ProfileTab from '../tabs/ProfileTab';

interface AdminContentProps {
  activeTab: string;
  user: any;
  teamMembers: TeamMember[];
  logs: AdminLog[];
  siteSettings: SiteSettings;
  systemUsers: SystemUser[];
  // ... many props ...
  [key: string]: any;
}

const AdminContent: React.FC<AdminContentProps> = ({
  activeTab,
  user,
  teamMembers,
  logs,
  siteSettings,
  systemUsers,
  ...rest
}) => {
  const menuItems = rest.menuItems || [];

  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="mb-4">
        <h2 className="text-xl font-black uppercase tracking-tight mb-2">
          {menuItems.find((m: any) => m.id === activeTab)?.label || (activeTab === 'settings' ? 'Профайл' : '')}
        </h2>
        <div className="h-0.5 w-full bg-black/5" />
      </div>

      <div className="min-h-[70vh]">
        {activeTab === 'dashboard' && <DashboardTab teamMembers={teamMembers} user={user} logs={logs} />}
        
        {activeTab === 'website' && user.role === 'admin' && (
          <WebsiteTab 
            siteSettings={siteSettings} setSiteSettings={rest.setSiteSettings} 
            isSettingsSaving={rest.isSettingsSaving} handleSaveSettings={rest.handleSaveSettings} 
            settingsStatus={rest.settingsStatus}
            bgInputMode={rest.bgInputMode} setBgInputMode={rest.setBgInputMode}
            imgInputMode={rest.imgInputMode} setImgInputMode={rest.setImgInputMode}
            handleFileUpload={rest.handleSettingsFileUpload}
          />
        )}

        {activeTab === 'users' && user.role === 'admin' && (
          <TeamTab 
            teamSearch={rest.teamSearch} setTeamSearch={rest.setTeamSearch} openAddModal={rest.openAddModal} 
            filteredTeamMembers={rest.filteredTeamMembers} 
            openEditModal={rest.openEditModal} confirmDelete={rest.confirmDelete} 
            openImportModal={rest.openImportModal}
            selectedTeamMembers={rest.selectedTeamMembers}
            setSelectedTeamMembers={rest.setSelectedTeamMembers}
            handleBulkDeleteTeamMembers={rest.handleBulkDeleteTeamMembers}
          />
        )}

        {activeTab === 'logs' && user.role === 'admin' && (
          <LogsTab 
            chartData={rest.chartData} logFilter={rest.logFilter} setLogFilter={rest.setLogFilter} 
            filteredLogs={rest.filteredLogs} handleDeleteLog={rest.handleDeleteLog} 
            handleClearLogs={rest.handleClearLogs} logs={logs} 
          />
        )}

        {activeTab === 'system_users' && (
          <SystemUsersTab 
            systemUsers={systemUsers} user={user} setEditingUserId={rest.setEditingUserId} 
            setUserFormData={rest.setUserFormData} setIsUserModalOpen={rest.setIsUserModalOpen} 
            handleDeleteSystemUser={rest.handleDeleteSystemUser} 
          />
        )}

        {activeTab === 'settings' && (
          <ProfileTab 
            user={user} profileForm={rest.profileForm} setProfileForm={rest.setProfileForm} 
            handleProfileUpdate={rest.handleProfileUpdate} isProfileSubmitting={rest.isProfileSubmitting} 
            profileSubmitStatus={rest.profileSubmitStatus} 
          />
        )}
      </div>
    </motion.div>
  );
};

export default AdminContent;
