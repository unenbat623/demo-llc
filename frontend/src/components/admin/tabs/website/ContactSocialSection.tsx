import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Field, inputClass, textareaClass } from '../../shared/AdminShared';
import { SiteSettings } from '../../../../types/admin';

interface ContactSocialSectionProps {
  siteSettings: SiteSettings;
  activeLang: 'mn' | 'en';
  updateField: (field: keyof SiteSettings, value: string) => void;
}

const ContactSocialSection: React.FC<ContactSocialSectionProps> = ({
  siteSettings,
  activeLang,
  updateField,
}) => {
  return (
    <div className="space-y-8">
      {/* Contact Info */}
      <div className="space-y-4">

          <Field label="И-мэйл хаяг" icon={<Mail size={14} className="text-gray-400" />}>
            <input
              type="email"
              value={siteSettings.contactEmail}
              onChange={e => updateField('contactEmail', e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Утасны дугаар" icon={<Phone size={14} className="text-gray-400" />}>
            <input
              type="text"
              value={siteSettings.contactPhone}
              onChange={e => updateField('contactPhone', e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label={activeLang === 'mn' ? "Хаяг байршил" : "Address"} icon={<MapPin size={14} className="text-gray-400" />}>
            <textarea
              rows={3}
              value={activeLang === 'mn' ? siteSettings.address : siteSettings.address_en}
              onChange={e => updateField(activeLang === 'mn' ? 'address' : 'address_en', e.target.value)}
              className={textareaClass}
            />
          </Field>
        </div>

      {/* Social Media Links */}
      <div className="space-y-4">
        <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Сошиал сувгууд</h5>

        <div className="space-y-4">
          {[
            { id: 'facebook', icon: Facebook, color: 'bg-blue-600' },
            { id: 'twitter', icon: Twitter, color: 'bg-sky-500' },
            { id: 'linkedin', icon: Linkedin, color: 'bg-blue-700' },
            { id: 'instagram', icon: Instagram, color: 'bg-pink-600' }
          ].map(social => (
            <div key={social.id} className="flex items-center gap-3">
              <div className={`w-10 h-10 ${social.color} rounded-sm flex items-center justify-center text-white`}><social.icon size={20} /></div>
              <div className="flex-1">
                <input
                  type="text"
                  value={(siteSettings as any)[social.id]}
                  onChange={e => updateField(social.id as any, e.target.value)}
                  className={inputClass}
                  placeholder={`${social.id.charAt(0).toUpperCase() + social.id.slice(1)} URL`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactSocialSection;
