import { useEffect } from 'react';
import { useAdminLogs } from './admin/useAdminLogs';
import { useAdminTeam } from './admin/useAdminTeam';
import { useAdminSystemUsers } from './admin/useAdminSystemUsers';
import { useAdminSettings } from './admin/useAdminSettings';

export const useAdminData = (user: any, activeTab: string) => {
  const logsHook = useAdminLogs(user, activeTab);
  const teamHook = useAdminTeam(logsHook.logAction);
  const systemUsersHook = useAdminSystemUsers(user, logsHook.logAction);
  const settingsHook = useAdminSettings(logsHook.logAction);

  useEffect(() => {
    if ((activeTab === 'users' || activeTab === 'dashboard') && user) {
      teamHook.fetchTeamMembers();
    }
    if ((activeTab === 'logs' || activeTab === 'dashboard') && user?.role === 'admin') {
      logsHook.fetchLogs();
    }
    if (activeTab === 'website' && user?.role === 'admin') {
      settingsHook.fetchSettings();
    }
    if (activeTab === 'system_users' && user) {
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
