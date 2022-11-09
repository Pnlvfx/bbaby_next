import { useContext } from "react"
import { getCommunities, subscribe } from "../../API/communityAPI"
import { AuthModalContext, AuthModalContextProps } from "../../auth/modal/AuthModalContext"
import { buttonClass } from "../Button"

interface SubscribeButton {
    community: CommunityProps
  }

const SubscribeButton = ({community}: SubscribeButton) => {
    const modalContext = useContext(AuthModalContext) as AuthModalContextProps;

    const doSubscribe = async () => {
        try {
         const join = await subscribe(community.name, modalContext.setShow)
         const refresh = await getCommunities(5)
        } catch (err) {
         
        }
       }
  return (
    <button 
        className={`py-[3px] px-4 mx-1 ${buttonClass(community.user_is_subscriber ? true : false)}`}
        onClick={(e) => {
            e.preventDefault()
            doSubscribe()
        }} 
        >
            <span className='text-xs'>{community.user_is_subscriber ? "Joined" : "Join"}</span>
    </button>
  )
}

export default SubscribeButton;
