const server = process.env.NEXT_PUBLIC_SERVER_URL;

export const loginUrl = `${server}/login`;  //  auth/AuthModal.tsx
export const registerUrl = `${server}/register`;  //  auth/AuthModal.tsx
export const google_loginUrl = `${server}/google_login`;  //  auth/Google.tsx

export const userAPIurl = {
    userInfo: `${server}/user/about` as `/user/about`,
    reset_password: `${server}/user/forgot` as '/user/forgot',
}

export const redditAPIurl = {
    login: (code: string) => `${server}/reddit/login?code=${code}` as `/reddit/login?code`, //auth/Reddit.tsx
    logout: `${server}/reddit/logout` as '/reddit/logout' //auth/Reddit.tsx
}

//governance api
export const youtubeLoginUrl = `${server}/governance/youtube/login` as `/governance/youtube/login`;
export const youtubeAccessTokenUrl = `${server}/governance/youtube/access_token` as '/governance/youtube/access_token?code=string'


export const communityUrl = {
    change_avatar : (name:string) => `${server}/communities/${name}/change_avatar`,
    update_description : `${server}/communities/edit/description` as `/communities/edit/description`,
    user_preferred_communities: `${server}/communities/user/pref?limit=11` as `/communities/user/pref?limit?number`
}

