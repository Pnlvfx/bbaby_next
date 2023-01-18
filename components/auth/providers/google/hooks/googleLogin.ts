import { CredentialResponse } from '../../../../../@types/google'
import { postRequestHeaders, server } from '../../../../main/config'
import { catchError } from '../../../../API/common'

export const googleLogin = async (response: CredentialResponse) => {
  try {
    const body = JSON.stringify({ tokenId: response.credential })
    const res = await fetch(`${server}/google_login`, {
      method: 'post',
      headers: postRequestHeaders,
      body,
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.msg)
    return data
  } catch (err) {
    throw catchError(err)
  }
}
