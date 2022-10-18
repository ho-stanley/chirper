/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from '../../../utils/http/axios-http';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Sign in with provided credentials
        if (credentials) {
          return signIn({
            username: credentials.username,
            password: credentials.password,
          })
            .then(({ access_token, role, username, id }) => {
              const user = {
                accessToken: access_token,
                username,
                role,
                id,
              };

              return user;
            })
            .catch(() => null);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist data to the token right after signin
      if (user) {
        token.accessToken = user.accessToken;
        token.username = user.username;
        token.role = user.role;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.user = {
          accessToken: token.accessToken,
          username: token.username,
          role: token.role,
          id: token.id,
        };
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
});
