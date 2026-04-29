import { useState, useMemo } from 'react';
import { API_URL } from '../../services/api';
import { AdminLog } from '../../types/admin';

export const useAdminLogs = (user: any, activeTab: string) => {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [logFilter, setLogFilter] = useState('');

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API_URL}/logs`);
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const logAction = async (action: string, description: string, position: string) => {
    if (!user) return;
    try {
      await fetch(`${API_URL}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          user: user.username,
          description,
          position,
        }),
      });
      if (activeTab === 'logs' || activeTab === 'dashboard') fetchLogs();
    } catch (err) {
      console.error('Failed to log action:', err);
    }
  };

  const handleClearLogs = async () => {
    if (!window.confirm('Бүх логийг устгах уу?')) return;
    try {
      await fetch(`${API_URL}/logs`, { method: 'DELETE' });
      fetchLogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLog = async (id: string) => {
    if (!window.confirm('Энэ логийг устгах уу?')) return;
    try {
      await fetch(`${API_URL}/logs/${id}`, { method: 'DELETE' });
      fetchLogs();
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = useMemo(() => {
    const actionCounts = logs.reduce((acc: Record<string, number>, log: AdminLog) => {
      acc[log.action] = (acc[log.action] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(actionCounts).map((key) => ({
      name: key,
      value: actionCounts[key],
    }));
  }, [logs]);

  const filteredLogs = logs.filter((log) => logFilter === '' || log.action === logFilter);

  return {
    logs,
    logFilter,
    setLogFilter,
    fetchLogs,
    logAction,
    handleClearLogs,
    handleDeleteLog,
    chartData,
    filteredLogs,
  };
};
