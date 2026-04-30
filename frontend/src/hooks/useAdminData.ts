import { useEffect } from 'react';
import { useAdminLogs } from './admin/useAdminLogs';
import { useAdminTeam } from './admin/useAdminTeam';
import { useAdminSystemUsers } from './admin/useAdminSystemUsers';
import { useAdminSettings } from './admin/useAdminSettings';

export const useAdminData = (user: any, activeTab: string, openConfirm: (t: string, d: string, o: () => void) => void) => {
  const logsHook = useAdminLogs(user, activeTab, openConfirm);
  const teamHook = useAdminTeam(user, logsHook.logAction, openConfirm);
  const systemUsersHook = useAdminSystemUsers(user, logsHook.logAction, openConfirm);
  const settingsHook = useAdminSettings(user, logsHook.logAction);

  useEffect(() => {
    if ((activeTab === 'users' || activeTab === 'dashboard') && user && teamHook.teamMembers.length === 0) {
      teamHook.fetchTeamMembers();
    }
    if ((activeTab === 'logs' || activeTab === 'dashboard') && user?.role === 'admin' && logsHook.logs.length === 0) {
      logsHook.fetchLogs();
    }
    if (activeTab === 'website' && user?.role === 'admin' && !settingsHook.siteSettings?.heroTitle_mn) {
      settingsHook.fetchSettings();
    }
    if (activeTab === 'system_users' && user && systemUsersHook.systemUsers.length === 0) {
      systemUsersHook.fetchSystemUsers();
    }
  }, [activeTab, user]); // Note: We don't include the fetch functions in the dependency array to avoid infinite loops if they aren't memoized.

  return {
    ...teamHook,
    ...logsHook,
    ...systemUsersHook,
    ...settingsHook,
  };
};
