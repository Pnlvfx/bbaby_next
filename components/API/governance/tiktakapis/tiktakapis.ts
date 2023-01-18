import { NextPageContext } from 'next'
import { postRequestHeaders, server } from '../../../main/config'
import { catchError } from '../../common'
import { ssrHeaders } from '../../ssrAPI'
import { GetTiktakResponse, NewTiktakResponse } from './types/tiktak'

const tiktakapis = {
  newTiktak: async (text: string, language: string) => {
    try {
      const url = `${server}/governance/tiktak/new-tiktak?lang=${language}`
      const body = JSON.stringify({ text })
      const res = await fetch(url, {
        method: 'post',
        headers: postRequestHeaders,
        body,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as NewTiktakResponse
    } catch (err) {
      throw catchError(err)
    }
  },
  getTiktak: async (permalink: string, context?: NextPageContext) => {
    try {
      const serverUrl = `${server}/governance/tiktak/${permalink}`
      const headers = context ? ssrHeaders(context) : postRequestHeaders
      const res = await fetch(serverUrl, {
        method: 'get',
        headers,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.msg)
      return data as GetTiktakResponse
    } catch (err) {
      throw catchError(err)
    }
  },
  createTiktak: async (permalink: string, text: string, synthetize: string) => {
    try {
      const url = `${server}/governance/tiktak/create?permalink=${permalink}`
      const body = JSON.stringify({
        text,
        synthetize,
      })
      const res = await fetch(url, {
        method: 'POST',
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
  },
}

export default tiktakapis
