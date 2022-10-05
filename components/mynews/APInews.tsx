import { NextPageContext } from "next";
import { catchError } from "../API/common";
import { ssrHeaders } from "../API/ssrAPI";
import { postRequestHeaders } from "../main/config";

export const getOneNews = async (title: string, context: NextPageContext) => {
    try {
        const server = process.env.NEXT_PUBLIC_SERVER_URL;
        const url = `${server}/news/${title}`;
        const res = await fetch(url, {
            method: 'get',
            headers: ssrHeaders(context)
        });
        const data = await res.json();
        if (!res.ok){
          throw new Error(data?.msg);
        } else {
          return data as NewsProps;
        }
    } catch (err) {
       throw catchError(err);
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
     throw catchError(err);
    }
}
