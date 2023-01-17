import { NextPageContext } from 'next'
import { postRequestHeaders, server } from '../../main/config'
import { catchError } from '../common'
import { ssrHeaders } from '../ssrAPI'
const youtubeAPIbase = `${server}/governance/youtube`

export const getYoutubeAccessToken = async (code: string, context: NextPageContext) => {
  try {
    const url = `${youtubeAPIbase}/access_token?code=${code}`
    const body = JSON.stringify({ code })
    const res = await fetch(url, {
      method: 'post',
      body,
      headers: context ? ssrHeaders(context) : postRequestHeaders,
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.msg)
    return data
  } catch (err) {
    throw catchError(err)
  }
}
