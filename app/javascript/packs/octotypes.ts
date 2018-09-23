export interface Repository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: User;
}

export interface User {
  id: number;
  login: string;
}
