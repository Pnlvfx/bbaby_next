import { catchError } from './common'
import { server } from '../main/config'

const telegramapis = {
  sendLog: async (message: string) => {
    try {
      const url = `${server}/analytics/logs?message=${message}`
      const res = await fetch(url, {
        method: 'GET',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data
    } catch (err) {
      throw catchError(err)
    }
  },
}

export default telegramapis
