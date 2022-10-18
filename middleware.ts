import { withAuth } from 'next-auth/middleware';
import Role from './types/role.enum';

export default withAuth({
  callbacks: {
    async authorized({ req, token }) {
      if (req.nextUrl.pathname === '/a') {
        return token?.role === Role.Admin;
      }
      return !!token;
    },
  },
  pages: {
    signIn: '/signin',
  },
});

export const config = { matcher: ['/a', '/my-posts', '/new-post'] };
