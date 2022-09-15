import { NextPageContext } from "next";
import { siteUrl } from "../main/config";

export const ssrHeaders = (context: NextPageContext) => {
    const user_agent = context.req?.headers['user-agent'] ? context.req.headers['user-agent'] : ''
    const cookie = context?.req?.headers?.cookie ? context.req.headers.cookie : ''
    const index = context.req?.rawHeaders.indexOf('Accept-Language');
    if (!index) return //fornow
    const lang = context.req?.rawHeaders[index + 1]
    if (!lang) return; // fornow
    const headers = { 
        cookie,
        Accept: 'application/json',
        'Content-Type' : 'application/json',
        origin: siteUrl,
        'user-agent': user_agent,
        'Accept-Language': lang
    };
    return headers;
}

export const getSession = async (context: NextPageContext) => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL;
    const url = `${server}/user`;
    try {
        const response = await fetch(url, {
            method: 'get',
            headers: ssrHeaders(context)
        })
        const session = await response.json();
        if (!response.ok) {
            throw new Error(session.msg)
        }
        return session as SessionProps;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message)
        } else {
            throw new Error(`That's strange!`)
        }
    }
}