import { postRequestHeaders, server } from '../main/config'
import { catchError } from './common'

const userapis = {
  changeAvatar: async (image: string) => {
    try {
      const url = `${server}/user/change_avatar`
      const body = JSON.stringify({ image })
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: postRequestHeaders,
        body,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as {
        success: string
      }
    } catch (err) {
      throw catchError(err)
    }
  },
  saveEUcookie: async (status: boolean) => {
    try {
      const url = `${server}/eu_cookie`
      const body = JSON.stringify({ status })
      const res = await fetch(url, {
        method: 'POST',
        headers: postRequestHeaders,
        credentials: 'include',
        body,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as true
    } catch (err) {
      throw catchError(err)
    }
  },
  getUserInfo: async () => {
    try {
      const res = await fetch(`${server}/user/about`, {
        method: 'get',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as UserProps
    } catch (err) {
      throw catchError(err)
    }
  },
}

export default userapis
