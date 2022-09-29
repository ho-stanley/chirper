import { withAuth } from 'next-auth/middleware';
import Role from './types/role.enum';

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname === '/a') {
        return token?.role === Role.Admin;
      }
      return !!token;
    },
  },
});

export const config = { matcher: ['/a', '/my-posts', '/new-post'] };
