import { NextPageContext } from 'next'

export interface GetPostsOptions {
  limit?: number
  author?: string
  community?: string
  context?: NextPageContext
}

export interface NewPostOptions {
  body?: string
  selectedFile?: string
  isImage?: boolean
  isVideo?: boolean
  width?: number
  height?: number
  sharePostToTwitter?: boolean
  sharePostToTG?: boolean
}
