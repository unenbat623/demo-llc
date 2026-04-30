import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_URL } from '../services/api';
import { SiteSettings } from '../types/admin';
import { useTranslation } from 'react-i18next';

interface SettingsContextType {
  settings: SiteSettings | null;
  isLoading: boolean;
  t_site: (key: keyof SiteSettings) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children, overrideSettings }: { children: ReactNode, overrideSettings?: SiteSettings | null }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/settings`);
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error('Failed to fetch site settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (overrideSettings) {
      setSettings(overrideSettings);
      setIsLoading(false);
    } else {
      fetchSettings();
    }
  }, [overrideSettings]);

  useEffect(() => {
    if (settings) {
      const root = document.documentElement;
      root.style.setProperty('--color-primary', settings.primaryColor || '#000000');
      root.style.setProperty('--color-secondary', settings.secondaryColor || '#ffffff');
      root.style.setProperty('--color-accent', settings.accentColor || '#f8f8f8');
      root.style.setProperty('--color-text-main', settings.textColor || '#1a1a1a');
    }
  }, [settings]);

  const t_site = (key: keyof SiteSettings): string => {
    if (!settings) return '';
    const currentLang = i18n.language; // 'mn' or 'en'
    
    if (currentLang === 'en') {
      const enKey = `${String(key)}_en` as keyof SiteSettings;
      return settings[enKey] || settings[key] || '';
    }
    
    return settings[key] || '';
  };

  return (
    <SettingsContext.Provider value={{ settings, isLoading, t_site }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
