import axios, { AxiosResponse } from "axios"

export const getOneNews = async (id:string) => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const res = await axios.get(`${server}/news/${id}`, {withCredentials:true});
    return res as AxiosResponse;
}