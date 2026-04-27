import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { TeamMember } from '../services/api';
import { fetchTeam } from '../services/api';
import ProfileModal from './ProfileModal';

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const data = await fetchTeam();
        setMembers(data);
        if (data.length === 0) {
          setError('No team members found in database.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load team members from backend. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadTeam();
  }, []);

  return (
    <section id="team" className="py-24 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 sm:mb-24 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-[0.5em] text-gray-400 mb-4 block">Бидний хамтын оюун ухаан</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-black leading-[0.8] italic">
              Орчин үеийн <br /> <span className="text-gray-200 not-italic">Архитекторууд</span>
            </h2>
          </div>

        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {members.map((member, index) => (
            <motion.div
              key={member._id || member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedMember(member)}
              className="relative aspect-[3/4] cursor-pointer group bg-black overflow-hidden rounded-sm"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />

              <div className="absolute top-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-20">
                <div className="w-10 h-10 bg-white flex items-center justify-center text-black rounded-full shadow-2xl">
                  <Plus size={20} strokeWidth={2.5} />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                <div className="bg-white/95 backdrop-blur-xl p-3 sm:p-5 shadow-2xl rounded-sm border border-black/5">
                  <h3 className="text-sm sm:text-lg font-black uppercase tracking-tighter text-black leading-none mb-1.5">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
                    {member.position}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-700 z-10" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <ProfileModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
