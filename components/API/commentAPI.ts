import { postRequestHeaders, server } from '../main/config'
import { catchError } from './common'

export const postComment = async (commentBody: string, parentId: string, rootId: string) => {
  try {
    const url = `${server}/comments`
    const body = JSON.stringify({ body: commentBody, parentId, rootId })
    const res = await fetch(url, {
      method: 'POST',
      headers: postRequestHeaders,
      credentials: 'include',
      body,
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.msg)
    return data
  } catch (err) {
    throw catchError(err)
  }
}

export const getCommentsFromPost = async (postId: string) => {
  try {
    const url = `${server}/comments/root/${postId}`
    const response = await fetch(url, {
      method: 'GET',
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data?.msg)
    return data
  } catch (err) {
    throw catchError(err)
  }
}
