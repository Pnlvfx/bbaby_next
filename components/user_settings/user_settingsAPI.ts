import { userAPIurl } from "../../lib/url";
import { catchError } from "../API/common";

export const getUserInfo = async () => {
    try {
      const res = await fetch(userAPIurl.userInfo, {
        method: 'get',
        credentials: 'include'
      })
      const data = await res.json();
      console.log(res.ok, data);
      if (!res.ok) {
        throw new Error(data?.msg);
      } else {
        return data as UserProps;
      }
    } catch (err) {
      throw catchError(err);
    }
  }