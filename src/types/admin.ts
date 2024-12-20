export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'author';
  verified: boolean;
  team_name: string;
  mfa_enabled: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateAdminData {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'author';
  team_name: string;
}