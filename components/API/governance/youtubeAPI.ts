import { NextPageContext } from "next";
import { postRequestHeaders } from "../../main/config";
import { ssrHeaders } from "../ssrAPI";

const server = process.env.NEXT_PUBLIC_SERVER_URL;
const youtubeAPIbase = `${server}/governance/youtube`;

export const youtubeAuth = async (context: NextPageContext) => {
    try {
        const url = `${youtubeAPIbase}/auth`;
        const res = await fetch(url, {
            method: 'get',
            headers: ssrHeaders(context)
        })
        const data = await res.json();
        if (!res.ok) {
            console.log(data.msg);
            return false;
        } else {
            return data as true
        }
    } catch (err) {
        return false;
    }
}

export const getYoutubeAccessToken = async (code: string, context: NextPageContext) => {
    try {
        const url = `${youtubeAPIbase}/access_token?code=${code}`
        const body = JSON.stringify({code});
        const res = await fetch(url, {
            method: 'post',
            body,
            headers: context ? ssrHeaders(context) : postRequestHeaders
        });
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