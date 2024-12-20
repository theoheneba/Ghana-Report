export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  author_verified: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  slug: string;
  excerpt: string;
  cover_image?: string;
  tags: string[];
}

export interface Author {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'author';
  verified: boolean;
  team_name: string;
  bio?: string;
  avatar_url?: string;
}