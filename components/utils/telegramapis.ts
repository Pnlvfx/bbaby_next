import { catchError } from '../API/common'
import { server } from '../main/config'

const telegramapis = {
  sendLog: async (message: string) => {
    try {
      const url = `${server}/analytics/logs?message=${message}`
      const res = await fetch(url, {
        method: 'GET',
      })
    } catch (err) {
      catchError(err)
    }
  },
}

export default telegramapis
