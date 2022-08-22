import { NextPageContext } from "next";
import { ssrHeaders } from "../ssrAPI";

export const youtubeLogin = async () => {
    
}

export const getYoutubeAccessToken = async (code: string, context: NextPageContext) => {
    try {
        const server = process.env.NEXT_PUBLIC_SERVER_URL;
        const url = `${server}/governance/youtube/access_token?code=${code}`
        const body = JSON.stringify({code})
        const res = await fetch(url, {
            method: 'post',
            body,
            headers: ssrHeaders(context)
        })
        if (res.ok) {
            return res;
        } else {
            const e = await res.json();
            const error = {msg: e.msg, ok: false}
            return error as FetchError
        }
    } catch (err) {
        if (err instanceof Error) {
            const error = {msg: err.message, ok: false};
            return error as FetchError;
        } else {
            const error = {msg: `That's strange`, ok: false};
            return error as FetchError;
        }
    }
}