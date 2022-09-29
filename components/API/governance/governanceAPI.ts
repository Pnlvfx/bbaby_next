import { postRequestHeaders } from "../../main/config";
import { catchError } from "../common";

const server = process.env.NEXT_PUBLIC_SERVER_URL;

export const translate = async (text: string, language: string) => {
    try {
        console.log(text);
        const url = `${server}/governance/translate?lang=${language}`
        const body = JSON.stringify({text})
        const res = await fetch(url, {
            method: 'post',
            headers: postRequestHeaders,
            body,
            credentials: 'include'
        });
        return res;
    } catch (err) {
        return catchError(err, 'translate');
    }
}