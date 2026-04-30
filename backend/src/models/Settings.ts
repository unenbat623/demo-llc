import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  // Global
  siteTitle: { type: String, default: 'Tavan Bogd Tech' },
  siteTitle_en: { type: String, default: 'Tavan Bogd Tech' },
  navbarLogo: { type: String, default: 'TAVAN BOGD TECH' },

  // Hero
  heroTitle: { type: String, default: 'Ирээдүйн Технологийг Өнөөдөр' },
  heroTitle_en: { type: String, default: 'Future Technology Today' },
  heroDescription: { type: String, default: 'Бид дэлхийн жишигт нийцсэн программ хангамжийн шийдлүүдийг Монголдоо нутагшуулан, бизнесийн цар хүрээг тэлэхэд тусалдаг.' },
  heroDescription_en: { type: String, default: 'We help businesses grow by localizing world-class software solutions in Mongolia.' },
  ctaText: { type: String, default: 'Хамтран ажиллах' },
  ctaText_en: { type: String, default: 'Work With Us' },
  heroBgUrl: { type: String, default: 'https://cdn.pixabay.com/video/2021/04/12/70850-536961444_large.mp4' },
  heroImageUrl: { type: String, default: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200' },
  heroBadge: { type: String, default: 'Tech Solutions' },
  heroStat1Value: { type: String, default: '250+' },
  heroStat1Label: { type: String, default: 'Projects' },
  heroStat2Value: { type: String, default: '15+' },
  heroStat2Label: { type: String, default: 'Awards' },
  heroEstablished: { type: String, default: 'MMXXIV' },
  heroTagline: { type: String, default: 'Digital_Engine_01' },

  // About
  aboutTitle: { type: String, default: 'Бидний тухай' },
  aboutTitle_en: { type: String, default: 'About Us' },
  aboutDescription: { type: String, default: 'Бид 20 гаруй жилийн туршлагатай хамт олон бөгөөд Монголын технологийн салбарт тэргүүлэгч байхыг зорьдог.' },
  aboutDescription_en: { type: String, default: 'We are a team with over 20 years of experience, aiming to lead Mongolia\'s technology sector.' },
  aboutBadge: { type: String, default: 'Компанийн тухай' },
  aboutTagline: { type: String, default: 'Innovation First' },

  // Team Section
  teamBadge: { type: String, default: 'Expert Minds' },
  teamTitle: { type: String, default: 'Манай баг' },
  teamTitle_en: { type: String, default: 'Our Team' },
  teamDescription: { type: String, default: 'Мэдлэг, туршлага, хүсэл тэмүүлэлтэй мэргэжилтнүүдийн баг.' },
  teamDescription_en: { type: String, default: 'A team of passionate experts with knowledge and experience.' },

  // Footer CTA
  footerCta: { type: String, default: 'Хамтдаа ажиллах бэлэн үү?' },
  footerCta_en: { type: String, default: 'Ready to work together?' },
  footerCtaSub: { type: String, default: 'Таны бизнесийн өсөлтийг технологийн тусламжтайгаар хамтдаа хэрэгжүүлцгээе.' },
  footerCtaSub_en: { type: String, default: 'Let\'s implement your business growth together with the help of technology.' },

  // Stats
  stats1Value: { type: String, default: '2022' },
  stats1Label: { type: String, default: 'Байгуулагдсан' },
  stats1Label_en: { type: String, default: 'Founded' },
  stats1Detail: { type: String, default: 'Технологийн салбарт' },
  stats1Detail_en: { type: String, default: 'In technology sector' },

  stats2Value: { type: String, default: '45+' },
  stats2Label: { type: String, default: 'Мэргэжилтэн' },
  stats2Label_en: { type: String, default: 'Professionals' },
  stats2Detail: { type: String, default: 'Чадварлаг боловсон хүчин' },
  stats2Detail_en: { type: String, default: 'Skilled workforce' },

  stats3Value: { type: String, default: '500+' },
  stats3Label: { type: String, default: 'Төслүүд' },
  stats3Label_en: { type: String, default: 'Projects' },
  stats3Detail: { type: String, default: 'Амжилттай хэрэгжүүлсэн' },
  stats3Detail_en: { type: String, default: 'Successfully implemented' },

  stats4Value: { type: String, default: '50+' },
  stats4Label: { type: String, default: 'Түншүүд' },
  stats4Label_en: { type: String, default: 'Partners' },
  stats4Detail: { type: String, default: 'Дэлхийн хэмжээний' },
  stats4Detail_en: { type: String, default: 'World-class' },

  // Vision & Mission
  visionTitle: { type: String, default: 'Алсын хараа' },
  visionTitle_en: { type: String, default: 'Vision' },
  visionText: { type: String, default: 'Монгол улсын дижитал шилжилтийн гол цөм нь байж, технологийн салбарт дэлхийн жишиг стандартыг тогтоох.' },
  visionText_en: { type: String, default: 'To be the core of Mongolia\'s digital transformation and set world-class standards in the technology sector.' },

  missionTitle: { type: String, default: 'Эрхэм зорилго' },
  missionTitle_en: { type: String, default: 'Mission' },
  missionText: { type: String, default: 'Инновацлаг шийдлээр бизнесүүдийн үнэ цэнийг нэмэгдүүлж, нийгэмд технологийн эерэг өөрчлөлтийг авчрах.' },
  missionText_en: { type: String, default: 'To increase business value through innovative solutions and bring positive technological change to society.' },

  // Contact
  contactEmail: { type: String, default: 'info@tavanbogd.tech' },
  contactPhone: { type: String, default: '+976 7700 0000' },
  address: { type: String, default: 'Улаанбаатар хот, ХУД, 15-р хороо' },
  address_en: { type: String, default: 'Khan-Uul District, 15th Khoroo, Ulaanbaatar' },

  // Social
  facebook: { type: String, default: '#' },
  twitter: { type: String, default: '#' },
  linkedin: { type: String, default: '#' },
  instagram: { type: String, default: '#' },

  // Footer
  footerText: { type: String, default: '© 2024 Таван Богд Технологи ХХК. Бүх эрх хуулиар хамгаалагдсан.' },
  footerText_en: { type: String, default: '© 2024 Tavan Bogd Technology LLC. All rights reserved.' },

  // Colors
  primaryColor: { type: String, default: '#000000' },
  secondaryColor: { type: String, default: '#ffffff' },
  accentColor: { type: String, default: '#f8f8f8' },
  textColor: { type: String, default: '#1a1a1a' },

  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Settings', SettingsSchema);
