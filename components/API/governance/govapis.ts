import { postRequestHeaders, server } from '../../main/config'
import { catchError } from '../common'

const govapis = {
  translate: async (text: string, language: string) => {
    try {
      const url = `${server}/governance/translate?lang=${language}`
      const body = JSON.stringify({ text })
      const res = await fetch(url, {
        method: 'post',
        headers: postRequestHeaders,
        body,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as string
    } catch (err) {
      throw catchError(err)
    }
  },
}

export default govapis
