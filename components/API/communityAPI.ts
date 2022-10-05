import { Dispatch, SetStateAction } from "react";
import { communityUrl } from "../../lib/url";
import { catchError } from "./common";
import { postRequestHeaders } from "../main/config";

const server = process.env.NEXT_PUBLIC_SERVER_URL

export const getUserPrefCommunities = async () => {
    try {
      const res = await fetch(communityUrl.user_preferred_communities, {
        method: 'get',
        credentials: 'include'
      })
      const communities = await res.json();
      return communities;
    } catch (err) {
      catchError(err, 'get User Pref Communities');
    }
}

export const subscribe = async(communityName: string, setShow: Dispatch<SetStateAction<"hidden" | "login" | "register" | "reset-your-password">>) => {
    try {
      const url = `${server}/communities/subscribe`
      const body = JSON.stringify({ community: communityName })
      const res = await fetch(url, {
        method: 'POST',
        headers: postRequestHeaders,
        body,
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401 || 400) {
          setShow('login');
        } else {
          catchError(data?.msg, 'Community subscribe');
        }
      }
    } catch (err) {
      catchError(err, 'Community subscribe')
    }
}

export const selectCategory = async (categoryName: string,name: string) => { //name: communityToAddtheCategories to
    try {
      const url = `${server}/communities/${name}/category`
      const body = JSON.stringify({category: categoryName})
      const res = await fetch(url, {
        method: 'POST',
        headers: postRequestHeaders,
        body,
        credentials: 'include'
      })
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        throw new Error(data?.msg);
      }
    } catch (err) {
      throw catchError(err)
    }
}

export const searchCommunity = async (text: string) => {
  try {
    const url = `${server}/communities/search?phrase=${text}`
    const body = JSON.stringify({})
    const res = await fetch(url, {
      method: 'POST',
      headers: postRequestHeaders,
      body,
      credentials: 'include'
    })
    const data = await res.json();
    if (res.ok) {
      return data
    } else {
      throw new Error(data?.msg);
    }
  } catch (err) {
    throw catchError(err);
  }
  
}

export const getCommunities = async (limit: number) => {
  try {
    const server = process.env.NEXT_PUBLIC_SERVER_URL;
    const url = `${server}/communities?limit=${limit}`;
    const res = await fetch(url, {
      method: 'get',
      credentials: 'include'
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      catchError(data?.msg, 'get Communities');
    }
  } catch (err) {
    catchError(err, 'get Communities');
  }
}