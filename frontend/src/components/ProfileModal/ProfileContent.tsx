import { motion } from 'motion/react';
import { User, Briefcase, GraduationCap, ExternalLink, Trophy } from 'lucide-react';
import { TeamMember } from '../../types';

interface ProfileContentProps {
    member: TeamMember;
}

export default function ProfileContent({ member }: ProfileContentProps) {
    const timelineItems = [
        {
            id: 'about',
            icon: User,
            label: 'Миний тухай',
            content: (
                <p className="text-black text-[15px] font-medium leading-relaxed italic tracking-tight border-l-2 border-black pl-5 hover:text-gray-600 transition-all duration-500 cursor-default">
                    "{member.aboutMe}"
                </p>
            ),
        },
        {
            id: 'experience',
            icon: Briefcase,
            label: 'Туршлага',
            content: (
                <p className="text-gray-600 text-[15px] leading-relaxed font-medium hover:text-black transition-colors duration-500 cursor-default">
                    {member.experience}
                </p>
            ),
        },
        ...(member.education?.length ? [{
            id: 'education',
            icon: GraduationCap,
            label: 'Боловсрол',
            content: (
                <ul className="space-y-3">
                    {member.education.map((edu, i) => (
                        <li key={i} className="text-sm font-bold text-black uppercase tracking-wider leading-tight flex items-center gap-3 hover:text-gray-500 transition-colors duration-500 cursor-default group">
                            <span className="w-1 h-1 bg-black flex-shrink-0 rounded-full group-hover:scale-150 transition-transform duration-500" />
                            {edu}
                        </li>
                    ))}
                </ul>
            ),
        }] : []),
        ...(member.projects?.length ? [{
            id: 'projects',
            icon: ExternalLink,
            label: 'Гол төслүүд',
            content: (
                <div className="grid grid-cols-1 gap-2">
                    {member.projects.map((project, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ x: 4 }}
                            className="px-4 py-3 border border-gray-100 hover:border-black/20 hover:bg-black/5 text-black transition-all duration-300 rounded-sm cursor-default flex items-center justify-between group"
                        >
                            <span className="text-xs font-black uppercase tracking-widest">{project}</span>
                            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            ),
        }] : []),
        ...(member.achievements?.length ? [{
            id: 'achievements',
            icon: Trophy,
            label: 'Амжилт',
            content: (
                <div className="flex flex-col gap-2">
                    {member.achievements.map((ach, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            className="px-4 py-3 bg-black text-white hover:bg-gray-900 transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm flex items-center gap-3 cursor-default shadow-lg shadow-black/5"
                        >
                            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                                <Trophy size={10} className="text-white" />
                            </div>
                            {ach}
                        </motion.div>
                    ))}
                </div>
            ),
        }] : []),
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
    };

    return (
        <div className="flex-1 bg-white relative overflow-hidden">
            <div className="absolute inset-0 overflow-y-auto p-10 md:p-14 custom-scrollbar">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative pl-10"
                >
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        className="absolute left-3.5 top-2 bottom-2 w-px bg-gray-100 origin-top"
                    />

                    {timelineItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className={`relative ${index < timelineItems.length - 1 ? 'mb-12' : ''}`}
                        >
                            <div className="absolute -left-10 top-0.5 flex flex-col items-center">
                                <motion.div
                                    whileHover={{ scale: 1.2, backgroundColor: '#000' }}
                                    className="w-7 h-7 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm transition-colors duration-300"
                                >
                                    <item.icon size={12} className="text-black group-hover:text-white transition-colors" />
                                </motion.div>
                            </div>

                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4 pt-1">
                                {item.label}
                            </h4>

                            <div className="text-sm">
                                {item.content}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
