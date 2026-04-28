interface GeneratedTeamMember {
  name: string;
  position: string;
  image: string;
  experience: string;
  aboutMe: string;
  skills: string[];
  projects: string[];
  education: string[];
  achievements: string[];
  social: {
    linkedin: string;
    email: string;
  };
}

const transliterationMap: { [key: string]: string } = {
  'А': 'a', 'Б': 'b', 'В': 'v', 'Г': 'g', 'Д': 'd', 'Е': 'e', 'Ё': 'yo', 'Ж': 'zh', 'З': 'z', 'И': 'i',
  'Й': 'y', 'К': 'k', 'Л': 'l', 'М': 'm', 'Н': 'n', 'О': 'o', 'Ө': 'o', 'П': 'p', 'Р': 'r', 'С': 's',
  'Т': 't', 'У': 'u', 'Ү': 'u', 'Ф': 'f', 'Х': 'h', 'Ц': 'ts', 'Ч': 'ch', 'Ш': 'sh', 'Щ': 'sch', 'Ъ': '',
  'Ы': 'y', 'Ь': '', 'Э': 'e', 'Ю': 'yu', 'Я': 'ya',
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
  'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'ө': 'o', 'п': 'p', 'р': 'r', 'с': 's',
  'т': 't', 'у': 'u', 'ү': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
  'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
};

const transliterate = (text: string): string => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (transliterationMap[char]) {
      result += transliterationMap[char];
    } else if (/[a-z0-9]/i.test(char)) {
      result += char.toLowerCase();
    }
  }
  return result;
};

const mongolianFirstNames = ['Г.', 'Б.', 'С.', 'А.', 'Т.', 'Ж.', 'М.', 'О.', 'Э.', 'Н.', 'Л.', 'П.', 'Х.', 'Ч.', 'Д.', 'К.'];
const mongolianLastNames = [
  'Бат-Орших', 'Энх-Амгалан', 'Ундрах', 'Болд', 'Сарнай', 'Даваа', 'Эрдэнэ', 'Цэцэг',
  'Гантулга', 'Наран', 'Сүхбатар', 'Тэнгэр', 'Аюурзана', 'Нарантүмэр', 'Батзориг', 'Орхондой'
];

const positions = [
  'Гүйцэтгэх захирал', 'Технологи хариуцсан захирал (CTO)', 'Ахлах Программ хангамжийн инженер',
  'Системийн Архитектор', 'UI/UX Дизайнер', 'Өгөгдлийн шинжээч', 'Бүтээгдэхүүний менежер',
  'Frontend хөгжүүлэгч', 'DevOps инженер', 'Мобайл хөгжүүлэгч', 'Backend инженер',
  'QA инженер', 'Дизайн систем архитектор', 'Cloud архитектор'
];

const skillSets = [
  ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
  ['System Architecture', 'Cloud Computing', 'AWS', 'Kubernetes'],
  ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
  ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis'],
  ['Java', 'Microservices', 'Kubernetes', 'Security'],
  ['Docker', 'Terraform', 'CI/CD', 'Jenkins'],
  ['Swift', 'Kotlin', 'React Native', 'Flutter'],
  ['GraphQL', 'MongoDB', 'Express.js', 'Next.js']
];

const projectExamples = [
  'Digital Transformation Initiative', 'Cloud Migration Project', 'Mobile App Development',
  'Enterprise Resource Planning System', 'Analytics Platform', 'E-commerce Platform',
  'Customer Relationship Management', 'Payment Gateway Integration', 'Automated Deployment Pipeline'
];

const educationExamples = [
  'Компьютерийн ухааны магистр, МУИС',
  'Программ хангамжийн инженерчлэл, ШУТИС',
  'Мэдээллийн технологи, МУИС',
  'Бизнесийн удирдлага, SFESU',
  'Компьютерийн сүлжээ, ШУТИС',
  'Статистикч, МУИС'
];

const achievementExamples = [
  'AWS Certified Solutions Architect', 'Google Cloud Professional', 'Certified Kubernetes Administrator',
  'MongoDB Certified Developer', 'Scrum Master Certification', 'International Design Award 2022',
  'Hackathon Winner 2023', 'Tech Innovation Award 2023'
];

const positionTranslations: { [key: string]: string } = {
  'Гүйцэтгэх захирал': 'CEO Executive',
  'Технологи хариуцсан захирал (CTO)': 'Chief Technology Officer',
  'Ахлах Программ хангамжийн инженер': 'Senior Software Engineer',
  'Системийн Архитектор': 'System Architect',
  'UI/UX Дизайнер': 'UI UX Designer',
  'Өгөгдлийн шинжээч': 'Data Scientist',
  'Бүтээгдэхүүний менежер': 'Product Manager',
  'Frontend хөгжүүлэгч': 'Frontend Developer',
  'DevOps инженер': 'DevOps Engineer',
  'Мобайл хөгжүүлэгч': 'Mobile App Developer',
  'Backend инженер': 'Backend Software Engineer',
  'QA инженер': 'Quality Assurance Engineer',
  'Дизайн систем архитектор': 'Design System Architect',
  'Cloud архитектор': 'Cloud Solutions Architect'
};

export const generateRandomTeamMember = (): GeneratedTeamMember => {
  const firstName = mongolianFirstNames[Math.floor(Math.random() * mongolianFirstNames.length)];
  const lastName = mongolianLastNames[Math.floor(Math.random() * mongolianLastNames.length)];
  const position = positions[Math.floor(Math.random() * positions.length)];
  const engPosition = positionTranslations[position] || 'Professional';
  const skills = skillSets[Math.floor(Math.random() * skillSets.length)];
  const yearsExp = Math.floor(Math.random() * 15) + 2;
  
  const emailFirst = transliterate(firstName).replace(/[^a-z0-9]/g, '');
  const emailLast = transliterate(lastName).replace(/[^a-z0-9]/g, '');
  const randomNum = Math.floor(Math.random() * 999);
  const emailLocal = `${emailFirst}${emailLast}${randomNum}`.slice(0, 64);
  
  const gender = Math.random() > 0.5 ? 'man' : 'woman';
  const imagePrompt = encodeURIComponent(`professional studio headshot portrait of a ${gender} ${engPosition}, wearing professional business attire, neutral background, cinematic lighting, highly detailed, 8k, realistic skin textures, sharp focus`);

  return {
    name: `${firstName} ${lastName}`,
    position,
    image: `https://image.pollinations.ai/prompt/${imagePrompt}?width=800&height=1200&seed=${Math.floor(Math.random() * 999999)}&model=flux&nologo=true`,
    experience: `${yearsExp} жилийн туршлагатай хөгжүүлэгч. Өндөр ачаалал даах чадвартай, найдвартай систем бүтээх сонирхолтой.`,
    aboutMe: 'Технологийн хүчээр ирээдүйг бүтээх, бизнесийн асуудлуудыг шийдвэрлэхэд чин хүсэлтэй.',
    skills,
    projects: [
      projectExamples[Math.floor(Math.random() * projectExamples.length)],
      projectExamples[Math.floor(Math.random() * projectExamples.length)]
    ],
    education: [
      educationExamples[Math.floor(Math.random() * educationExamples.length)],
      educationExamples[Math.floor(Math.random() * educationExamples.length)]
    ],
    achievements: [
      achievementExamples[Math.floor(Math.random() * achievementExamples.length)],
      achievementExamples[Math.floor(Math.random() * achievementExamples.length)]
    ],
    social: {
      linkedin: 'https://linkedin.com',
      email: `${emailLocal}@tavanbogd.tech`
    }
  };
};
