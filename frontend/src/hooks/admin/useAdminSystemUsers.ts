import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../services/api';
import { SystemUser } from '../../types/admin';

export const useAdminSystemUsers = (user: any, logAction: Function) => {
  const [systemUsers, setSystemUsers] = useState<SystemUser[]>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userFormData, setUserFormData] = useState({ username: '', password: '', role: 'staff' });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userSubmitStatus, setUserSubmitStatus] = useState({ type: '', message: '' });

  const fetchSystemUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`);
      const data = await res.json();
      setSystemUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSystemUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userFormData.username) return;

    try {
      const isUpdate = !!editingUserId;
      const url = isUpdate ? `${API_URL}/users/${editingUserId}` : `${API_URL}/users`;
      const method = isUpdate ? 'PUT' : 'POST';

      const payload: any = { username: userFormData.username, role: userFormData.role };
      if (userFormData.password) payload.password = userFormData.password;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Хадгалахад алдаа гарлаа');
      }

      await logAction(isUpdate ? 'UPDATE' : 'CREATE', `${isUpdate ? 'Системийн хэрэглэгч заслаа' : 'Шинэ системийн хэрэглэгч нэмлээ'}: ${userFormData.username}`, 'Admin');
      setUserSubmitStatus({ type: 'success', message: 'Амжилттай хадгалагдлаа' });
      fetchSystemUsers();
      setTimeout(() => {
        setIsUserModalOpen(false);
        setUserSubmitStatus({ type: '', message: '' });
      }, 1000);
    } catch (err: any) {
      setUserSubmitStatus({ type: 'error', message: err.message });
    }
  };

  const handleDeleteSystemUser = async (id: string, username: string) => {
    if (!window.confirm(`Та ${username} хэрэглэгчийг устгахдаа итгэлтэй байна уу?`)) return;
    try {
      const res = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Устгахад алдаа гарлаа');
      await logAction('DELETE', `Системийн хэрэглэгч устгалаа: ${username}`, 'Admin');
      fetchSystemUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    systemUsers,
    isUserModalOpen, setIsUserModalOpen,
    userFormData, setUserFormData,
    editingUserId, setEditingUserId,
    userSubmitStatus, setUserSubmitStatus,
    fetchSystemUsers,
    handleSaveSystemUser,
    handleDeleteSystemUser
  };
};
