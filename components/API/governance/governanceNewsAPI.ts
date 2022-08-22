import { NextPageContext } from "next";
import { ssrHeaders } from "../ssrAPI";

export const getBBCLinks = async (context: NextPageContext) => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL;
      const url = `${server}/governance/BBCnews`
      const res = await fetch(url, {
      method: 'get',
      headers: ssrHeaders(context),
      })
      const data = await res.json()
      if (res.ok) {
        return data as string[];
      } else {
        throw new Error(data.msg);
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error(`That's strange!`);
      }
    }
  }