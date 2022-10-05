import { catchError } from "../common";

const server = process.env.NEXT_PUBLIC_SERVER_URL;

export const getBBCLinks = async (limit : string | number, skip : string | number) => {
    try {
      const url = `${server}/governance/BBCnews?limit=${limit}&skip=${skip}`;
      const res = await fetch(url, {
      method: 'get',
      credentials : 'include'
      })
      const json = await res.json()
      if (res.ok) {
        return json;
      } else {
        throw new Error(json.msg);
      }
    } catch (err) {
      catchError(err);
    }
}

export const searchPexelsImages = async (text: string) => {
  const url = `${server}/governance/pexels?text=${text}`
  try {
    const res = await fetch(url, {
      method: 'get',
      credentials: 'include'
    })
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      catchError(data.msg);
    }
  } catch (err) {
   catchError(err);
  }
}
