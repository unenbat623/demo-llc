import * as XLSX from 'xlsx';

export type TeamMemberImport = {
  name: string;
  position: string;
  image: string;
  skills?: string;
  aboutMe?: string;
  experience?: string;
  education?: string;
  projects?: string;
  achievements?: string;
  email?: string;
  linkedin?: string;
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
        const json = XLSX.utils.sheet_to_json(sheet);
        resolve(json as TeamMemberImport[]);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
};
