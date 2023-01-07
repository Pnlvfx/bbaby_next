import { useContext, useEffect } from 'react'
import { buttonClass, Spinner } from '../utils/Button'
import CommunityDropdown from './submitutils/community-dropwdown/CommunityDropdown'
import { useSession } from '../auth/UserContext'
import { SubmitContext, SubmitContextType } from './SubmitContext'
import Body from './submitutils/Body'
import SubmitType from './SubmitType'
import SubmitTitle from './SubmitTitle'
import { newTweetProps } from './SubmitLayout'
import Link from 'next/link'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import CheckBox from '../utils/buttons/CheckBox'

type SubmitProps = {
  newTweet?: newTweetProps
  community?: string | string[]
}

const Submit = ({ newTweet, community }: SubmitProps) => {
  const { session } = useSession()

  const {
    title,
    setTitle,
    setBody,
    setHeight,
    setWidth,
    selectedCommunity,
    setSelectedFile,
    setIsImage,
    setIsVideo,
    sharePostToTG,
    setSharePostToTG,
    sharePostToTwitter,
    setSharePostToTwitter,
    canPostOnTwitter,
    loading,
    createPost,
  } = useContext(SubmitContext) as SubmitContextType

  //////MY TWEEEEEEEEET
  useEffect(() => {
    if (!newTweet) return
    if (newTweet.title) {
      setTitle(newTweet.title)
      if (newTweet.type === 'photo' && newTweet.height && newTweet.width) {
        setIsImage(true)
        setHeight(newTweet.height)
        setWidth(newTweet.width)
        setSelectedFile(newTweet.image)
      } else if (
        newTweet.type === 'video' &&
        newTweet.height &&
        newTweet.width
      ) {
        setIsVideo(true)
        setHeight(newTweet.height)
        setWidth(newTweet.width)
        setSelectedFile(newTweet.video)
      } else if (newTweet.body) {
        setBody(newTweet.body)
      }
    }
  }, [newTweet])

  return (
    <>
      <div tabIndex={0} />
      <div className={`${loading ? 'opacity-40' : 'opacity-100'} px-2 md:px-0`}>
        {!newTweet && (
          <div className="my-4 flex border-b border-solid border-reddit_border p-1">
            <div className="flex-1 text-[18px] font-medium leading-[22px]">
              Create a Post
            </div>
            <button
              role={'button'}
              className="min-h-8 min-w-8 relative ml-[10px] box-border w-auto items-center rounded-full border border-transparent px-4 py-1 text-center text-[12px] font-bold leading-6"
              style={{ letterSpacing: 0.5 }}
            >
              DRAFTS
              <span className="ml-1 py-[1px] px-[3px] font-normal leading-4 ">
                0
              </span>
            </button>
          </div>
        )}
        <CommunityDropdown initialCommunity={community?.toString()} />
        <div className="mb-5 rounded-[5px] bg-reddit_dark-brighter">
          {!newTweet && <SubmitType />}
          <div className="m-4">
            <SubmitTitle />
            <Body />
          </div>
          <hr className="mx-3 mt-12 mb-4 border-reddit_border" />
          <div className="mx-4 pb-4 text-right">
            <button className={`mr-2 h-[30px] opacity-20 ${buttonClass(true)}`}>
              <p>Save Draft</p>
            </button>
            <button
              className={`h-[30px] ${buttonClass()} ${
                title.length >= 1 && selectedCommunity
                  ? 'text-opacity-100'
                  : 'cursor-not-allowed text-opacity-40'
              }`}
              disabled={title.length >= 1 && selectedCommunity ? false : true}
              onClick={async (e) => {
                e.preventDefault()
                e.stopPropagation()
                await createPost()
              }}
            >
              {!loading && <p>Post</p>}
              {loading && <Spinner />}
            </button>
          </div>
          <div
            className="relative flex h-24 rounded-b-md border-t border-solid border-reddit_border bg-reddit_dark-brightest py-2 px-4"
            style={{ flexFlow: 'column' }}
          >
            <div className="mt-2 flex w-full">
              <div
                className="mr-auto self-start"
                style={{ flexFlow: 'column' }}
              >
                {session?.user?.role === 1 && (
                  <CheckBox
                    title="Share this post on Telegram"
                    check={sharePostToTG}
                    setCheck={setSharePostToTG}
                  />
                )}
                <div className="flex items-center">
                  {canPostOnTwitter ? (
                    <CheckBox
                      title="Share this post on Twitter"
                      check={sharePostToTwitter}
                      setCheck={setSharePostToTwitter}
                    />
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
        </div>
      </div>
    </>
  )
}

export default Submit
