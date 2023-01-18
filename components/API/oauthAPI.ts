import { loginUrl, registerUrl } from '../../lib/url'
import { postRequestHeaders } from '../main/config'
import { catchError } from './common'

export const register = async (email: string, username: string, password: string) => {
  try {
    const body = JSON.stringify({
      email,
      username,
      password,
    })
    const res = await fetch(registerUrl, {
      method: 'post',
      body,
      headers: postRequestHeaders,
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.msg)
    return data
  } catch (err) {
    throw catchError(err)
  }
}

export const login = async (username: string, password: string) => {
  try {
    const body = JSON.stringify({ username, password })
    const res = await fetch(loginUrl, {
      method: 'post',
      body,
      headers: postRequestHeaders,
      credentials: 'include',
    })
    const data = await res.json()
    if (res.ok) {
      return data
    } else {
      throw new Error(data.msg)
    }
  } catch (err) {
    throw catchError(err)
  }
}

export const checkEmail = async (email: string) => {
  try {
    const body = JSON.stringify({ email })
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const url = `${server}/check_email`
    const res = await fetch(url, {
      method: 'post',
      body,
      headers: postRequestHeaders,
      credentials: 'include',
    })
    const data = await res.json()
    if (res.ok) {
      return { status: true, data: data.msg }
    } else {
      return { status: false, data: data.msg }
    }
  } catch (err) {
    if (err instanceof Error) {
      return { status: false, data: err.message }
    } else {
      return { status: false, data: 'API error' }
    }
  }
}
