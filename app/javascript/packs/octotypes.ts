export interface Repository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  owner: User;
  extend: {
    subscribed: boolean;
    action: 'create' | 'delete' | null;
  };
}

export interface User {
  id: number;
  login: string;
  avatar_url: string;
}
