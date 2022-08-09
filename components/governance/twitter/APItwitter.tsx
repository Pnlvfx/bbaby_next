import axios from 'axios'

const server = process.env.NEXT_PUBLIC_SERVER_URL

export const anonList = {
  listId: '1535968733537177604',
  owner_screen_name: 'anonynewsitaly',
}
export const bbabyList = {
  listId: '1539278403689492482',
  owner_screen_name: 'Bbabystyle',
}

interface query {
  listId: string
  owner_screen_name: string
}

export const getMyListTweets = async (query: query) => {
  const res = await axios.get(
    `${server}/twitter/selected-tweets?slug=${query.listId}&owner_screen_name=${query.owner_screen_name}`,
    { withCredentials: true }
  )
  return res
}
