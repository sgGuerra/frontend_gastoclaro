export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  profile_type?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password?: string; // Solo en request
}

export interface AuthResponse {
  token: string;
  user: User;
}
