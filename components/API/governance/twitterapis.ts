import Router from 'next/router'
import { server } from '../../main/config'
import { catchError } from '../common'

const twitterapis = {
  getMyListTweets: async (listId: string, owner_screen_name: string) => {
    try {
      const url = `${server}/twitter/selected-tweets?slug=${listId}&owner_screen_name=${owner_screen_name}`
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 401) Router.push('/settings')
        throw new Error(data?.msg)
      }
      return data as TweetProps[]
    } catch (err) {
      throw catchError(err)
    }
  },
  getAnonHome: async () => {
    try {
      const url = `${server}/twitter/home`
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 401) Router.push('/settings')
        throw new Error(data?.msg)
      }
      return data as TweetProps[]
    } catch (err) {
      throw catchError(err)
    }
  },
}

export default twitterapis
