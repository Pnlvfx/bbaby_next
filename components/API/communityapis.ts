import { Dispatch, SetStateAction } from 'react'
import { catchError } from './common'
import { postRequestHeaders, server } from '../main/config'

const communityapis = {
  getCommunities: async (limit: number) => {
    try {
      const url = `${server}/communities?limit=${limit}`
      const res = await fetch(url, {
        method: 'get',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as CommunityProps[]
    } catch (err) {
      throw catchError(err)
    }
  },
  getCommunity: async (community: string) => {
    try {
      const url = `${server}/communities/${community}`
      const res = await fetch(url, {
        method: 'get',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as string
    } catch (err) {
      throw catchError(err)
    }
  },
  searchCommunity: async (text: string) => {
    try {
      const url = `${server}/communities/search?phrase=${text}`
      const body = JSON.stringify({})
      const res = await fetch(url, {
        method: 'POST',
        headers: postRequestHeaders,
        body,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as CommunityProps[]
    } catch (err) {
      throw catchError(err)
    }
  },
  updateDescription: async (community: string, descr: string) => {
    try {
      const body = JSON.stringify({ descr, name: community })
      const res = await fetch(`${server}/communities/edit/description`, {
        method: 'POST',
        headers: postRequestHeaders,
        body,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as true
    } catch (err) {
      throw catchError(err)
    }
  },
  getUserPrefCommunities: async () => {
    try {
      const res = await fetch(`${server}/communities/user/pref?limit=11`, {
        method: 'get',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as CommunityProps[]
    } catch (err) {
      throw catchError(err)
    }
  },
  newCommunity: async (name: string) => {
    try {
      const url = `${server}/communities`
      const body = JSON.stringify({ name })
      const res = await fetch(url, {
        method: 'POST',
        body,
        headers: postRequestHeaders,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as {
        msg: string
      }
    } catch (err) {
      throw catchError(err)
    }
  },
  changeAvatar: async (community: string, image: string) => {
    try {
      const url = `${server}/communities/${community}/change_avatar`
      const body = JSON.stringify({ image })
      const res = await fetch(url, {
        method: 'POST',
        body,
        headers: postRequestHeaders,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as {
        msg: string
      }
    } catch (err) {
      throw catchError(err)
    }
  },
  subscribe: async (community: string, setShow: Dispatch<SetStateAction<'hidden' | 'login' | 'register' | 'reset-your-password'>>) => {
    try {
      const url = `${server}/communities/subscribe`
      const body = JSON.stringify({
        community,
      })
      const res = await fetch(url, {
        method: 'POST',
        headers: postRequestHeaders,
        body,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 401 || 400) {
          setShow('login')
        }
        throw new Error(data?.msg)
      }
      return data as true
    } catch (err) {
      throw catchError(err)
    }
  },
  selectCategory: async (community: string, categoryName: string) => {
    try {
      const url = `${server}/communities/${community}/category`
      const body = JSON.stringify({ category: categoryName })
      const res = await fetch(url, {
        method: 'POST',
        headers: postRequestHeaders,
        body,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as true
    } catch (err) {
      throw catchError(err)
    }
  },
}

export default communityapis
