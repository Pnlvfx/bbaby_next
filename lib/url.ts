import { server } from '../components/main/config'

export const redditAPIurl = {
  login: (code: string) => `${server}/reddit/login?code=${code}` as `/reddit/login?code`, //auth/Reddit.tsx
  logout: `${server}/reddit/logout` as '/reddit/logout', //auth/Reddit.tsx
}
