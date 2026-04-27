import { motion } from 'motion/react';
import { X, Linkedin, Twitter, Mail, Briefcase, GraduationCap, Trophy, Code2, User, ExternalLink } from 'lucide-react';
import { TeamMember } from '../types';

interface ProfileModalProps {
    member: TeamMember;
    onClose: () => void;
}

export default function ProfileModal({ member, onClose }: ProfileModalProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white w-full max-w-5xl rounded-sm relative shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-black/5 flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2 text-black hover:bg-black hover:text-white transition-all duration-500 rounded-sm group"
                >
                    <X size={20} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>


                <div className="p-6 sm:p-10 md:p-14 flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-14">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-[200px] sm:max-w-[240px] aspect-3/4 md:w-72 md:h-96 bg-black flex-shrink-0 relative overflow-hidden rounded-sm shadow-2xl"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                    </motion.div>

                    <div className="flex-1 w-full text-center md:text-left">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xs font-black uppercase tracking-[0.5em] text-gray-400 mb-4 block"
                        >
                            {member.position}
                        </motion.span>
                        <div className="flex flex-col md:flex-row md:items-end justify-center md:justify-start gap-4 mb-8">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black leading-[0.8]"
                            >
                                {member.name}
                            </motion.h2>

                            <div className="flex justify-center md:justify-start space-x-2">
                                {[
                                    { icon: Linkedin, link: member.social.linkedin },
                                    { icon: Twitter, link: member.social.twitter },
                                    { icon: Mail, link: `mailto:${member.social.email}` }
                                ].map((social, i) => (
                                    social.link && (
                                        <motion.a
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + (i * 0.1) }}
                                            href={social.link}
                                            className="w-10 h-10 flex items-center justify-center border border-black/10 text-black hover:bg-black hover:text-white transition-all duration-500 rounded-sm"
                                        >
                                            <social.icon size={16} />
                                        </motion.a>
                                    )
                                ))}
                            </div>
                        </div>
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-4 max-w-2xl mx-auto md:mx-0"
                        >
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <User size={16} className="text-black" />
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Миний тухай</h4>
                            </div>
                            <p className="text-black text-lg sm:text-xl font-bold leading-tight italic tracking-tight border-l-0 md:border-l-4 border-black md:pl-6 py-1">
                                "{member.aboutMe}"
                            </p>
                        </motion.section>
                    </div>
                </div>
                <div className="p-6 sm:p-10 md:p-14 pt-0 md:pt-0">
                    <div className="max-w-3xl space-y-12 sm:space-y-20">
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Briefcase size={18} className="text-black" />
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Туршлага</h4>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                {member.experience}
                            </p>
                        </section>
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Code2 size={18} className="text-black" />
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Ур чадвар</h4>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {(member.skills || []).map((skill, i) => {
                                    const getSkillIcon = (sName: string) => {
                                        const s = sName.toLowerCase().trim();
                                        if (s.includes('graphql')) return '/icons/graphql.svg';
                                        if (s.includes('mysql')) return '/icons/mysql.svg';
                                        if (s.includes('postgre')) return '/icons/postgresql.svg';
                                        if (s.includes('mongo')) return '/icons/mongodb.svg';
                                        if (s.includes('aws')) return '/icons/aws.svg';
                                        if (s.includes('c++') || s.includes('cpp')) return '/icons/cpp.svg';
                                        if (s.includes('react')) return '/icons/react.svg';
                                        if (s.includes('typescript') || s.includes('ts')) return '/icons/typescript.svg';
                                        if (s.includes('node')) return '/icons/nodejs.svg';
                                        if (s.includes('python')) return '/icons/python.svg';
                                        if (s.includes('docker')) return '/icons/docker.svg';
                                        if (s.includes('kubernetes') || s.includes('k8s')) return '/icons/kubernetes.svg';
                                        return null;
                                    };
                                    const icon = getSkillIcon(skill);
                                    return (
                                        <div
                                            key={i}
                                            className="flex items-center gap-4 bg-[#0a0c10] border border-white/20 px-6 py-3 rounded-full hover:border-white/40 transition-colors cursor-default group"
                                        >
                                            {icon ? (
                                                <img src={icon} alt={skill} className="w-6 h-6 invert opacity-80 group-hover:opacity-100 transition-opacity" />
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                            )}
                                            <span className="text-[13px] font-black text-white uppercase tracking-[0.15em]">{skill}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <GraduationCap size={18} className="text-black" />
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Боловсрол</h4>
                            </div>
                            <ul className="space-y-4">
                                {(member.education || []).map((edu, i) => (
                                    <li key={i} className="text-lg font-bold text-black uppercase tracking-tight leading-tight flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 bg-black mt-1.5 flex-shrink-0" />
                                        {edu}
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <ExternalLink size={18} className="text-black" />
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Гол төслүүд</h4>
                            </div>
                            <div className="flex flex-col gap-3">
                                {(member.projects || []).map((project, i) => (
                                    <div key={i} className="p-4 sm:p-5 border border-gray-200 hover:border-black transition-all duration-300 rounded-sm">
                                        <span className="text-lg font-black text-black uppercase tracking-tight">{project}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Trophy size={18} className="text-black" />
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Амжилт</h4>
                            </div>
                            <div className="flex flex-col gap-2">
                                {(member.achievements || []).map((ach, i) => (
                                    <div key={i} className="px-4 py-3 sm:px-5 sm:py-4 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-sm flex items-center">
                                        {ach}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
