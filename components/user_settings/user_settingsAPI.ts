import { catchError } from '../API/common'
import { server } from '../main/config'

export const getUserInfo = async () => {
  try {
    const res = await fetch(`${server}/user/about`, {
      method: 'get',
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.msg)
    return data as UserProps
  } catch (err) {
    throw catchError(err)
  }
}
