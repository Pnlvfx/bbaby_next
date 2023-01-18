import { Dispatch, SetStateAction } from 'react'
import { catchError } from './common'
import { postRequestHeaders, server } from '../main/config'

export const getUserPrefCommunities = async () => {
  try {
    const res = await fetch(`${server}/communities/user/pref?limit=11`, {
      method: 'get',
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.msg)
    return data
  } catch (err) {
    throw catchError(err)
  }
}

export const subscribe = async (
  communityName: string,
  setShow: Dispatch<SetStateAction<'hidden' | 'login' | 'register' | 'reset-your-password'>>
) => {
  try {
    const url = `${server}/communities/subscribe`
    const body = JSON.stringify({
      community: communityName,
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
      } else {
        throw new Error(data?.msg)
      }
    } else {
      return data
    }
  } catch (err) {
    throw catchError(err)
  }
}

export const selectCategory = async (categoryName: string, name: string) => {
  //name: communityToAddtheCategories to
  try {
    const url = `${server}/communities/${name}/category`
    const body = JSON.stringify({ category: categoryName })
    const res = await fetch(url, {
      method: 'POST',
      headers: postRequestHeaders,
      body,
      credentials: 'include',
    })
    const data = await res.json()
    if (res.ok) {
      return data
    } else {
      throw new Error(data?.msg)
    }
  } catch (err) {
    throw catchError(err)
  }
}

export const searchCommunity = async (text: string) => {
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
    if (res.ok) {
      return data
    } else {
      throw new Error(data?.msg)
    }
  } catch (err) {
    throw catchError(err)
  }
}

export const getCommunities = async (limit: number) => {
  try {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const url = `${server}/communities?limit=${limit}`
    const res = await fetch(url, {
      method: 'get',
      credentials: 'include',
    })
    const data = await res.json()
    if (res.ok) {
      return data
    } else {
      throw new Error(data?.msg)
    }
  } catch (err) {
    throw catchError(err)
  }
}
