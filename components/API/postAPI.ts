import { catchError } from "../API/common"

const server = process.env.NEXT_PUBLIC_SERVER_URL

export const getPosts = async(input:string | undefined,value:string | undefined,skip:number) => {
    let url = `${server}/posts?limit=10&skip=${skip}`
    if (input !== undefined && value !== undefined) {
        url = `${server}/posts?${input}=${value}&limit=10&skip=${skip}`
    }
    const res = await fetch(url, {
        method: 'get',
        credentials: 'include'
    })
    const posts = res.json();
    return posts
}

export const getPost = async (postId:string | string[]) => {
    try {
        const url = `${server}/posts/${postId}`
        const res = await fetch(url, {
            method: 'get',
            credentials: 'include'
            })
            const post = await res.json()
        return post as PostProps;
    } catch (err) {
        return catchError(err, 'get Post');
    }
}