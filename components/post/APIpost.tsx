import axios from "axios"

export const getPosts = async(input:string | undefined,value:string | undefined,skip:number) => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    let url = `${server}/posts?limit=10&skip=${skip}`
    if (input !== undefined && value !== undefined) {
        url = `${server}/posts?${input}=${value}&limit=10&skip=${skip}`
    }
    const posts = await axios({
        method: 'get',
        url: url,
        withCredentials:true
    })
    return posts
}