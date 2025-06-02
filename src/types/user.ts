// src/types/user.ts
export interface UserData {
  id: string;
  username: string;
  email: string;
  token?: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;

}
