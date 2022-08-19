import axios from "axios"
import { Dispatch, SetStateAction } from "react";

const server = process.env.NEXT_PUBLIC_SERVER_URL

export const getUserPrefCommunities = async () => {
    const res = await axios.get(`${server}/communities/user/pref?limit=11`, {withCredentials:true})
    return res.data as CommunityProps[] | []
}

export const subscribe = async(communityName:string,setShow:Dispatch<SetStateAction<"hidden" | "login" | "register" | "reset-your-password">>) => {
    try {
      const data = {community: communityName}
      const res = await axios({
        method: 'POST',
        url: `${server}/communities/subscribe`,
        data,
        withCredentials:true
      })
    } catch (err:any) {
      if (err.response.status === 401 || 400) {
        setShow('login')
      }
    }
  }

  export const selectCategory = async (categoryName:string,name:string) => { //name: communityToAddtheCategories to
    try {
      const data = {category: categoryName}
      const res = await axios.post(`${server}/communities/${name}/category`, data, {withCredentials:true})
      return res.data;
    } catch (err) {
      return err;
    }
  }
export const searchCommunity = async (text:string) => {
  try {
    const res = await axios.post(`${server}/communities/search?phrase=${text}`,{}, {withCredentials:true})
    return res.data 
  } catch (err) {
    return err
  }
  
}