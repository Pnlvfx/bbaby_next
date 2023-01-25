import { NextPageContext } from 'next'
import { postRequestHeaders, server } from '../main/config'
import { catchError } from './common'
import { ssrHeaders } from './ssrAPI'

const newsapis = {
  getArticles: async (context?: NextPageContext) => {
    try {
      const url = `${server}/news`
      const headers = context ? ssrHeaders(context) : postRequestHeaders
      const res = await fetch(url, {
        method: 'get',
        headers,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as NewsProps[]
    } catch (err) {
      throw catchError(err)
    }
  },
  getArticle: async (permalink: string, context: NextPageContext) => {
    try {
      const url = `${server}/news/${permalink}`
      const res = await fetch(url, {
        method: 'get',
        headers: ssrHeaders(context),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as NewsProps
    } catch (err) {
      throw catchError(err)
    }
  },
  editNews: async (permalink: string, title: string, description: string) => {
    try {
      const url = `${server}${permalink}/edit`
      const headers = postRequestHeaders
      const body = JSON.stringify({
        title,
        description,
      })
      const res = await fetch(url, {
        method: 'POST',
        headers,
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
}

export default newsapis
