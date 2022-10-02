/* eslint-disable no-unused-vars */
import Role from './role.enum';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      username: string;
      role: Role;
      id: string;
    };
  }

  interface User {
    accessToken: string;
    username: string;
    role: Role;
    id: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    username: string;
    role: Role;
    id: string;
  }
}
