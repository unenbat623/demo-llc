import { motion } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center bg-black overflow-hidden pt-20">

      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30 grayscale"
        >
          <source
            src="https://cdn.pixabay.com/video/2021/04/12/70850-536961444_large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-linear-to-r  from-black via-black/40 to-transparent" />

        <div

          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-3 py-1 border border-white/30 rounded-sm text-white text-xs font-bold uppercase tracking-[0.3em] mb-8"
            >
              {t('hero.tagline')}
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[0.85] tracking-tighter uppercase mb-8"
            >
              {t('hero.brand1')} <br />
              <span className="text-gray-500">{t('hero.brand2')}</span> <br />
              {t('hero.brand3')}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-md text-lg text-gray-300 mb-10 leading-relaxed font-light"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 sm:gap-6 items-center" >
              <a href="#team" className="group relative overflow-hidden px-6 py-4 md:px-10 md:py-5 bg-white text-black border border-white transition-all duration-500 hover:text-white rounded-sm w-full sm:w-auto inline-block"  >
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
                <div className="relative flex items-center justify-center sm:justify-start space-x-4">
                  <span className="text-xs font-black uppercase tracking-[0.3em]">{t('hero.cta')}</span>
                  <ArrowDownRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500" />
                </div>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative"
          >
            <div className="aspect-4/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl z-10 opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
                alt="Digital Network"
                className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 p-4 sm:p-8 border-l border-t border-white z-20">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-widest">EST. 2022</span>
              </div>

              <div className="absolute bottom-12 right-12 text-white/40 text-[10px] font-mono text-right z-20">
                SYSTEM_STATUS: ACTIVE<br />
                UPLINK_ESTABLISHED<br />
                DATA_FLOW: OPTIMAL
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block z-10">
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-24 bg-linear-to-b from-white/0 via-white to-white/0"
        />
      </div>
    </section>
  );
}
