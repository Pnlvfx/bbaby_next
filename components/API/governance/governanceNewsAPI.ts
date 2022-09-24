import { catchError } from "../common";

export const getBBCLinks = async (limit : string | number, skip : string | number) => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL;
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
      catchError(err, 'get BBC links');
    }
}

export const searchPexelsImages = async (text: string, pageSearch: string) => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const url = `${server}/governance/pexels?text=${text}&page=${pageSearch}`
  try {
    const res = await fetch(url, {
      method: 'get',
      credentials: 'include'
    })
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      catchError(data.msg, 'Pexels image API');
    }
  } catch (err) {
   catchError(err, 'Pexels image API');
  }
}
