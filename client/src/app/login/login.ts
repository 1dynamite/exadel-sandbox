import { User } from '../user';

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponseOK {
  token: string;
  expiresIn: string;
  user: User;
}

export interface LoginReturn {
  status: number;
  user?: User;
  message?: string;
}
