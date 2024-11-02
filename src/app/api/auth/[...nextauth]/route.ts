import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import { addUser, checkUser } from '../../../../../server/service/user';
import { refreshAccessToken } from '../../../../../server/service/jwt';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      // refresh token 발급을 위함.
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || ''
    })
  ],
  pages: {
    signIn: '/auth/signIn'
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30 // 30 days
  },
  session: {
    maxAge: 60 * 60 * 24 * 30 // 30 days
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      const result = await checkUser(user.email as string);
      if (!result) {
        // new user
        return await addUser(user);
      }
      return true;
    },
    jwt: async ({ token, account, user }) => {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at;
        token.provider = account.provider;
      }

      if (Date.now() / 1000 < (token.accessTokenExpires as number)) {
        return token;
      }

      return await refreshAccessToken(token);
    }
  }
});

export { handler as GET, handler as POST };
