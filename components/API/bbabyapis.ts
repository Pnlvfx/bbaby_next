import { server } from '../main/config'
import { catchError } from './common'

const bbabyapis = {
  generateImage: async (text: string) => {
    try {
      const url = `${server}/images/generations?text=${text}`
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as {
        image: string
        width: number
        height: number
      }
    } catch (err) {
      throw catchError(err)
    }
  },
}

export default bbabyapis
