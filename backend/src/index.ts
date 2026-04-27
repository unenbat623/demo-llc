import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import TeamMember from './models/TeamMember';
import Log from './models/Log';
import User from './models/User';
import Settings from './models/Settings';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tavan_bogd_tech';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Settings Routes
app.get('/api/settings', async (req: Request, res: Response) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/settings', async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(settings);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Team Routes
app.get('/api/team', async (req: Request, res: Response) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/logs', async (req: Request, res: Response) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/logs', async (req: Request, res: Response) => {
  try {
    const log = new Log(req.body);
    const newLog = await log.save();
    res.status(201).json(newLog);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/api/team', async (req: Request, res: Response) => {
  try {
    const member = new TeamMember(req.body);
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/team/:id', async (req: Request, res: Response) => {
  try {
    const updatedMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(updatedMember);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/team/:id', async (req: Request, res: Response) => {
  try {
    const deletedMember = await TeamMember.findByIdAndDelete(req.params.id);
    if (!deletedMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json({ message: 'Team member deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Simple password comparison (in production, use bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    res.json({
      message: 'Login successful',
      user: {
        username: user.username,
        role: user.role,
        id: user._id
      }
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/auth/profile', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const userToUpdate = await User.findOne(); // Simplified for demo
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (username) userToUpdate.username = username;
    if (password) userToUpdate.password = password;
    
    await userToUpdate.save();
    res.json({ message: 'Profile updated' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// User Management Routes
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user: { username: user.username, role: user.role, id: user._id } });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const updateData: any = {};
    if (username) updateData.username = username;
    if (password) updateData.password = password;
    if (role) updateData.role = role;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated successfully', user: { username: user.username, role: user.role, id: user._id } });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Log Deletion Routes
app.delete('/api/logs', async (req: Request, res: Response) => {
  try {
    await Log.deleteMany({});
    res.json({ message: 'All logs deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/logs/:id', async (req: Request, res: Response) => {
  try {
    const deletedLog = await Log.findByIdAndDelete(req.params.id);
    if (!deletedLog) {
      return res.status(404).json({ message: 'Log not found' });
    }
    res.json({ message: 'Log deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/team/seed', async (req: Request, res: Response) => {
  try {
    const count = await TeamMember.countDocuments();
    if (count > 0) {
      return res.status(400).json({ message: 'Database already seeded' });
    }
    const seededMembers = await TeamMember.insertMany(req.body);
    res.status(201).json(seededMembers);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Team Member Generator Utility
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

// Cyrillic to Latin transliteration map
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

const generateRandomTeamMember = (): GeneratedTeamMember => {
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

app.post('/api/team/generate', async (req: Request, res: Response) => {
  try {
    const { count = 5 } = req.body;
    if (count < 1 || count > 50) {
      return res.status(400).json({ message: 'Count must be between 1 and 50' });
    }
    const generatedMembers: GeneratedTeamMember[] = [];
    for (let i = 0; i < count; i++) {
      generatedMembers.push(generateRandomTeamMember());
    }
    const savedMembers = await TeamMember.insertMany(generatedMembers);
    res.status(201).json({
      message: `${count} team members generated and saved`,
      members: savedMembers
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const seedUsers = async () => {
  try {
    const adminCount = await User.countDocuments({ username: 'admin' });
    const staffCount = await User.countDocuments({ username: 'staff' });
    if (adminCount === 0) {
      await User.create({ username: 'admin', password: 'admin', role: 'admin' });
    }
    if (staffCount === 0) {
      await User.create({ username: 'staff', password: 'staff', role: 'staff' });
    }
  } catch (err: any) {
    console.error('Error seeding users:', err.message);
  }
};

app.listen(PORT, async () => {
  await seedUsers();
  console.log(`Server running on port ${PORT}`);
});
