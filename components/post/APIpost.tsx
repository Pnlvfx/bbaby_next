import axios from "axios"

const server = process.env.NEXT_PUBLIC_SERVER_URL

export const getPosts = async(input:string | undefined,value:string | undefined,skip:number) => {
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


export const getPost = async (postId:string | string[]) => {
    const res = await axios.get(`${server}/posts/${postId}`, {withCredentials:true})
    return res.data
  }