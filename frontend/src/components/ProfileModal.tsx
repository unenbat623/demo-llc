import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { TeamMember } from '../types';
import ProfileSidebar from './ProfileModal/ProfileSidebar';
import ProfileContent from './ProfileModal/ProfileContent';

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
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="bg-white w-full h-full sm:h-auto max-w-5xl sm:rounded-lg relative shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col md:flex-row overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: '100dvh' }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2.5 text-black/40 hover:text-black hover:bg-black/5 transition-all duration-300 rounded-full group"
                >
                    <X size={20} strokeWidth={2} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>

                <ProfileSidebar member={member} />
                <ProfileContent member={member} />
            </motion.div>
        </motion.div>
    );
}
