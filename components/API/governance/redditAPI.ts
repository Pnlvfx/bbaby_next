import { server } from '../../main/config'
import { catchError, isJson } from '../common'

export const getRedditPosts = async (after?: string, count?: number) => {
  try {
    const url = `${server}/reddit/posts`
    const query = after ? `after=${after}&count=${count}` : null
    const finalUrl = query ? `${url}?${query}` : url
    const res = await fetch(finalUrl, {
      method: 'get',
      credentials: 'include',
    })
    const p = isJson(res) ? await res.json() : null
    if (!res.ok) throw new Error(p ? p?.msg : 'Something went wrong')
    return p.data
  } catch (err) {
    throw catchError(err)
  }
}
