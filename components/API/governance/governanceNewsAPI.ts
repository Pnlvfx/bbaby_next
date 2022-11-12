import { catchError } from "../common";

const server = process.env.NEXT_PUBLIC_SERVER_URL;

export const BBCbot = async () => {
  try {
    const url = `${server}/governance/BBCbot?`;
    const res = await fetch(url, {
      method: 'get',
      credentials : 'include'
    });
    const data = await res.json()
    if (res.ok) {
      return data;
    } else {
      throw new Error(data?.msg);
    }
  } catch (err) {
    throw catchError(err);
  }
}

export const getBBCLinks = async (limit : string | number, skip : string | number) => {
    try {
      const url = `${server}/governance/BBCnews?limit=${limit}&skip=${skip}`;
      const res = await fetch(url, {
      method: 'get',
      credentials : 'include'
      })
      const data = await res.json()
      if (res.ok) {
        return data;
      } else {
        throw new Error(data?.msg);
      }
    } catch (err) {
      throw catchError(err);
    }
}

export const searchPexelsImages = async (text: string) => {
  try {
    const url = `${server}/governance/pexels?text=${text}`;
    const res = await fetch(url, {
      method: 'get',
      credentials: 'include'
    })
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data?.msg);
    }
  } catch (err) {
   throw catchError(err);
  }
}
