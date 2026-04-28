import i18n from 'i18next';

const positionMap: { [key: string]: string } = {
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
  'Cloud архитектор': 'Cloud Architect',
  'Ахлах инженер': 'Senior Engineer',
  'Программ хангамжийн инженер': 'Software Engineer'
};

const aboutMeMap: { [key: string]: string } = {
  'Технологийн хүчээр ирээдүйг бүтээх, бизнесийн асуудлуудыг шийдвэрлэхэд чин хүсэлтэй.': 
    'Passionate about building the future with technology and solving complex business problems.'
};

export const translateData = (text: string | undefined): string => {
  if (!text) return '';
  if (i18n.language === 'mn') return text;

  // Check positions
  if (positionMap[text]) return positionMap[text];

  // Check aboutMe
  if (aboutMeMap[text]) return aboutMeMap[text];

  // Check experience (regex for years)
  const expMatch = text.match(/(\d+) жилийн туршлагатай хөгжүүлэгч/);
  if (expMatch) {
    return `${expMatch[1]} years of experience. Passionate about building reliable, high-load systems.`;
  }

  // Handle Education
  if (text.includes('Компьютерийн ухааны магистр, МУИС')) return 'Master of Computer Science, NUM';
  if (text.includes('Программ хангамжийн инженерчлэл, ШУТИС')) return 'Software Engineering, MUST';
  if (text.includes('Мэдээллийн технологи, МУИС')) return 'Information Technology, NUM';
  if (text.includes('Бизнесийн удирдлага, SFESU')) return 'Business Administration, SFESU';
  if (text.includes('Компьютерийн сүлжээ, ШУТИС')) return 'Computer Networking, MUST';
  if (text.includes('Статистикч, МУИС')) return 'Statistician, NUM';

  return text;
};
