import { NextPageContext } from "next";
import { postRequestHeaders } from "../main/config";
import { catchError } from "./common";
import { ssrHeaders } from "./ssrAPI";

export const getArticle = async (title: string, context?: NextPageContext ) => {
    try {
        const server = process.env.NEXT_PUBLIC_SERVER_URL;
        const serverUrl = `${server}/governance/news/article`;
        const body = JSON.stringify({title});
        const headers = context ? ssrHeaders(context) : postRequestHeaders;
        const res = await fetch(serverUrl, {
            method: 'POST',
            body,
            headers,
            credentials: 'include'
        });
        const article = await res.json();
        if (!res.ok) {
            throw new Error(article.msg);
        }
        return article;
    } catch (err) {
        throw catchError(err);
    }
}