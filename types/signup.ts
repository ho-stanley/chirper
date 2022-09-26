import Role from './role.enum';

export interface SignupResponse {
  id: string;
  username: string;
  role: Role;
}

export interface SignupData {
  username: string;
  password: string;
  repeatPassword: string;
}
