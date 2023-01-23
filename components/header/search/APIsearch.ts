import { catchError } from '../../API/common'
import { server } from '../../main/config'

export const search = async (text: string) => {
  try {
    const url = `${server}/search?phrase=${text}`
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.msg)
    return data
  } catch (err) {
    throw catchError(err)
  }
}

export const searchTrend = async () => {
  try {
    const url = `${server}/search/today-trend`
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.msg)
    return data
  } catch (err) {
    throw catchError(err)
  }
}
