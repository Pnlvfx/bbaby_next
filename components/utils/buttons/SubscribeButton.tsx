import { useState } from 'react'
import communityapis from '../../API/communityapis'
import { useAuthModal } from '../../auth/modal/AuthModalContext'
import { buttonClass } from './Button'

interface SubscribeButton {
  community: CommunityProps
}

const SubscribeButton = ({ community: req_community }: SubscribeButton) => {
  const [community, setCommunity] = useState(req_community)
  const authModal = useAuthModal()

  const doSubscribe = async () => {
    try {
      await communityapis.subscribe(community.name, authModal.setShow)
      setCommunity({ ...community, user_is_subscriber: !community.user_is_subscriber })
    } catch (err) {}
  }
  return (
    <button
      className={`mx-1 py-[3px] px-4 ${buttonClass(community.user_is_subscriber ? true : false)}`}
      onClick={(e) => {
        e.preventDefault()
        doSubscribe()
      }}
    >
      <span className="text-xs">{community.user_is_subscriber ? 'Joined' : 'Join'}</span>
    </button>
  )
}

export default SubscribeButton
