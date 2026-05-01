import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { HeroSplit } from './hero/HeroSplit';
import { HeroCentered, HeroEditorial, HeroDark, HeroCorporate, HeroGradient } from './hero/HeroVariants';

export default function Hero() {
  const { settings, t_site } = useSettings();
  const template = settings?.template || 'split-hero';

  const props = { settings, t_site };

  switch (template) {
    case 'split-hero':
      return <HeroSplit {...props} />;
    case 'centered-minimal':
      return <HeroCentered {...props} />;
    case 'editorial-bold':
      return <HeroEditorial {...props} />;
    case 'dark-premium':
      return <HeroDark {...props} />;
    case 'light-corporate':
      return <HeroCorporate {...props} />;
    case 'gradient-modern':
      return <HeroGradient {...props} />;
    default:
      return <HeroSplit {...props} />;
  }
}
