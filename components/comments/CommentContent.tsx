import { useEffect } from 'react'
import { GoCommentDiscussion } from 'react-icons/go'
import Post from '../post/Post'
import YandexAds from '../utils/yandex-ads/YandexAds'
import Comments from './Comments'
import CommentForm from './commentutils/CommentForm'
import { useCommentContext } from './commentutils/RootCommentContext'

const CommentContent = () => {
  const { post, comments, getComments } = useCommentContext()

  useEffect(() => {
    getComments()
  }, [post])

  return (
    <>
      <Post post={post} isListing={false} />
      {!!post && !!post._id && (
        <div className="relative my-6 lg:mx-10">
          <YandexAds />
          <CommentForm rootId={post._id} parentId={post._id} showAuthor={true} />
          <div className="my-4">
            <hr className="border-reddit_border" />
            {comments.length < 1 && (
              <div className="flex min-h-[600px] w-full items-center justify-center">
                <div className="text-center">
                  <GoCommentDiscussion className="my-3 mx-auto h-[28px] w-[28px] text-reddit_text-darker" />
                  <p className="font-bold text-reddit_text-darker">No Comments yet</p>
                  <p className="mt-1 text-sm font-bold text-reddit_text-darker">Be the first to share what you think!</p>
                </div>
              </div>
            )}
          </div>
          <Comments parentId={post._id} rootId={post._id} />
        </div>
      )}
    </>
  )
}

export default CommentContent
