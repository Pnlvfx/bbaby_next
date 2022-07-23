import axios from "axios"

const server = process.env.NEXT_PUBLIC_SERVER_URL

export const getCommunities = async() => {
    const res = await axios.get(`${server}/communities/user/pref?limit=11`, {withCredentials:true})
    return res.data;
}