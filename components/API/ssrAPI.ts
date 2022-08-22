import { NextPageContext } from "next";

export const ssrHeaders = (context: NextPageContext) => {
    const cookie = context?.req?.headers?.cookie ? { 
        cookie: context.req.headers.cookie,
        Accept: 'application/json',
        'Content-Type' : 'application/json'
     } : undefined;
    return cookie;
}

export const getSession = async (context : NextPageContext) => {
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