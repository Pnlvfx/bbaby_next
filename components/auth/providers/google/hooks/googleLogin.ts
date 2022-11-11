import { CredentialResponse } from "../../../../../@types/google";
import { google_loginUrl } from "../../../../../lib/url";
import { getUserIP } from "../../../../API/oauthAPI";
import { postRequestHeaders } from "../../../../main/config";
import { catchError } from "../../../../API/common";

export const googleLogin = async (
    response: CredentialResponse, 
    ) => {
      try {
        const userIpInfo = await getUserIP();
        const {country, countryCode, city, region, lat, lon} = await userIpInfo;
        const body = JSON.stringify({tokenId: response.credential, data: {country,countryCode,city,region,lat,lon}})
        const res = await fetch(google_loginUrl, {
          method:'post',
          headers: postRequestHeaders,
          body,
          credentials: 'include'
        });
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