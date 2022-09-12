import { catchError, isJson } from "../common";

export const getRedditPosts = async (after?: string, count?: number) => {
    try {
        const server = process.env.NEXT_PUBLIC_SERVER_URL;
        const url = `${server}/reddit/posts`
        const query = after ? `after=${after}&count=${count}` : null
        const finalUrl = query ? `${url}?${query}` : url;
        const res = await fetch(finalUrl, {
          method: 'get',
          credentials: 'include'
        })
        const p = isJson(res) ? await res.json() : null;
        if (res.ok) {
          return p.data;
        } else {
          catchError(`${res.statusText} ${p?.msg}`);
        }
    } catch (err) {
        catchError(err);
    }
}


export const getRedditPostsFromCommunity = async (after?: string, count?: number) => {
  try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL;
      const url = `${server}/reddit/community_posts`;
      const res = await fetch(url, {
        method: 'get',
        credentials: 'include'
      })
      const p = isJson(res) ?  await res.json() : null;
      if (res.ok) {
        return p.data;
      } else {
        catchError(`${res.statusText} ${p?.msg}`);
      }
  } catch (err) {
      catchError(err);
  }
}
