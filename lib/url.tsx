const server = process.env.NODE_ENV === 'production' ? 'https://api.bbabystyle.com' : 'http://localhost:4000';

export const loginUrl = `${server}/login`;  //  auth/AuthModal.tsx
export const registerUrl = `${server}/register`;  //  auth/AuthModal.tsx
export const google_loginUrl = `${server}/google_login`;  //  auth/Google.tsx

// reddit api
export const reddit_logoutUrl = `${server}/reddit/logout`;
export const reddit_loginUrl = (code:string) => `${server}/reddit/login?code=${code}`

//governance api
export const youtubeLoginUrl = `${server}/governance/youtube/login` as `/governance/youtube/login`;
export const youtubeAccessTokenUrl = `${server}/governance/youtube/access_token` as '/governance/youtube/access_token?code'


export const communityUrl = {
    change_avatar : (name:string) => {
        return `${server}/communities/${name}/change_avatar`
    }
}

