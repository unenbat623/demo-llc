import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarOverlayProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const SidebarOverlay: React.FC<SidebarOverlayProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </AnimatePresence>
  );
};

export default SidebarOverlay;
