import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Бидний тухай', href: '#about' },
  ];

  const logoVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 outline-none ${isOpen
        ? 'bg-transparent py-6'
        : scrolled
          ? 'bg-white/80 backdrop-blur-2xl border-b border-black/5 py-4'
          : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <motion.div
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.1 }}
            className="flex items-center"
          >
            <a
              href="#hero"
              onClick={() => setIsOpen(false)}
              className={`text-xl sm:text-2xl font-black tracking-tighter uppercase transition-colors duration-500 whitespace-nowrap ${isOpen ? 'text-white' : scrolled ? 'text-black' : 'text-white'
                }`}
            >
              <motion.span variants={logoVariants} className="inline-block">Таван</motion.span>
              <motion.span variants={logoVariants} className="inline-block px-1.5 sm:px-2 text-gray-400">Богд</motion.span>
              <motion.span variants={logoVariants} className="inline-block">Тек</motion.span>
            </a>
          </motion.div>


          <div className="hidden md:flex items-center space-x-12">
            <div className="flex space-x-10 items-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  className={`text-xs font-black uppercase tracking-[0.4em] transition-all duration-500 hover:opacity-50 relative group ${scrolled ? 'text-black' : 'text-white'
                    }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 w-0 h-px transition-all duration-500 group-hover:w-full ${scrolled ? 'bg-black' : 'bg-white'
                    }`} />
                </motion.a>
              ))}
            </div>

            <motion.a
              href="#team"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className={`group relative overflow-hidden px-8 py-3 transition-all duration-500 border rounded-sm ${scrolled
                ? 'bg-black text-white border-black hover:text-black'
                : 'bg-white text-black border-white hover:text-white'
                }`}
            >
              <div className={`absolute inset-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1] -translate-x-full group-hover:translate-x-0 ${scrolled ? 'bg-white' : 'bg-black'
                }`} />
              <span className="relative text-xs font-black uppercase tracking-[0.4em]">Баг хамт олон</span>
            </motion.a>
          </div>


          <div className="md:hidden flex items-center relative z-[70]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors rounded-sm ${isOpen ? 'text-white' : scrolled ? 'text-black' : 'text-white'
                }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>


      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black flex flex-col justify-between p-8 sm:p-12 overflow-hidden"
          >
            <div className="mt-20 sm:mt-24 space-y-12">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.8em] text-gray-600">Цэс</span>
              </div>
              <div className="flex flex-col space-y-2 sm:space-y-4">
                {[
                  { name: 'Нүүр', href: '#hero' },
                  ...navLinks,
                  { name: 'Баг хамт олон', href: '#team' }
                ].map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tighter hover:italic transition-all duration-300 flex items-center group py-2"
                  >
                    <span className="group-hover:translate-x-4 transition-transform duration-500">{item.name}</span>
                    <ArrowRight className="ml-6 opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:block" size={48} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end border-t border-white/10 pt-12">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 block mb-4">Холбоо барих</span>
                <a href="mailto:hello@tavanbogd.tech" className="text-xl font-bold text-white uppercase tracking-tighter border-b border-white/20 pb-1 hover:text-gray-400 transition-colors">
                  hello@tavanbogd.tech
                </a>
              </div>
              <div className="flex flex-col sm:items-end gap-4">
                <div className="flex space-x-6 text-gray-500">
                  <a href="#" className="hover:text-white transition-colors">LN</a>
                  <a href="#" className="hover:text-white transition-colors">FB</a>
                  <a href="#" className="hover:text-white transition-colors">TW</a>
                  <a href="#" className="hover:text-white transition-colors">IG</a>
                </div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-800">
                  © 2026 TBT
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
