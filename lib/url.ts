import { server } from '../components/main/config'

export const loginUrl = `${server}/login` as '/login'
export const registerUrl = `${server}/register` //  auth/AuthModal.tsx

export const userAPIurl = {
  reset_password: `${server}/user/forgot` as '/user/forgot',
}

export const redditAPIurl = {
  login: (code: string) => `${server}/reddit/login?code=${code}` as `/reddit/login?code`, //auth/Reddit.tsx
  logout: `${server}/reddit/logout` as '/reddit/logout', //auth/Reddit.tsx
}

export const communityUrl = {
  change_avatar: (name: string) => `${server}/communities/${name}/change_avatar`,
  update_description: `${server}/communities/edit/description` as `/communities/edit/description`,
}
