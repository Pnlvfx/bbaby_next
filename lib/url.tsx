const server = process.env.NODE_ENV === 'production' ? 'https://api.bbabystyle.com' : 'http://localhost:4000';

export const loginUrl = `${server}/login`;  //  auth/AuthModal.tsx
export const registerUrl = `${server}/register`;  //  auth/AuthModal.tsx
export const google_loginUrl = `${server}/google_login`;  //  auth/Google.tsx

// reddit api
export const reddit_logoutUrl = `${server}/reddit_logout`;
export const reddit_loginUrl = (code:string) => `${server}/reddit_login?code=${code}`

