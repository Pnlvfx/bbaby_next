import { NextPageContext } from 'next'
import { server, siteUrl } from '../main/config'
import { catchError } from './common'

export const ssrHeaders = (context: NextPageContext) => {
  const user_agent = context.req?.headers['user-agent'] ? context.req.headers['user-agent'] : ''
  const cookie = context?.req?.headers?.cookie ? context.req.headers.cookie : ''
  const index = context.req?.rawHeaders.indexOf('Accept-Language')
  if (!index) return //fornow
  const lang = context.req && index ? context.req.rawHeaders[index + 1] : 'en-US'
  if (!lang) return // fornow
  const headers = {
    cookie,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    origin: siteUrl,
    'user-agent': user_agent,
    'Accept-Language': lang,
  }
  return headers
}

export const getSession = async (context: NextPageContext) => {
  try {
    const url = `${server}/user`
    const response = await fetch(url, {
      method: 'GET',
      headers: ssrHeaders(context),
    })
    const session = await response.json()
    if (!response.ok) {
      if (response.status === 601) {
        context.res?.setHeader('Set-Cookie', `token=''; Max-Age=0`)
        await getSession(context)
        return
      } else {
        throw new Error(session?.msg)
      }
    }
    return session as SessionProps
  } catch (err) {
    catchError(err)
  }
}
