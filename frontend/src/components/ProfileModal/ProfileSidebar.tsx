import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { TeamMember } from '../../types';
import { getSkillIcon } from '../../utils/skillIcons';
import { translateData } from '../../utils/translateData';

interface ProfileSidebarProps {
    member: TeamMember;
}

export default function ProfileSidebar({ member }: ProfileSidebarProps) {
    const { t } = useTranslation();
    return (
        <div className="w-full md:w-80 flex-shrink-0 bg-[#0a0c10] flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

            {/* Photo */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full aspect-[3/4] overflow-hidden"
            >
                <motion.img
                    initial={{ scale: 1.1, filter: 'grayscale(100%)' }}
                    animate={{ scale: 1, filter: 'grayscale(100%)' }}
                    whileHover={{ scale: 1.05, filter: 'grayscale(0%)' }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent opacity-80" />
            </motion.div>

            {/* Name + position */}
            <div className="px-8 py-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 block mb-2">
                        {t('language') === 'en' ? (member.position_en || translateData(member.position)) : member.position}
                    </span>
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-white leading-tight mb-4">
                        {t('language') === 'en' ? (member.name_en || member.name) : member.name}
                    </h2>
                </motion.div>

                {/* Social links */}
                <div className="flex gap-2.5 mb-8">
                    {[
                        { icon: Linkedin, link: member.social.linkedin },
                        { icon: Twitter, link: member.social.twitter },
                        { icon: Mail, link: member.social.email ? `mailto:${member.social.email}` : undefined },
                    ].map((s, i) =>
                        s.link ? (
                            <motion.a
                                key={i}
                                href={s.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 hover:text-white transition-all duration-300 rounded-sm"
                            >
                                <s.icon size={16} />
                            </motion.a>
                        ) : null
                    )}
                </div>

                {/* Skills */}
                {member.skills?.length > 0 && (
                    <div className="space-y-4 pt-6 border-t border-white/5">
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600">{t('team.skills')}</p>
                        <div className="flex flex-wrap gap-2">
                            {member.skills.map((skill, i) => {
                                const icon = getSkillIcon(skill);
                                return (
                                    <motion.div
                                        key={i}
                                        title={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + i * 0.05 }}
                                        whileHover={{ scale: 1.1, borderColor: 'rgba(255,255,255,0.3)' }}
                                        className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
                                    >
                                        {icon ? (
                                            <img src={icon} alt={skill} className="w-5 h-5 grayscale hover:grayscale-0 transition-all duration-300" />
                                        ) : (
                                            <span className="text-[10px] font-black text-white/30 uppercase">{skill.slice(0, 2)}</span>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
