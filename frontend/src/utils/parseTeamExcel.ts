import * as XLSX from 'xlsx';

export type TeamMemberImport = {
  name: string;
  position: string;
  image?: string;
  skills?: string | string[];
  aboutMe?: string;
  experience?: string;
  education?: string | string[];
  projects?: string | string[];
  achievements?: string | string[];
  email?: string;
  linkedin?: string;
};

const columnMap: Record<string, keyof TeamMemberImport> = {
  'name': 'name',
  'Нэр': 'name',
  'нэр': 'name',
  'position': 'position',
  'Албан тушаал': 'position',
  'албан тушаал': 'position',
  'image': 'image',
  'Зураг': 'image',
  'зураг': 'image',
  'email': 'email',
  'Имэйл': 'email',
  'имэйл': 'email',
  'linkedin': 'linkedin',
  'Линкедин': 'linkedin',
  'линкедин': 'linkedin',
  'skills': 'skills',
  'Ур чадвар': 'skills',
  'ур чадвар': 'skills',
  'aboutMe': 'aboutMe',
  'Миний тухай': 'aboutMe',
  'миний тухай': 'aboutMe',
  'experience': 'experience',
  'Туршлага': 'experience',
  'туршлага': 'experience',
  'education': 'education',
  'Боловсрол': 'education',
  'боловсрол': 'education',
  'projects': 'projects',
  'Төслүүд': 'projects',
  'төслүүд': 'projects',
  'achievements': 'achievements',
  'Амжилт': 'achievements',
  'амжилт': 'achievements'
};

export const parseTeamExcel = async (file: File): Promise<TeamMemberImport[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawJson = XLSX.utils.sheet_to_json(sheet) as any[];

        const formattedJson = rawJson.map(row => {
          const newRow: any = {};
          Object.keys(row).forEach(key => {
            const mappedKey = columnMap[key];
            if (mappedKey) {
              newRow[mappedKey] = row[key];
            }
          });
          return newRow as TeamMemberImport;
        }).filter(row => row.name && row.position); // Заавал байх ёстой талбарууд

        resolve(formattedJson);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
};
