import { TeamMember } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Г. Бат-Орших',
    position: 'Гүйцэтгэх захирал',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=800',
    experience: 'Технологийн салбарт 15 гаруй жил ажилласан туршлагатай. Томоохон хэмжээний дижитал шилжилтийн төслүүдийг амжилттай удирдаж байсан.',
    aboutMe: 'Би технологийн хүчээр бизнесийн асуудлуудыг шийдвэрлэх, Монгол улсын дижитал ирээдүйг бүтээх чин хүсэлтэй.',
    skills: ['Стратеги төлөвлөлт', 'Бизнес хөгжил', 'Мэдээллийн технологийн засаглал', 'Төслийн удирдлага'],
    projects: ['Tavan Bogd Group Digital Transformation', 'Enterprise Resource Planning (ERP) System Implementation'],
    education: ['Компьютерийн ухааны магистр, МУИС', 'MBA, АНУ-ын Харвардын Бизнесийн Сургууль'],
    achievements: ['2023 оны шилдэг залуу захирал', 'Дижитал Шилжилтийн манлайлагч'],
    social: {
      linkedin: '#',
      email: 'batorshikh.g@tavanbogd.tech'
    }
  },
  {
    id: 'member-2',
    name: 'Б. Энх-Амгалан',
    position: 'Технологи хариуцсан захирал (CTO)',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800&h=800',
    experience: 'Программ хангамжийн архитектур, клауд системийн чиглэлээр 10 жил ажилласан. Нарийн төвөгтэй системүүдийг зохион бүтээх мастер.',
    aboutMe: 'Миний зорилго бол дэлхийн жишигт нийцсэн, өргөтгөх боломжтой технологийн дэд бүтцийг бий болгох явдал юм.',
    skills: ['System Architecture', 'Cloud Computing (AWS/Azure)', 'Distributed Systems', 'DevOps'],
    projects: ['Core Banking System Migration', 'AI-powered Analytics Platform'],
    education: ['Программ хангамжийн инженерчлэл, ШУТИС', 'MS in Computer Science, Stanford University'],
    achievements: ['AWS Certified Solutions Architect - Professional', 'Oracle Certified Professional'],
    social: {
      linkedin: '#',
      email: 'enkhamgalan.b@tavanbogd.tech'
    }
  },
  {
    id: 'member-3',
    name: 'С. Ундрах',
    position: 'Ахлах Программ хангамжийн инженер',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=800',
    experience: 'Frontend болон Backend хөгжүүлэлтийн чиглэлээр 8 жил ажилласан. Full-stack хөгжүүлэлтийн өргөн мэдлэгтэй.',
    aboutMe: 'Цэвэр код бичих, хэрэглэгчдэд ээлтэй интерфэйс бүтээх нь миний өдөр тутмын ажил, сонирхол юм.',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'GraphQL'],
    projects: ['E-commerce Platform Platform', 'Customer Relationship Management (CRM) System'],
    education: ['Мэдээллийн технологи, МУИС'],
    achievements: ['Mongolia Web Award 2022 - Best Backend', 'Hackathon Winner 2023'],
    social: {
      linkedin: '#',
      email: 'undrakh.s@tavanbogd.tech'
    }
  },
  {
    id: 'member-4',
    name: 'А. Болд',
    position: 'Системийн Архитектор',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800&h=800',
    experience: 'Банк санхүүгийн салбарын системүүд дээр 12 жил ажилласан туршлагатай.',
    aboutMe: 'Би өндөр ачаалал даах чадвартай, аюулгүй системүүдийг бүтээх сонирхолтой.',
    skills: ['Java', 'Microservices', 'Kubernetes', 'Security'],
    projects: ['Digital Banking Platform', 'Payment Gateway Integration'],
    education: ['Мэдээлэл технологийн инженер, ШУТИС'],
    achievements: ['Шилдэг инженер 2021', 'Certified Kubernetes Administrator'],
    social: {
      linkedin: '#',
      email: 'bold.a@tavanbogd.tech'
    }
  },
  {
    id: 'member-5',
    name: 'Т. Сарнай',
    position: 'UI/UX Дизайнер',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800&h=800',
    experience: 'Хэрэглэгчийн туршлага, интерфейс дизайны чиглэлээр 6 жил ажилласан.',
    aboutMe: 'Хэрэглэгчдэд хамгийн ойлгомжтой, гоо зүйн таашаал өгөхүйц шийдлүүдийг эрэлхийлдэг.',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    projects: ['Mobile App Redesign', 'Design System for Enterprise'],
    education: ['График дизайн, СУИС'],
    achievements: ['International Design Award 2022 - Silver'],
    social: {
      linkedin: '#',
      email: 'sarnai.t@tavanbogd.tech'
    }
  },
  {
    id: 'member-6',
    name: 'Ж. Даваа',
    position: 'Өгөгдлийн шинжээч',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=800',
    experience: 'Big Data болон Machine Learning чиглэлээр 5 жил ажилласан.',
    aboutMe: 'Өгөгдлөөс үнэ цэнтэй мэдээлэл гаргаж, бизнесийн шийдвэр гаргалтад дэмжлэг үзүүлэх нь миний зорилго.',
    skills: ['Python', 'R', 'TensorFlow', 'Tableau'],
    projects: ['Predictive Maintenance System', 'Customer Churn Analysis'],
    education: ['Статистикч, МУИС'],
    achievements: ['Data Science Competition Winner 2023'],
    social: {
      linkedin: '#',
      email: 'davaa.j@tavanbogd.tech'
    }
  },
  {
    id: 'member-7',
    name: 'М. Эрдэнэ',
    position: 'Бүтээгдэхүүний менежер',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800&h=800',
    experience: 'Agile арга зүйгээр төсөл удирдах 7 жилийн туршлагатай.',
    aboutMe: 'Технологи болон бизнесийн уялдаа холбоог хангаж, хэрэглэгчийн хүсэлд нийцсэн бүтээгдэхүүн гаргахыг эрмэлздэг.',
    skills: ['Agile/Scrum', 'Product Roadmap', 'Market Research'],
    projects: ['E-commerce Platform Launch', 'SaaS Product Development'],
    education: ['Бизнесийн удирдлага, Санхүү Эдийн Засгийн Их Сургууль'],
    achievements: ['Certified Scrum Product Owner (CSPO)'],
    social: {
      linkedin: '#',
      email: 'erdene.m@tavanbogd.tech'
    }
  },
  {
    id: 'member-8',
    name: 'О. Цэцэг',
    position: 'Frontend хөгжүүлэгч',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800&h=800',
    experience: 'Орчин үеийн вэб технологиуд дээр 4 жил ажилласан.',
    aboutMe: 'Хурдан, хүртээмжтэй вэб аппликейшнүүд хөгжүүлэх дуртай.',
    skills: ['Next.js', 'Tailwind CSS', 'Vue.js', 'Web Accessibility'],
    projects: ['Corporate Website Revamp', 'Dashboard Development'],
    education: ['Компьютерийн ухаан, МУИС'],
    achievements: ['Frontend Excellence Award 2022'],
    social: {
      linkedin: '#',
      email: 'tsetseg.o@tavanbogd.tech'
    }
  },
  {
    id: 'member-9',
    name: 'Б. Гантулга',
    position: 'DevOps инженер',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800&h=800',
    experience: 'Дэд бүтэц автоматжуулалт, CI/CD чиглэлээр 6 жил ажилласан.',
    aboutMe: 'Хөгжүүлэлтийн процессыг хөнгөвчлөх, системийн найдвартай ажиллагааг хангах нь миний үүрэг.',
    skills: ['Docker', 'Terraform', 'Jenkins', 'Google Cloud Platform'],
    projects: ['Cloud Migration Project', 'Automated Deployment Pipeline'],
    education: ['Сүлжээний инженер, ШУТИС'],
    achievements: ['Google Cloud Professional DevOps Engineer'],
    social: {
      linkedin: '#',
      email: 'gantulga.b@tavanbogd.tech'
    }
  },
  {
    id: 'member-10',
    name: 'Э. Наран',
    position: 'Мобайл хөгжүүлэгч',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800&h=800',
    experience: 'iOS болон Android апп хөгжүүлэлтийн 5 жилийн туршлагатай.',
    aboutMe: 'Гар утсанд суурилсан шинэлэг шийдлүүдийг хүмүүсийн гарт хүргэх нь таатай байдаг.',
    skills: ['Flutter', 'React Native', 'Swift', 'Kotlin'],
    projects: ['Food Delivery App', 'Fitness Tracking Application'],
    education: ['Программ хангамж, МУИС'],
    achievements: ['App Store Featured App Developer 2021'],
    social: {
      linkedin: '#',
      email: 'naran.e@tavanbogd.tech'
    }
  }
];
