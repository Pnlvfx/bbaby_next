import { useState } from 'react'
import ClickOutHandler from 'react-clickout-ts'
import { AiOutlineLink } from 'react-icons/ai'
import { ShareIcon } from '../../utils/SVG/SVG'
import { useMessage } from '../../main/TimeMsgContext'
import { shareAnalytics } from '../../../lib/gtag'
import { useSession } from '../../auth/UserContext'
import { catchErrorWithMessage } from '../../API/common'

type ShareButtonProps = {
  linkToCopy: string
  isListing: boolean
}

const ShareButton = ({ linkToCopy, isListing }: ShareButtonProps) => {
  const { session } = useSession()
  const [shareDropdownVisibilityClass, setShareDropdownVisibilityClass] = useState(false)
  const message = useMessage()

  const copyTextToClipboard = async (text: string) => {
    try {
      if ('clipboard' in navigator) {
        await navigator.clipboard.writeText(text)
      } else {
        document.execCommand('copy', true, text)
      }
      setShareDropdownVisibilityClass(false)
      message.setMessage({ value: 'Link copied!', time: 8000, status: 'success' })
      shareAnalytics()
    } catch (err) {
      catchErrorWithMessage(err, message)
    }
  }

  return (
    <div className={`mr-1 flex items-center ${session?.device?.mobile && isListing && 'articleLink'}`}>
      <ClickOutHandler onClickOut={() => setShareDropdownVisibilityClass(false)}>
        <button
          className="flex h-full items-center rounded-sm p-2 hover:bg-reddit_dark-brightest"
          type="button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            if (session?.device?.mobile) {
              copyTextToClipboard(`${window.location.origin}${linkToCopy}`.toLowerCase())
            } else {
              setShareDropdownVisibilityClass(!shareDropdownVisibilityClass)
            }
          }}
        >
          <ShareIcon className="mr-[6px] leading-4" />
          <span className="max-h-[36px] overflow-hidden text-ellipsis text-left leading-3 ">Share</span>
        </button>
        <div className={`absolute z-20 ${shareDropdownVisibilityClass ? 'block' : 'hidden'} `}>
          <div className="z-10 flex overflow-hidden rounded-md border border-reddit_border bg-reddit_dark-brighter">
            <div
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                copyTextToClipboard(`${window.location.origin}${linkToCopy}`.toLowerCase())
              }}
            >
              <div className="flex py-2 pl-2 pr-12 text-reddit_text-darker">
                <AiOutlineLink className="mr-1 mt-[3px] h-5 w-5" />
                <button className="block">Copy Link</button>
              </div>
            </div>
          </div>
        </div>
      </ClickOutHandler>
    </div>
  )
}

export default ShareButton
