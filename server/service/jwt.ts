import { JWT } from 'next-auth/jwt';

// 토큰 갱신 함수는 기존과 동일
export async function refreshAccessToken(token: JWT): Promise<JWT> {
  console.log('refresh token');
  try {
    let url = '';
    let params = {};

    if (token.provider === 'google') {
      url = 'https://oauth2.googleapis.com/token';
      params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken as string
      });
    } else if (token.provider === 'kakao') {
      url = 'https://kauth.kakao.com/oauth/token';
      params = new URLSearchParams({
        client_id: process.env.KAKAO_CLIENT_ID || '',
        client_secret: process.env.KAKAO_CLIENT_SECRET || '',
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken as string
      });
    }

    const response = await fetch(`${url}?${params}`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST'
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to refresh token for ${token.provider}`);
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
    };
  } catch (error) {
    console.error('Failed to refresh access token:', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    };
  }
}
