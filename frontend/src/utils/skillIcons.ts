/**
 * Ур чадварын нэрээс хамаарч тохирох icon-ийн URL-г буцаана.
 * Хэрэв олдохгүй бол null буцаана.
 */
export const getSkillIcon = (skillName: string): string | null => {
  const s = skillName.toLowerCase().trim();
  
  // Databases
  if (s.includes('graphql')) return 'https://cdn.simpleicons.org/graphql/E10098';
  if (s.includes('mysql')) return 'https://cdn.simpleicons.org/mysql/4479A1';
  if (s.includes('postgre')) return 'https://cdn.simpleicons.org/postgresql/4169E1';
  if (s.includes('mongo')) return 'https://cdn.simpleicons.org/mongodb/47A248';
  if (s.includes('redis')) return 'https://cdn.simpleicons.org/redis/FF4438';
  if (s.includes('firebase')) return 'https://cdn.simpleicons.org/firebase/FFCA28';

  // Cloud & DevOps
  if (s.includes('aws')) return 'https://cdn.simpleicons.org/amazonaws/232F3E';
  if (s.includes('docker')) return 'https://cdn.simpleicons.org/docker/2496ED';
  if (s.includes('kubernetes') || s.includes('k8s')) return 'https://cdn.simpleicons.org/kubernetes/326CE5';
  if (s.includes('vercel')) return 'https://cdn.simpleicons.org/vercel/000000';
  if (s.includes('netlify')) return 'https://cdn.simpleicons.org/netlify/00C7B7';

  // Backend
  if (s.includes('node')) return 'https://cdn.simpleicons.org/nodedotjs/339933';
  if (s.includes('python')) return 'https://cdn.simpleicons.org/python/3776AB';
  if (s.includes('django')) return 'https://cdn.simpleicons.org/django/092E20';
  if (s.includes('php')) return 'https://cdn.simpleicons.org/php/777BB4';
  if (s.includes('laravel')) return 'https://cdn.simpleicons.org/laravel/FF2D20';
  if (s.includes('spring')) return 'https://cdn.simpleicons.org/spring/6DB33F';
  if (s.includes('go') && s.length <= 2) return 'https://cdn.simpleicons.org/go/00ADD8';
  if (s.includes('rust')) return 'https://cdn.simpleicons.org/rust/000000';

  // Frontend
  if (s.includes('react')) return 'https://cdn.simpleicons.org/react/61DAFB';
  if (s.includes('typescript') || s === 'ts') return 'https://cdn.simpleicons.org/typescript/3178C6';
  if (s.includes('javascript') || s === 'js') return 'https://cdn.simpleicons.org/javascript/F7DF1E';
  if (s.includes('vue')) return 'https://cdn.simpleicons.org/vuedotjs/4FC08D';
  if (s.includes('angular')) return 'https://cdn.simpleicons.org/angular/DD0031';
  if (s.includes('svelte')) return 'https://cdn.simpleicons.org/svelte/FF3E00';
  if (s.includes('next')) return 'https://cdn.simpleicons.org/nextdotjs/000000';
  if (s.includes('tailwind')) return 'https://cdn.simpleicons.org/tailwindcss/06B6D4';
  if (s.includes('sass') || s.includes('scss')) return 'https://cdn.simpleicons.org/sass/CC6699';
  if (s.includes('css')) return 'https://cdn.simpleicons.org/css3/1572B6';
  if (s.includes('html')) return 'https://cdn.simpleicons.org/html5/E34F26';

  // Mobile
  if (s.includes('flutter')) return 'https://cdn.simpleicons.org/flutter/02569B';
  if (s.includes('swift')) return 'https://cdn.simpleicons.org/swift/F05138';
  if (s.includes('kotlin')) return 'https://cdn.simpleicons.org/kotlin/7F52FF';

  // Backend Languages
  if (s.includes('java') && !s.includes('script')) return 'https://cdn.simpleicons.org/java/007396';
  if (s.includes('c#') || s.includes('csharp')) return 'https://cdn.simpleicons.org/csharp/239120';
  if (s.includes('c++') || s.includes('cpp')) return 'https://cdn.simpleicons.org/cplusplus/00599C';

  // Game Development
  if (s.includes('unity')) return 'https://cdn.simpleicons.org/unity/000000';
  if (s.includes('unreal')) return 'https://cdn.simpleicons.org/unrealengine/000000';

  // Design Tools
  if (s.includes('figma')) return 'https://cdn.simpleicons.org/figma/F24E1E';
  if (s.includes('blender')) return 'https://cdn.simpleicons.org/blender/F5792A';
  if (s.includes('adobe')) return 'https://cdn.simpleicons.org/adobe/FF0000';
  if (s.includes('photoshop')) return 'https://cdn.simpleicons.org/adobephotoshop/31A8FF';
  if (s.includes('illustrator')) return 'https://cdn.simpleicons.org/adobeillustrator/FF9A00';
  if (s.includes('xd')) return 'https://cdn.simpleicons.org/adobexd/FF61F6';

  // DevTools
  if (s.includes('git')) return 'https://cdn.simpleicons.org/git/F05032';
  if (s.includes('github')) return 'https://cdn.simpleicons.org/github/181717';
  if (s.includes('gitlab')) return 'https://cdn.simpleicons.org/gitlab/FC6D26';
  if (s.includes('jira')) return 'https://cdn.simpleicons.org/jira/0052CC';
  if (s.includes('notion')) return 'https://cdn.simpleicons.org/notion/000000';
  if (s.includes('linux')) return 'https://cdn.simpleicons.org/linux/FCC624';

  return null;
};
