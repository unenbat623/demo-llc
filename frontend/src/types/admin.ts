export interface TeamMember {
  _id: string;
  name: string;
  name_en?: string;
  position: string;
  position_en?: string;
  image: string;
  aboutMe?: string;
  aboutMe_en?: string;
  experience?: string;
  experience_en?: string;
  skills?: string[];
  education?: string[];
  education_en?: string[];
  projects?: string[];
  projects_en?: string[];
  achievements?: string[];
  achievements_en?: string[];
  social?: {
    email?: string;
    linkedin?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminLog {
  _id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN';
  user: string;
  description: string;
  position: string;
  timestamp: string;
}

export interface SystemUser {
  _id: string;
  username: string;
  role: 'admin' | 'staff';
  createdAt?: string;
}

export interface SiteSettings {
  siteTitle: string;
  siteTitle_en: string;
  navbarLogo: string;
  heroTitle: string;
  heroTitle_en: string;
  heroDescription: string;
  heroDescription_en: string;
  ctaText: string;
  ctaText_en: string;
  heroBgUrl: string;
  heroImageUrl: string;
  heroBadge?: string;
  heroStat1Value?: string;
  heroStat1Label?: string;
  heroStat2Value?: string;
  heroStat2Label?: string;
  heroEstablished?: string;
  heroTagline?: string;
  aboutTitle: string;
  aboutTitle_en: string;
  aboutDescription: string;
  aboutDescription_en: string;
  aboutBadge?: string;
  aboutTagline?: string;


  teamBadge?: string;
  teamTitle?: string;
  teamTitle_en?: string;
  teamDescription?: string;
  teamDescription_en?: string;


  footerCta?: string;
  footerCta_en?: string;
  footerCtaSub?: string;
  footerCtaSub_en?: string;


  stats1Value: string;
  stats1Label: string;
  stats1Label_en: string;
  stats1Detail: string;
  stats1Detail_en: string;

  stats2Value: string;
  stats2Label: string;
  stats2Label_en: string;
  stats2Detail: string;
  stats2Detail_en: string;

  stats3Value: string;
  stats3Label: string;
  stats3Label_en: string;
  stats3Detail: string;
  stats3Detail_en: string;

  stats4Value: string;
  stats4Label: string;
  stats4Label_en: string;
  stats4Detail: string;
  stats4Detail_en: string;


  visionTitle: string;
  visionTitle_en: string;
  visionText: string;
  visionText_en: string;

  missionTitle: string;
  missionTitle_en: string;
  missionText: string;
  missionText_en: string;

  contactEmail: string;
  contactPhone: string;
  address: string;
  address_en: string;
  footerText: string;
  footerText_en: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  navAbout?: string;
  navAbout_en?: string;
  navTeam?: string;
  navTeam_en?: string;


  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  textColor?: string;
}
