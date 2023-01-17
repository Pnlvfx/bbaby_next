import { catchError } from '../API/common'

export const getUserInfo = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/about`, {
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
