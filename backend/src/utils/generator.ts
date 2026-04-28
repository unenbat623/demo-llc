interface GeneratedTeamMember {
  name: string;
  name_en: string;
  position: string;
  position_en: string;
  image: string;
  experience: string;
  experience_en: string;
  aboutMe: string;
  aboutMe_en: string;
  skills: string[];
  projects: string[];
  projects_en: string[];
  education: string[];
  education_en: string[];
  achievements: string[];
  achievements_en: string[];
  social: {
    linkedin: string;
    email: string;
  };
}

const transliterationMap: { [key: string]: string } = {
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
  'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'Ө': 'O', 'П': 'P', 'Р': 'R', 'С': 'S',
  'Т': 'T', 'У': 'u', 'Ү': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch', 'Ъ': '',
  'Ы': 'y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
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
    } else {
      result += char;
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

const positionTranslations: { [key: string]: string } = {
  'Гүйцэтгэх захирал': 'Chief Executive Officer',
  'Технологи хариуцсан захирал (CTO)': 'Chief Technology Officer',
  'Ахлах Программ хангамжийн инженер': 'Senior Software Engineer',
  'Системийн Архитектор': 'System Architect',
  'UI/UX Дизайнер': 'UI/UX Designer',
  'Өгөгдлийн шинжээч': 'Data Scientist',
  'Бүтээгдэхүүний менежер': 'Product Manager',
  'Frontend хөгжүүлэгч': 'Frontend Developer',
  'DevOps инженер': 'DevOps Engineer',
  'Мобайл хөгжүүлэгч': 'Mobile Developer',
  'Backend инженер': 'Backend Engineer',
  'QA инженер': 'QA Engineer',
  'Дизайн систем архитектор': 'Design System Architect',
  'Cloud архитектор': 'Cloud Architect'
};

const educationTranslations: { [key: string]: string } = {
  'Компьютерийн ухааны магистр, МУИС': 'Master of Computer Science, NUM',
  'Программ хангамжийн инженерчлэл, ШУТИС': 'Software Engineering, MUST',
  'Мэдээллийн технологи, МУИС': 'Information Technology, NUM',
  'Бизнесийн удирдлага, SFESU': 'Business Administration, SFESU',
  'Компьютерийн сүлжээ, ШУТИС': 'Computer Networking, MUST',
  'Статистикч, МУИС': 'Statistician, NUM'
};

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

export const generateRandomTeamMember = (): GeneratedTeamMember => {
  const firstName = mongolianFirstNames[Math.floor(Math.random() * mongolianFirstNames.length)];
  const lastName = mongolianLastNames[Math.floor(Math.random() * mongolianLastNames.length)];
  const position = positions[Math.floor(Math.random() * positions.length)];
  const engPosition = positionTranslations[position] || 'Professional';
  const skills = skillSets[Math.floor(Math.random() * skillSets.length)];
  const yearsExp = Math.floor(Math.random() * 15) + 2;
  
  const emailFirst = transliterate(firstName).toLowerCase().replace(/[^a-z0-9]/g, '');
  const emailLast = transliterate(lastName).toLowerCase().replace(/[^a-z0-9]/g, '');
  const randomNum = Math.floor(Math.random() * 999);
  const emailLocal = `${emailFirst}${emailLast}${randomNum}`.slice(0, 64);
  
  const gender = Math.random() > 0.5 ? 'man' : 'woman';
  const imagePrompt = encodeURIComponent(`professional studio headshot portrait of a ${gender} ${engPosition}, wearing professional business attire, neutral background, cinematic lighting, highly detailed, 8k, realistic skin textures, sharp focus`);

  const edu1 = educationExamples[Math.floor(Math.random() * educationExamples.length)];
  const edu2 = educationExamples[Math.floor(Math.random() * educationExamples.length)];

  return {
    name: `${firstName} ${lastName}`,
    name_en: `${firstName} ${transliterate(lastName)}`,
    position,
    position_en: engPosition,
    image: `https://image.pollinations.ai/prompt/${imagePrompt}?width=800&height=1200&seed=${Math.floor(Math.random() * 999999)}&model=flux&nologo=true`,
    experience: `${yearsExp} жилийн туршлагатай хөгжүүлэгч. Өндөр ачаалал даах чадвартай, найдвартай систем бүтээх сонирхолтой.`,
    experience_en: `${yearsExp} years of experience. Passionate about building reliable, high-load systems.`,
    aboutMe: 'Технологийн хүчээр ирээдүйг бүтээх, бизнесийн асуудлуудыг шийдвэрлэхэд чин хүсэлтэй.',
    aboutMe_en: 'Passionate about building the future with technology and solving complex business problems.',
    skills,
    projects: [
      projectExamples[0],
      projectExamples[1]
    ],
    projects_en: [
      projectExamples[0],
      projectExamples[1]
    ],
    education: [edu1, edu2],
    education_en: [
      educationTranslations[edu1] || edu1,
      educationTranslations[edu2] || edu2
    ],
    achievements: [
      achievementExamples[0],
      achievementExamples[1]
    ],
    achievements_en: [
      achievementExamples[0],
      achievementExamples[1]
    ],
    social: {
      linkedin: 'https://linkedin.com',
      email: `${emailLocal}@tavanbogd.tech`
    }
  };
};
