import { NextPageContext } from 'next'
import { postRequestHeaders, server } from '../main/config'
import { catchError } from './common'
import { ssrHeaders } from './ssrAPI'

export const getArticle = async (permalink: string, context?: NextPageContext) => {
  try {
    const serverUrl = `${server}/governance/news/article`
    const body = JSON.stringify({ permalink })
    const headers = context ? ssrHeaders(context) : postRequestHeaders
    const res = await fetch(serverUrl, {
      method: 'POST',
      body,
      headers,
      credentials: 'include',
    })
    const article = await res.json()
    if (!res.ok) throw new Error(article.msg)
    return article
  } catch (err) {
    throw catchError(err)
  }
}
