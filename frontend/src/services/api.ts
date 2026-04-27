const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export interface TeamMember {
  _id?: string;
  id?: string; // For compatibility with old data
  name: string;
  position: string;
  image: string;
  experience?: string;
  aboutMe?: string;
  skills: string[];
  projects: string[];
  education: string[];
  achievements: string[];
  social: {
    linkedin: string;
    email?: string;
  };
}

export const fetchTeam = async (): Promise<TeamMember[]> => {
  const response = await fetch(`${API_URL}/team`);
  if (!response.ok) {
    throw new Error('Failed to fetch team members');
  }
  return response.json();
};

export const addTeamMember = async (member: Omit<TeamMember, '_id'>): Promise<TeamMember> => {
  const response = await fetch(`${API_URL}/team`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(member),
  });
  if (!response.ok) {
    throw new Error('Failed to add team member');
  }
  return response.json();
};

export const seedTeam = async (members: any[]): Promise<void> => {
  const response = await fetch(`${API_URL}/team/seed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(members),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to seed team members');
  }
};

export interface LoginResponse {
  message: string;
  user: {
    username: string;
    role: 'admin' | 'staff';
    id: string;
  };
}

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  return response.json();
};

export const generateTeamMembers = async (count: number = 5): Promise<any> => {
  const response = await fetch(`${API_URL}/team/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ count }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate team members');
  }
  return response.json();
};
