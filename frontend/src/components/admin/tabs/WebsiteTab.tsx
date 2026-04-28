import React from 'react';
import { motion } from 'motion/react';
import { Save } from 'lucide-react';
import { Field, inputClass, textareaClass } from '../shared/AdminShared';

interface WebsiteTabProps {
  siteSettings: any;
  setSiteSettings: (settings: any) => void;
  isSettingsSaving: boolean;
  handleSaveSettings: () => void;
  settingsStatus: { type: string, message: string };
}

const WebsiteTab: React.FC<WebsiteTabProps> = ({
  siteSettings,
  setSiteSettings,
  isSettingsSaving,
  handleSaveSettings,
  settingsStatus
}) => {
  return (
    <div className="bg-white p-8 border border-black/10 hover:border-black transition-colors duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em]">Вэбсайт тохиргоо</h3>
          <p className="text-gray-600 mt-1">Вэбсайтын ерөнхий мэдээллийг эндээс удирдана.</p>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={isSettingsSaving}
          className="group relative overflow-hidden bg-black rounded-sm text-white px-8 py-3 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gray-800 transition-transform duration-500 ease-[0.16,1,0.3,1] -translate-x-full group-hover:translate-x-0" />
          <span className="relative text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            {isSettingsSaving ? 'Хадгалж байна...' : <><Save size={16} /> Хадгалах</>}
          </span>
        </button>
      </div>

      {settingsStatus.message && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`mb-6 p-4 text-xs font-bold rounded-sm ${settingsStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
            }`}
        >
          {settingsStatus.message}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {/* Section: Navbar & Hero */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">01</span>
            <div className="flex-1 h-px bg-black/5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Navbar & Hero</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Вэбсайт нэр">
              <input
                type="text"
                value={siteSettings.siteTitle}
                onChange={e => setSiteSettings({ ...siteSettings, siteTitle: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Navbar Лого">
              <input
                type="text"
                value={siteSettings.navbarLogo}
                onChange={e => setSiteSettings({ ...siteSettings, navbarLogo: e.target.value })}
                className={inputClass}
              />
            </Field>
          </div>
          <Field label="Hero Гарчиг">
            <input
              type="text"
              value={siteSettings.heroTitle}
              onChange={e => setSiteSettings({ ...siteSettings, heroTitle: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Hero Тайлбар">
            <textarea
              rows={3}
              value={siteSettings.heroDescription}
              onChange={e => setSiteSettings({ ...siteSettings, heroDescription: e.target.value })}
              className={textareaClass}
            />
          </Field>
          <Field label="CTA Товчлуур">
            <input
              type="text"
              value={siteSettings.ctaText}
              onChange={e => setSiteSettings({ ...siteSettings, ctaText: e.target.value })}
              className={inputClass}
            />
          </Field>
        </div>

        {/* Section: About Us */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">02</span>
            <div className="flex-1 h-px bg-black/5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Бидний тухай</span>
          </div>
          <Field label="Хэсгийн гарчиг">
            <input
              type="text"
              value={siteSettings.aboutTitle}
              onChange={e => setSiteSettings({ ...siteSettings, aboutTitle: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Хэсгийн тайлбар">
            <textarea
              rows={5}
              value={siteSettings.aboutDescription}
              onChange={e => setSiteSettings({ ...siteSettings, aboutDescription: e.target.value })}
              className={textareaClass}
            />
          </Field>
        </div>

        {/* Section: Contact & Footer */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">03</span>
            <div className="flex-1 h-px bg-black/5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Холбоо барих</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="И-мэйл">
              <input
                type="email"
                value={siteSettings.contactEmail}
                onChange={e => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Утас">
              <input
                type="text"
                value={siteSettings.contactPhone}
                onChange={e => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                className={inputClass}
              />
            </Field>
          </div>
          <Field label="Хаяг">
            <textarea
              rows={2}
              value={siteSettings.address}
              onChange={e => setSiteSettings({ ...siteSettings, address: e.target.value })}
              className={textareaClass}
            />
          </Field>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">04</span>
            <div className="flex-1 h-px bg-black/5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Footer</span>
          </div>
          <Field label="Copyright текст">
            <input
              type="text"
              value={siteSettings.footerText}
              onChange={e => setSiteSettings({ ...siteSettings, footerText: e.target.value })}
              className={inputClass}
            />
          </Field>
        </div>
      </div>
    </div>
  );
};

export default WebsiteTab;
