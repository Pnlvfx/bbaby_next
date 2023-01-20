import { postRequestHeaders, server } from '../../main/config'
import { catchError } from '../common'

const youtubeapis = {
  getYoutubeAccessToken: async (code: string) => {
    try {
      const youtubeAPIbase = `${server}/governance/youtube`
      const url = `${youtubeAPIbase}/access_token?code=${code}`
      const body = JSON.stringify({ code })
      const res = await fetch(url, {
        method: 'post',
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
}

export default youtubeapis
