# i18next Implementation Guide

## Overview
This project has been configured with i18next for multi-language support. Currently, Mongolian (mn) and English (en) are supported.

## Installation

Before running the project, install the required dependencies:

```bash
cd frontend
npm install i18next react-i18next
```

## How i18n Works

### 1. Configuration
The i18n configuration is located in `src/i18n.ts`. It:
- Loads translation files for Mongolian and English
- Sets Mongolian as the default language
- Stores the user's language preference in localStorage

### 2. Translation Files
Translation files are located in:
- `src/locales/mn/translation.json` - Mongolian translations
- `src/locales/en/translation.json` - English translations

### 3. Using Translations in Components

Import and use the `useTranslation` hook:

```tsx
import { useTranslation } from 'react-i18next';

export default function MyComponent() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('nav.title')}</h1>
      <button onClick={() => i18n.changeLanguage('en')}>
        {t('common.english')}
      </button>
    </div>
  );
}
```

## Language Switcher

A language switcher component is available in `src/components/LanguageSwitcher.tsx`. It displays:
- Current language code (MN/EN)
- Language options dropdown
- Automatic language persistence in localStorage

You can place this component anywhere in your UI. Currently, it's in:
- Desktop navbar
- Mobile menu

## Updated Components

The following components have been updated with i18n support:

### Main Pages
- `pages/Login.tsx` - Admin login page
- `pages/Admin.tsx` - Admin dashboard (if applicable)

### Components
- `components/Navbar.tsx` - Main navigation with language switcher
- `components/Hero.tsx` - Hero section
- `components/About.tsx` - About section
- `components/Team.tsx` - Team section
- `components/Footer.tsx` - Footer
- `components/LanguageSwitcher.tsx` - Language switcher (NEW)

## Translation Keys Structure

### Navigation (nav)
- `nav.home` - Home
- `nav.about` - About Us
- `nav.team` - Our Team

### Hero Section (hero)
- `hero.tagline` - Tagline
- `hero.title` - Main title
- `hero.description` - Description
- `hero.cta` - Call-to-action button

### About Section (about)
- `about.subtitle` - Section subtitle
- `about.title` - Section title
- `about.description1` & `about.description2` - Descriptions
- `about.stats.*` - Statistics labels and details
- `about.vision`, `about.visionText` - Vision section
- `about.mission`, `about.missionText` - Mission section

### Team Section (team)
- `team.title` - Section title
- `team.subtitle` - Section subtitle
- `team.description` - Description
- `team.viewProfile` - View profile button
- `team.closeModal` - Close modal button
- `team.noMembers` - No members message
- `team.loadError` - Load error message

### Footer (footer)
- `footer.ready` - Call-to-action heading
- `footer.buildTogether` - CTA description
- `footer.startConversation` - CTA button
- `footer.menu` - Menu section
- `footer.contact` - Contact section
- `footer.copyright` - Copyright text

### Login Page (login)
- `login.title` - Login page title
- `login.subtitle` - Subtitle
- `login.username` - Username label
- `login.password` - Password label
- `login.login` - Login button
- `login.loading` - Loading state text
- `login.error` - Error message
- `login.testCredentials` - Test credentials hint
- `login.backToWebsite` - Back to website link

### Common (common)
- `common.language` - Language
- `common.english` - English
- `common.mongolian` - Mongolian
- `common.loading` - Loading
- `common.error` - Error
- `common.success` - Success
- `common.cancel` - Cancel
- `common.save` - Save
- `common.delete` - Delete
- `common.edit` - Edit
- `common.back` - Back

## Adding New Translations

1. Add the new key to both `src/locales/mn/translation.json` and `src/locales/en/translation.json`:

```json
{
  "newSection": {
    "key": "Translation text"
  }
}
```

2. Use the translation in your component:

```tsx
const { t } = useTranslation();
<div>{t('newSection.key')}</div>
```

## Changing Languages Programmatically

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { i18n } = useTranslation();
  
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  return (
    <button onClick={() => handleLanguageChange('en')}>
      Switch to English
    </button>
  );
}
```

## Notes

- Language preference is automatically saved to localStorage
- The default language is Mongolian
- All hardcoded Mongolian text has been replaced with i18n keys
- The language switcher is responsive and works on both desktop and mobile

## Troubleshooting

### Translations not showing
- Ensure i18next is properly initialized in `src/main.tsx`
- Check that the translation keys exist in both language files
- Verify the component is using the `useTranslation()` hook

### Language not persisting
- Check browser localStorage permissions
- Ensure `localStorage.setItem('language', lang)` is being called

## Future Enhancements

- Add more languages by creating new translation files
- Add namespace-based organization for larger projects
- Implement backend-driven translations
- Add RTL support for Arabic/Persian (if needed)
