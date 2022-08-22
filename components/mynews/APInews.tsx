import { NextPageContext } from "next";
import { ssrHeaders } from "../API/ssrAPI";
import { postRequestHeaders } from "../main/config";

export const getOneNews = async (id: string, context: NextPageContext) => {
    try {
        const server = process.env.NEXT_PUBLIC_SERVER_URL;
        const url = `${server}/news/${id}`
        const res = await fetch(url, {
            method: 'get',
            headers: ssrHeaders(context)
        });
        return res;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message)
        } else {
            throw new Error(`That's strange`)
        }
    }
}

export const getMyNews = async (context?: NextPageContext) => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL;
      const url = `${server}/news`
      const headers = context ? ssrHeaders(context) : postRequestHeaders;
      const res = await fetch(url, {
        method: 'get',
        headers,
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        return data as NewsProps[];
      } else {
        throw new Error(data?.msg)
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      } else {
        throw new Error(`That's strange`)
      }
    }
  }
