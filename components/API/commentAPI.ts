import { AuthModalContextProps } from '../auth/modal/AuthModalContext'
import { postRequestHeaders, server } from '../main/config'
import { catchError } from './common'

export const postComment = async (commentBody: string, parentId: string, rootId: string, authModal: AuthModalContextProps) => {
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
    if (!res.ok) {
      if (res.status === 401) {
        authModal.setShow('login')
      }
      throw new Error(data?.msg)
    }
    return data as CommentProps
  } catch (err) {
    throw catchError(err)
  }
}

export const getCommentsFromPost = async (postId: string) => {
  try {
    const url = `${server}/comments/root/${postId}`
    const res = await fetch(url, {
      method: 'GET',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.msg)
    return data as CommentProps[]
  } catch (err) {
    throw catchError(err)
  }
}
