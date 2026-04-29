import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Eye, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TeamMember, fetchTeam } from '../services/api';
import { translateData } from '../utils/translateData';
import ProfileModal from './ProfileModal';

export default function Team() {
  const { t, i18n } = useTranslation();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        setLoading(true);
        const data = await fetchTeam();
        setMembers(data);
        if (data.length === 0) {
          setError(t('team.noMembers') || 'Team members not found.');
        }
      } catch (err) {
        console.error(err);
        setError(t('team.loadError') || 'Error loading team information. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadTeam();
  }, [t]);

  return (
    <section id="team" className="py-20 bg-[#f8f8f8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-3">
              <Users size={14} className="text-black" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black">Expert Minds</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black leading-tight italic">
              {t('team.title')}
            </h2>
          </div>
          <p className="text-gray-500 text-base font-medium max-w-sm leading-relaxed tracking-tight">
            {t('team.description')}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-1 bg-gray-200 overflow-hidden rounded-full">
              <div className="h-full bg-black animate-[loading_1.5s_infinite_ease-in-out]" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white border border-black/5 rounded-sm">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member, index) => (
              <motion.div
                key={member._id || member.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                onClick={() => setSelectedMember(member)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden rounded-sm mb-4 shadow-sm">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-4 py-2 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <Eye size={12} /> Харах
                    </div>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-lg font-black uppercase tracking-tight text-black leading-none">
                    {i18n.language === 'en' ? (member.name_en || member.name) : member.name}
                  </h3>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">
                    {i18n.language === 'en' ? (member.position_en || translateData(member.position)) : member.position}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedMember && (
          <ProfileModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
