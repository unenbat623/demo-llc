import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Globe, MessageCircle } from 'lucide-react';
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
    <div className="space-y-12">
      {/* Contact Info */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-black/5">
          <MessageCircle size={14} className="text-black" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Холбоо барих мэдээлэл</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="И-мэйл хаяг" icon={<Mail size={12} />}>
            <div className="relative">
              <Mail size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                type="email"
                value={siteSettings.contactEmail}
                onChange={e => updateField('contactEmail', e.target.value)}
                className={`${inputClass} pl-10`}
                placeholder="info@tavanbogdtech.mn"
              />
            </div>
          </Field>

          <Field label="Утасны дугаар" icon={<Phone size={12} />}>
            <div className="relative">
              <Phone size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                type="text"
                value={siteSettings.contactPhone}
                onChange={e => updateField('contactPhone', e.target.value)}
                className={`${inputClass} pl-10`}
                placeholder="+976 7000 0000"
              />
            </div>
          </Field>

          <div className="md:col-span-2">
            <Field label={activeLang === 'mn' ? "Хаяг байршил" : "Address"} icon={<MapPin size={12} />}>
              <div className="relative">
                <MapPin size={12} className="absolute left-3 top-5 text-gray-300" />
                <textarea
                  rows={3}
                  value={activeLang === 'mn' ? siteSettings.address : siteSettings.address_en}
                  onChange={e => updateField(activeLang === 'mn' ? 'address' : 'address_en', e.target.value)}
                  className={`${textareaClass} pl-10 pt-4`}
                  placeholder="..."
                />
              </div>
            </Field>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-black/5">
          <Globe size={14} className="text-black" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Сошиал сувгууд</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'facebook', icon: Facebook, color: 'text-blue-600', label: 'Facebook' },
            { id: 'twitter', icon: Twitter, color: 'text-sky-500', label: 'Twitter' },
            { id: 'linkedin', icon: Linkedin, color: 'text-blue-700', label: 'LinkedIn' },
            { id: 'instagram', icon: Instagram, color: 'text-pink-600', label: 'Instagram' }
          ].map(social => (
            <div key={social.id} className="group flex items-center gap-0 bg-gray-50/50 rounded-sm border border-black/5 focus-within:border-black transition-all overflow-hidden">
              <div className="w-12 h-12 flex items-center justify-center bg-white border-r border-black/5">
                <social.icon size={18} className={`${social.color} opacity-80 group-focus-within:opacity-100 transition-opacity`} />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={(siteSettings as any)[social.id]}
                  onChange={e => updateField(social.id as any, e.target.value)}
                  className="w-full bg-transparent px-4 py-3 text-xs font-bold focus:outline-none placeholder:text-gray-300"
                  placeholder={`${social.label} URL...`}
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
