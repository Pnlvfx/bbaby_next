import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Comment from '../comments/Comment'
import { GrDocumentText } from 'react-icons/gr'
import { CloseIcon } from '../utils/SVG/SVG'
import { CommunityContext, CommunityContextProps } from '../community/CommunityContext'
import Donations from '../widget/Donations'
import Widget from '../widget/Widget'
import postapis from '../API/postapis/postapis'
import { useSession } from '../auth/UserContext'

type PostModalProps = {
  community?: string
  postId: string
  open: boolean
  onClickOut: () => void
}

const PostModal = ({ community, postId, open, onClickOut }: PostModalProps) => {
  const router = useRouter()
  const [post, setPost] = useState<PostProps>()
  const { refreshCommunity } = useContext(CommunityContext) as CommunityContextProps
  const { session } = useSession()

  useEffect(() => {
    if (!postId) return
    const g = async () => {
      try {
        const res = await postapis.getPost(postId)
        setPost(res)
        console.log('not community')
        if (!community) {
          console.log('community')
          refreshCommunity(res.community)
        }
      } catch (err) {}
    }
    g()
  }, [postId])

  const clickOut = () => {
    router.push(
      {
        pathname: router.pathname,
        query: community ? { community: community } : { username: post?.author },
      },
      router.pathname,
      { scroll: false }
    )
    onClickOut()
    setPost({} as PostProps)
  }

  return (
    <>
      {post && (
        <div className={`${open ? 'fixed' : 'hidden'} top-12 bottom-0 left-0 right-0 z-20 h-full w-full bg-[rgb(25,25,25)]`}>
          <div
            className="relative h-full w-full overflow-y-auto"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              clickOut()
            }}
          >
            <div
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                //prevent closing modal
              }}
              tabIndex={-1}
              className="sticky left-0 right-0 top-0 mx-auto box-border h-12 w-[calc(100%_-_160px)] max-w-[1280px] bg-reddit_dark"
            >
              <div className="m-auto box-border flex h-full w-full max-w-[1128px] items-center md:px-8">
                <div className={`flex w-full max-w-[calc(100%_-_324px)] flex-grow items-center `}>
                  <div className=""></div>
                  <i className="icon mr-2">
                    <GrDocumentText className="icon h-5 w-5 text-reddit_text" />
                  </i>
                  <div className="realtive flex min-w-0 break-words">
                    <div className="inline overflow-hidden text-ellipsis whitespace-nowrap break-words pr-[5px] text-[14px] font-medium leading-[18px]">
                      <h1 className="inline">{post.title}</h1>
                    </div>
                  </div>
                </div>
                <div className="ml-3 flex w-[312px] justify-end text-[12px] font-bold leading-4">
                  <button
                    role={'button'}
                    tabIndex={0}
                    title="Close"
                    aria-label="Close"
                    className="relative box-border flex min-h-[24px] w-auto min-w-[24px] items-center justify-center rounded-full border border-transparent py-1 px-2 text-center text-[12px] font-bold hover:bg-reddit_dark-brighter"
                    onClick={clickOut}
                  >
                    <i className="inline-block pr-1">
                      <CloseIcon className="h-4 w-4" />
                    </i>
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
            <div
              tabIndex={-1}
              className="relative mx-auto box-border flex w-[calc(100%_-_160px)] max-w-[1280px] justify-center bg-reddit_dark pb-8"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                //prevent closing modal
              }}
            >
              <div className="m-8 mr-3 min-h-[100vh] w-full flex-grow break-words rounded-md bg-reddit_dark-brighter pb-[1px] md:max-w-[740px]">
                <Comment post={post} />
              </div>
              {!session?.device?.mobile && (
                <div className="m-8 ml-0 hidden lg:block">
                  <Widget community={true} />
                  <Donations />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PostModal
