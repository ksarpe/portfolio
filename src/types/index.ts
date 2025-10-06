export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  link?: string;
  github?: string;
  createdAt: Date;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}
