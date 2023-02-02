import { useSession } from '../auth/UserContext'
import Donations from '../widget/Donations'
import Widget from '../widget/Widget'
import Comment from './Comment'

interface CommentPageProps {
  post: PostProps
}

const CommentPage = ({ post }: CommentPageProps) => {
  const { session } = useSession()
  return (
    <>
      {session?.device?.mobile ? (
        <div className="mb-2 bg-reddit_dark-brighter pt-2">
          <Comment post={post} />
        </div>
      ) : (
        <div className="flex min-h-[calc(100vh_-_48px)] flex-col">
          <div className="flex max-w-[1600px] flex-row justify-center md:py-5 md:px-6 lg:mx-auto">
            <div className="w-full max-w-[750px] flex-none break-words rounded-md bg-reddit_dark-brighter lg:mr-4 lg:w-7/12 xl:w-8/12 2xl:w-[750px]">
              <Comment post={post} />
            </div>
            {!session?.device?.mobile && (
              <div className="hidden lg:block">
                <Widget community={true} />
                <Donations />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default CommentPage
