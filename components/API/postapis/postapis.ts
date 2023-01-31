import { NextPageContext } from 'next'
import { AuthModalContextProps } from '../../auth/modal/AuthModalContext'
import { postRequestHeaders, server } from '../../main/config'
import { catchError } from '../common'
import { ssrHeaders } from '../ssrAPI'
import { GetPostsOptions, NewPostOptions } from './types/postapi'

const postapis = {
  getPosts: async (skip: number, options?: GetPostsOptions) => {
    try {
      const limit = options?.limit || 10
      let url = `${server}/posts?skip=${skip}&limit=${limit}`
      if (options) {
        const usedOptions = Object.entries(options).filter(([key, value]) => value !== undefined)
        usedOptions.forEach(([key, value]) => {
          if (key === 'context') return
          if (key === 'limit') return
          url += `&${key}=${value}`
        })
      }
      const headers = options?.context ? ssrHeaders(options.context) : postRequestHeaders
      const res = await fetch(url, {
        method: 'get',
        credentials: 'include',
        headers,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as PostProps[]
    } catch (err) {
      throw catchError(err)
    }
  },
  getPost: async (postId: string, context?: NextPageContext) => {
    try {
      const url = `${server}/posts/${postId}`
      const headers = context ? ssrHeaders(context) : postRequestHeaders
      const res = await fetch(url, {
        method: 'get',
        headers,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as PostProps
    } catch (err) {
      throw catchError(err)
    }
  },
  newPost: async (title: string, community: string, options?: NewPostOptions) => {
    try {
      const url = `${server}/posts`
      const body = JSON.stringify({
        title,
        community,
        body: options?.body,
        selectedFile: options?.selectedFile,
        isImage: options?.isImage,
        isVideo: options?.isVideo,
        height: options?.height,
        width: options?.width,
        sharePostToTG: options?.sharePostToTG,
        sharePostToTwitter: options?.sharePostToTwitter,
      })
      const res = await fetch(url, {
        method: 'post',
        body,
        headers: postRequestHeaders,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as PostProps
    } catch (err) {
      throw catchError(err)
    }
  },
  vote: async (postId: string, dir: number, modalContext: AuthModalContextProps) => {
    try {
      const url = `${server}/posts/${postId}/vote`
      const body = JSON.stringify({ dir })
      const res = await fetch(url, {
        method: 'POST',
        headers: postRequestHeaders,
        body,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 401) {
          modalContext.setShow('login')
        }
        throw new Error(data?.msg)
      }
      return data as {
        vote: number
      }
    } catch (err) {
      throw catchError(err)
    }
  },
  deletePost: async (postId: string) => {
    try {
      const url = `${server}/posts/${postId}`
      const res = await fetch(url, {
        method: 'delete',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as true
    } catch (err) {
      throw catchError(err)
    }
  },
}

export default postapis
