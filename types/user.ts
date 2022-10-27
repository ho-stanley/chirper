import Role from './role.enum';

export interface User {
  id: string;
  username: string;
  role: Role;
}

export interface NewUserData {
  username: string;
  password: string;
  repeatPassword: string;
  role: Role;
}
