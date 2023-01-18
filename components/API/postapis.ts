import { server } from '../main/config'
import { catchError } from './common'

const postapis = {
  getPosts: async (skip: number, input?: string, value?: string) => {
    try {
      let url = `${server}/posts?limit=10&skip=${skip}`
      if (input && value) {
        url = `${server}/posts?${input}=${value}&limit=10&skip=${skip}`
      }
      const res = await fetch(url, {
        method: 'get',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as PostProps[]
    } catch (err) {
      throw catchError(err)
    }
  },
  getPost: async (postId: string | string[]) => {
    try {
      const url = `${server}/posts/${postId}`
      const res = await fetch(url, {
        method: 'get',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as PostProps
    } catch (err) {
      throw catchError(err)
    }
  },
  deletePost: async (postId: string) => {
    try {
      const url = `${server}/posts/${postId}`
      const res = await fetch(url, {
        method: 'delete',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data
    } catch (err) {
      throw catchError(err)
    }
  },
}

export default postapis
