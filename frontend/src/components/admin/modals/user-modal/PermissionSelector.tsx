import React from 'react';
import { Shield } from 'lucide-react';
import { Field } from '../../shared/AdminShared';
import { useTranslation } from 'react-i18next';

interface PermissionSelectorProps {
  permissions: string[];
  onChange: (permissions: string[]) => void;
}

const PermissionSelector: React.FC<PermissionSelectorProps> = ({ permissions, onChange }) => {
  const { t } = useTranslation();

  const permsList = [
    { id: 'dashboard', label: t('admin.dashboard') },
    { id: 'users', label: t('admin.teamMembers') },
    { id: 'system_users', label: t('admin.systemUsers') },
    { id: 'website', label: t('admin.website') },
    { id: 'logs', label: t('admin.logs') },
  ];

  return (
    <Field label={t('admin.permissions') || "Хандах эрхүүд (Permissions)"} icon={<Shield size={14} className="text-gray-400" />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        {permsList.map(perm => (
          <label key={perm.id} className="flex items-center gap-3 p-3 border border-black/5 bg-gray-50 rounded-sm cursor-pointer hover:border-black/20 transition-colors">
            <input
              type="checkbox"
              checked={permissions.includes(perm.id)}
              onChange={(e) => {
                const checked = e.target.checked;
                onChange(checked ? [...permissions, perm.id] : permissions.filter(p => p !== perm.id));
              }}
              className="w-4 h-4 accent-black"
            />
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">{perm.label}</span>
          </label>
        ))}
      </div>
    </Field>
  );
};

export default PermissionSelector;
