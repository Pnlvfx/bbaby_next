import { NextPageContext } from "next";
import { postRequestHeaders } from "../main/config";
import { ssrHeaders } from "./ssrAPI";

export const getArticle = async (link: string,imageUrl: string, context?: NextPageContext ) => {
    try {
        const server = process.env.NEXT_PUBLIC_SERVER_URL
        const serverUrl = `${server}/governance/news/article`
        const body = JSON.stringify({link, imageUrl})
        const headers = context ? ssrHeaders(context) : postRequestHeaders
        const res = await fetch(serverUrl, {
            method: 'post',
            body,
            headers,
            credentials: 'include'
        })
        const article = await res.json();
        if (!res.ok) {
            throw new Error(article.msg)
        }
        return article;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message)
        } else {
            throw new Error("That's strange!")
        }
    }
}