import { NextRouter } from "next/router";
import { CredentialResponse } from "../../../../../@types/google";
import { googleLoginAnalytics } from "../../../../../lib/gtag";
import { google_loginUrl } from "../../../../../lib/url";
import { getUserIP } from "../../../../API/oauthAPI";
import { postRequestHeaders } from "../../../../main/config";
import { TimeMsgContextProps } from "../../../../main/TimeMsgContext";
import { AuthModalContextProps } from "../../../modal/AuthModalContext";

export const googleLogin = async (
    response: CredentialResponse, 
    modalContext: AuthModalContextProps,
    router: NextRouter,
    message: TimeMsgContextProps
    ) => {
      try {
        const userIpInfo = await getUserIP();
        const {country,countryCode,city,region,lat,lon} = await userIpInfo;
        const body = JSON.stringify({tokenId: response.credential, data: {country,countryCode,city,region,lat,lon}})
        const res = await fetch(google_loginUrl, {
          method:'post',
          headers: postRequestHeaders,
          body,
          credentials: 'include'
        })
        if (res.ok) {
          localStorage.setItem('isLogged', 'true')
          modalContext.setShow('hidden')
          googleLoginAnalytics()
          router.reload()
        } else {
          const error = await res.json()
          message.setMessage({value: error, status: 'error'})
        }
      } catch (err) {
        if (err instanceof Error) {
          message.setMessage({value: err.message, status: 'error'})
        } else {
          message.setMessage({value: `That's strange!`, status: 'error'})
        }
      }
  }