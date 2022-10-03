import Role from './role.enum';

export interface User {
  id: string;
  username: string;
  role: Role;
}
