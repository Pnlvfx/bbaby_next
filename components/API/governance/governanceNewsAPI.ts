import { NextPageContext } from 'next'
import { postRequestHeaders, server } from '../../main/config'
import { catchError } from '../common'
import { ssrHeaders } from '../ssrAPI'

export const getBBCLinks = async (limit: string | number, skip: string | number, context?: NextPageContext) => {
  try {
    const url = `${server}/governance/BBCnews?limit=${limit}&skip=${skip}`
    const headers = context ? ssrHeaders(context) : postRequestHeaders
    const res = await fetch(url, {
      method: 'get',
      credentials: 'include',
      headers,
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.msg)
    return data as ExternalNews[]
  } catch (err) {
    throw catchError(err)
  }
}

export const searchPexelsImages = async (text: string) => {
  try {
    const url = `${server}/governance/pexels?text=${text}`
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
