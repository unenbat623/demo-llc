import { motion, AnimatePresence } from 'motion/react';
import { X, Linkedin, Twitter, Mail, Briefcase, GraduationCap, Trophy, ExternalLink, User } from 'lucide-react';
import { TeamMember } from '../types';

interface ProfileModalProps {
    member: TeamMember;
    onClose: () => void;
}

const getSkillIcon = (sName: string): string | null => {
    const s = sName.toLowerCase().trim();
    if (s.includes('graphql')) return 'https://cdn.simpleicons.org/graphql/E10098';
    if (s.includes('mysql')) return 'https://cdn.simpleicons.org/mysql/4479A1';
    if (s.includes('postgre')) return 'https://cdn.simpleicons.org/postgresql/4169E1';
    if (s.includes('mongo')) return 'https://cdn.simpleicons.org/mongodb/47A248';
    if (s.includes('aws')) return 'https://cdn.simpleicons.org/amazonaws/232F3E';
    if (s.includes('c++') || s.includes('cpp')) return 'https://cdn.simpleicons.org/cplusplus/00599C';
    if (s.includes('react')) return 'https://cdn.simpleicons.org/react/61DAFB';
    if (s.includes('typescript') || s === 'ts') return 'https://cdn.simpleicons.org/typescript/3178C6';
    if (s.includes('node')) return 'https://cdn.simpleicons.org/nodedotjs/339933';
    if (s.includes('python')) return 'https://cdn.simpleicons.org/python/3776AB';
    if (s.includes('docker')) return 'https://cdn.simpleicons.org/docker/2496ED';
    if (s.includes('kubernetes') || s.includes('k8s')) return 'https://cdn.simpleicons.org/kubernetes/326CE5';
    if (s.includes('figma')) return 'https://cdn.simpleicons.org/figma/F24E1E';
    if (s.includes('javascript') || s === 'js') return 'https://cdn.simpleicons.org/javascript/F7DF1E';
    if (s.includes('tailwind')) return 'https://cdn.simpleicons.org/tailwindcss/06B6D4';
    if (s.includes('next')) return 'https://cdn.simpleicons.org/nextdotjs/000000';
    if (s.includes('vue')) return 'https://cdn.simpleicons.org/vuedotjs/4FC08D';
    if (s.includes('angular')) return 'https://cdn.simpleicons.org/angular/DD0031';
    if (s.includes('svelte')) return 'https://cdn.simpleicons.org/svelte/FF3E00';
    if (s.includes('flutter')) return 'https://cdn.simpleicons.org/flutter/02569B';
    if (s.includes('swift')) return 'https://cdn.simpleicons.org/swift/F05138';
    if (s.includes('kotlin')) return 'https://cdn.simpleicons.org/kotlin/7F52FF';
    if (s.includes('rust')) return 'https://cdn.simpleicons.org/rust/000000';
    if (s.includes('go') && s.length <= 2) return 'https://cdn.simpleicons.org/go/00ADD8';
    if (s.includes('redis')) return 'https://cdn.simpleicons.org/redis/FF4438';
    if (s.includes('firebase')) return 'https://cdn.simpleicons.org/firebase/FFCA28';
    if (s.includes('git')) return 'https://cdn.simpleicons.org/git/F05032';
    if (s.includes('linux')) return 'https://cdn.simpleicons.org/linux/FCC624';
    if (s.includes('sass') || s.includes('scss')) return 'https://cdn.simpleicons.org/sass/CC6699';
    if (s.includes('css')) return 'https://cdn.simpleicons.org/css3/1572B6';
    if (s.includes('html')) return 'https://cdn.simpleicons.org/html5/E34F26';
    if (s.includes('php')) return 'https://cdn.simpleicons.org/php/777BB4';
    if (s.includes('laravel')) return 'https://cdn.simpleicons.org/laravel/FF2D20';
    if (s.includes('django')) return 'https://cdn.simpleicons.org/django/092E20';
    if (s.includes('spring')) return 'https://cdn.simpleicons.org/spring/6DB33F';
    if (s.includes('java') && !s.includes('script')) return 'https://cdn.simpleicons.org/java/007396';
    if (s.includes('c#') || s.includes('csharp')) return 'https://cdn.simpleicons.org/csharp/239120';
    if (s.includes('unity')) return 'https://cdn.simpleicons.org/unity/000000';
    if (s.includes('unreal')) return 'https://cdn.simpleicons.org/unrealengine/000000';
    if (s.includes('blender')) return 'https://cdn.simpleicons.org/blender/F5792A';
    if (s.includes('adobe')) return 'https://cdn.simpleicons.org/adobe/FF0000';
    if (s.includes('photoshop')) return 'https://cdn.simpleicons.org/adobephotoshop/31A8FF';
    if (s.includes('illustrator')) return 'https://cdn.simpleicons.org/adobeillustrator/FF9A00';
    if (s.includes('xd')) return 'https://cdn.simpleicons.org/adobexd/FF61F6';
    if (s.includes('vercel')) return 'https://cdn.simpleicons.org/vercel/000000';
    if (s.includes('netlify')) return 'https://cdn.simpleicons.org/netlify/00C7B7';
    if (s.includes('github')) return 'https://cdn.simpleicons.org/github/181717';
    if (s.includes('gitlab')) return 'https://cdn.simpleicons.org/gitlab/FC6D26';
    if (s.includes('jira')) return 'https://cdn.simpleicons.org/jira/0052CC';
    if (s.includes('notion')) return 'https://cdn.simpleicons.org/notion/000000';
    return null;
};

const timelineItems = (member: TeamMember) => [
    {
        icon: User,
        label: 'Миний тухай',
        content: (
            <p className="text-black text-base font-semibold leading-relaxed italic tracking-tight border-l-4 border-black pl-4 hover:text-gray-500 hover:border-gray-500 transition-all duration-500 cursor-default">
                "{member.aboutMe}"
            </p>
        ),
    },
    {
        icon: Briefcase,
        label: 'Туршлага',
        content: (
            <p className="text-gray-600 text-base leading-relaxed font-medium hover:text-black transition-colors duration-500 cursor-default">
                {member.experience}
            </p>
        ),
    },
    ...(member.education?.length ? [{
        icon: GraduationCap,
        label: 'Боловсрол',
        content: (
            <ul className="space-y-2">
                {member.education.map((edu, i) => (
                    <li key={i} className="text-sm font-bold text-black uppercase tracking-tight leading-tight flex items-start gap-2 hover:text-gray-500 transition-colors duration-500 cursor-default group">
                        <span className="w-1.5 h-1.5 bg-black mt-1.5 flex-shrink-0 rounded-full group-hover:bg-gray-500 transition-colors duration-500" />
                        {edu}
                    </li>
                ))}
            </ul>
        ),
    }] : []),
    ...(member.projects?.length ? [{
        icon: ExternalLink,
        label: 'Гол төслүүд',
        content: (
            <div className="flex flex-col gap-2">
                {member.projects.map((project, i) => (
                    <div key={i} className="px-4 py-2.5 border border-gray-200 hover:border-black hover:bg-black text-black hover:text-white transition-all duration-500 rounded-sm cursor-default">
                        <span className="text-sm font-black uppercase tracking-tight">{project}</span>
                    </div>
                ))}
            </div>
        ),
    }] : []),
    ...(member.achievements?.length ? [{
        icon: Trophy,
        label: 'Амжилт',
        content: (
            <div className="flex flex-col gap-2">
                {member.achievements.map((ach, i) => (
                    <div key={i} className="px-4 py-2.5 bg-black text-white hover:bg-gray-900 border border-transparent hover:border-black transition-all duration-500 text-xs font-bold uppercase tracking-widest rounded-sm flex items-center gap-2 cursor-default">
                        <Trophy size={12} className="flex-shrink-0" />
                        {ach}
                    </div>
                ))}
            </div>
        ),
    }] : []),
];

export default function ProfileModal({ member, onClose }: ProfileModalProps) {
    const items = timelineItems(member);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-white w-full max-w-6xl rounded-sm relative shadow-[0_0_120px_rgba(0,0,0,0.9)] border border-black/5"
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: '92vh' }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-50 p-2 text-black hover:bg-black hover:text-white transition-all duration-500 rounded-sm group"
                >
                    <X size={18} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>

                {/* Main 2-column layout */}
                <div className="flex w-full">

                    {/* ── LEFT COLUMN: Photo + name + skills + social ── */}
                    <div className="w-72 min-h-[500px] flex-shrink-0 bg-[#0a0c10] flex flex-col rounded-l-sm overflow-hidden relative z-10">

                        {/* Photo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 }}
                            className="relative w-full h-[320px] overflow-hidden shrink-0"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent" />
                        </motion.div>

                        {/* Name + position */}
                        <div className="px-6 pt-4 pb-2 flex-shrink-0 group cursor-default">
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 }}
                                className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 block mb-1 group-hover:text-gray-300 transition-colors duration-300"
                            >
                                {member.position}
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl font-black uppercase tracking-tighter text-white leading-tight group-hover:text-gray-200 transition-colors duration-300"
                            >
                                {member.name}
                            </motion.h2>
                        </div>

                        {/* Social links */}
                        {(member.social.linkedin || member.social.twitter || member.social.email) && (
                            <div className="px-6 py-3 flex gap-2 flex-shrink-0">
                                {[
                                    { icon: Linkedin, link: member.social.linkedin, label: 'LinkedIn' },
                                    { icon: Twitter, link: member.social.twitter, label: 'Twitter' },
                                    { icon: Mail, link: member.social.email ? `mailto:${member.social.email}` : undefined, label: 'Email' },
                                ].map((s, i) =>
                                    s.link ? (
                                        <motion.a
                                            key={i}
                                            href={s.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={s.label}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.25 + i * 0.08 }}
                                            className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/60 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all duration-300 rounded-sm"
                                        >
                                            <s.icon size={15} />
                                        </motion.a>
                                    ) : null
                                )}
                            </div>
                        )}

                        {/* Divider */}
                        {member.skills?.length > 0 && (
                            <div className="px-6 pb-2 flex-shrink-0">
                                <div className="border-t border-white/10" />
                            </div>
                        )}

                        {/* Skills — icon-only grid */}
                        {member.skills?.length > 0 && (
                            <div className="px-6 pb-6 flex-1 overflow-hidden">
                                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600 mb-3">Ур чадвар</p>
                                <div className="flex flex-wrap gap-2">
                                    {member.skills.map((skill, i) => {
                                        const icon = getSkillIcon(skill);
                                        return (
                                            <motion.div
                                                key={i}
                                                title={skill}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3 + i * 0.04 }}
                                                className="w-9 h-9 flex items-center justify-center border border-white/10 rounded-sm hover:border-white/40 hover:bg-white/10 transition-all duration-300 cursor-default group"
                                            >
                                                {icon ? (
                                                    <img
                                                        src={icon}
                                                        alt={skill}
                                                        className="w-5 h-5 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300"
                                                    />
                                                ) : (
                                                    <span className="text-[10px] font-black text-white/50 uppercase">
                                                        {skill.slice(0, 2)}
                                                    </span>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT COLUMN: Vertical timeline ── */}
                    <div className="flex-1 relative">
                        <div className="absolute inset-0 overflow-y-auto p-8 pr-10 custom-scrollbar">
                            <div className="relative pl-8">
                            {/* Vertical line */}
                            <div className="absolute left-3 top-2 bottom-2 w-px bg-gray-200" />

                            {items.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + index * 0.08 }}
                                    className={`relative ${index < items.length - 1 ? 'mb-8' : ''}`}
                                >
                                    {/* Timeline dot + icon */}
                                    <div className="absolute -left-8 top-0 flex flex-col items-center">
                                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0 shadow-md">
                                            <item.icon size={11} className="text-white" />
                                        </div>
                                    </div>

                                    {/* Label */}
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-2.5 pt-0.5 hover:text-black transition-colors duration-300 cursor-default w-fit">
                                        {item.label}
                                    </h4>

                                    {/* Content */}
                                    <div className="text-sm">
                                        {item.content}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
