import Router from "next/router";
import { catchError } from "../common";

const server = process.env.NEXT_PUBLIC_SERVER_URL;

export const anonList = {
  listId: '1535968733537177604',
  owner_screen_name: 'anonynewsitaly',
}
export const bbabyList = {
  listId: '1539278403689492482',
  owner_screen_name: 'Bbabystyle',
}

export interface query {
  listId: string
  owner_screen_name: string
}

export const getMyListTweets = async (query: query) => {
  try {
    const url = `${server}/twitter/selected-tweets?slug=${query.listId}&owner_screen_name=${query.owner_screen_name}`
    const res = await fetch(url, {
      method: 'get',
      credentials: 'include'
    })
    const data = await res.json();
    if (res.status === 401) Router.push('/settings')
    if (!res.ok) catchError(data.msg);
    return data as TweetProps[];
  } catch (err) {
    return catchError(err)
  }
}
