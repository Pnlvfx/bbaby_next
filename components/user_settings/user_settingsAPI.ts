import { userAPIurl } from "../../lib/url";
import { catchError } from "../API/common";

export const getUserInfo = async () => {
    try {
      const res = await fetch(userAPIurl.userInfo, {
        method: 'get',
        credentials: 'include'
      })
      const data = await res.json()
      if (!res.ok) catchError(data?.msg);
      return data;
    } catch (err) {
      catchError(err);
    }
  }