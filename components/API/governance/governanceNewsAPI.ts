import { NextPageContext } from "next";
import { postRequestHeaders } from "../../main/config";
import { LinkPreviewProps } from "../../utils/LinkPreview";
import { ssrHeaders } from "../ssrAPI";

export const getBBCLinks = async (limit : string | number, skip : string | number, context?: NextPageContext) => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL;
      const headers = context ? ssrHeaders(context) : postRequestHeaders;
      const ssr = context ? 'ssr' : null;
      const url = `${server}/governance/BBCnews?limit=${limit}&skip=${skip}&ssr=${ssr}`;
      const res = await fetch(url, {
      method: 'get',
      headers,
      credentials : 'include'
      })
      const data = await res.json()
      if (res.ok) {
        return data as LinkPreviewProps[];
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