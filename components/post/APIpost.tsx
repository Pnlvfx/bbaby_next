import axios from "axios"

type getPostsProps = {
    input? : string,
    value? : string
  }
export const getPosts = ({input,value}:getPostsProps) => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    let url = `${server}/posts?limit=10&skip=0`
    if (input && value) {
        url = `${server}/posts?${input}=${value}&limit=10&skip=0`
    }
    const posts = axios({
        method: 'get',
        url: url,
        withCredentials:true
    })
    return posts
}