import Link from 'next/link'
import React, { useContext } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useSession } from '../auth/UserContext'
import CheckBox from '../utils/buttons/CheckBox'
import { SubmitContext, SubmitContextType } from './SubmitContext'

const SubmitShareButtons = () => {
  const { session } = useSession()
  const { sharePostToTG, setSharePostToTG, sharePostToTwitter, setSharePostToTwitter, canPostOnTwitter } = useContext(
    SubmitContext
  ) as SubmitContextType
  return (
    <div
      className="relative flex h-24 rounded-b-md border-t border-solid border-reddit_border bg-reddit_dark-brightest py-2 px-4"
      style={{ flexFlow: 'column' }}
    >
      <div className="mt-2 flex w-full">
        <div className="mr-auto self-start" style={{ flexFlow: 'column' }}>
          {session?.user?.role === 1 && <CheckBox title="Share this post on Telegram" check={sharePostToTG} setCheck={setSharePostToTG} />}
          <div className="flex items-center">
            {canPostOnTwitter ? (
              <CheckBox title="Share this post on Twitter" check={sharePostToTwitter} setCheck={setSharePostToTwitter} />
            ) : (
              <>
                <Link
                  href={'/settings'}
                  rel="noopener nofollow ugc"
                  target={'_blank'}
                  className="mr-1 block text-[14px] font-semibold leading-[18px] text-reddit_blue"
                >
                  Connect accounts to share your post
                </Link>
                <div className="relative">
                  <i
                    className="icon"
                    title="Connect a Twitter account in your User Settings. With a connected account you can choose to share new posts you make directly to Twitter."
                  >
                    <AiOutlineInfoCircle className="text-reddit_text-darker" />
                  </i>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmitShareButtons
