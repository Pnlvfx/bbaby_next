import { registerUrl } from "../../lib/url";
import { postRequestHeaders } from "../main/config";
import { catchError } from "./common";

export const getUserIP = async () => {
    const IP_API_KEY = process.env.NEXT_PUBLIC_IP_LOOKUP_API_KEY;
    const url = `https://extreme-ip-lookup.com/json?key=${IP_API_KEY}`;
    const res = await fetch(url, {
      method: 'get',
    })
    const userIpInfo = await res.json();
    return userIpInfo;
}

export const register = async (email: string, username: string, password: string) => {
  try {
    const userIpInfo = await getUserIP();
    const { country, countryCode, city, region, lat, lon } = userIpInfo;
    const body = JSON.stringify({
      email,
      username,
      password,
      country,
      countryCode,
      city,
      region,
      lat,
      lon,
    });
    const res = await fetch(registerUrl, {
      method: 'post',
      body,
      headers: postRequestHeaders,
      credentials: 'include'
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.msg);
    } else {
      return data;
    }
  } catch (err) {
    catchError(err, 'register');
  }
}