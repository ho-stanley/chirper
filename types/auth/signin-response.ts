import Role from '../role.enum';

export interface SignInResponse {
  access_token: string;
  username: string;
  role: Role;
  id: number;
}
