import InfiniteScroll from 'react-infinite-scroll-component'
import PostForm from '../submit/submitutils/PostForm'
import BestPost from './postutils/BestPost'
import Post from './Post'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Donations from '../widget/Donations'
import Skeleton from '../governance/twitter/Skeleton'
import Widget from '../widget/Widget'
import { useSession } from '../auth/UserContext'
import PolicyWidget from '../widget/PolicyWidget'
import postapis from '../API/postapis'

type FeedProps = {
  posts?: PostProps[]
  community?: string
  author?: string
}

const Feed = ({ posts: ssrPost, community, author }: FeedProps) => {
  const [posts, setPosts] = useState<PostProps[]>(ssrPost || [])
  const [postOpen, setPostOpen] = useState(false)
  const [hasMore, setHasMore] = useState(posts?.length > 0 ? true : false)
  const router = useRouter()
  const { session } = useSession()
  const PostModal = dynamic(() => import('./PostModal'))

  let postId: string[] | string = ''

  if (router.query.postId) {
    postId = router.query.postId
  }

  useEffect(() => {
    setPostOpen(true)
  }, [postId])

  useEffect(() => {
    postId = ''
  }, [postOpen])
  //

  //INFINITE SCROLLING

  const getMorePosts = async () => {
    const input = community ? 'community' : author ? 'author' : undefined
    const value = community ? community : author ? author : undefined
    const newPosts = await postapis.getPosts(posts.length, input, value)
    if (newPosts.length < 10) {
      setHasMore(false)
    }
    setPosts([...posts, ...newPosts])
  }
  //

  return (
    <>
      {postId !== '' && (
        <PostModal
          community={community}
          postId={postId.toString()}
          open={postOpen}
          onClickOut={() => {
            setPostOpen(false)
          }}
        />
      )}
      <div className="mx-auto box-border flex max-w-full justify-center md:py-5 md:px-6">
        <div className="w-full lg:w-[640px]">
          {session?.user && !author && (
            <div className="mb-[18px]">
              <PostForm community={community ? community : ''} />
            </div>
          )}
          <div className="mb-4">
            <BestPost />
          </div>
          <div>
            <InfiniteScroll
              dataLength={posts?.length || 1}
              next={getMorePosts}
              hasMore={hasMore}
              loader={[1, 2, 3, 4, 5].map((_, idx) => (
                <Skeleton isImage={true} key={idx} />
              ))}
              endMessage={<></>}
            >
              {posts?.length >= 1
                ? posts.map((post) => {
                    return <Post key={post._id} post={post} isListing={true} />
                  })
                : [1, 2, 3, 4, 5].map((_, idx) => <Skeleton isImage={true} key={idx} />)}
            </InfiniteScroll>
          </div>
        </div>
        <div className="ml-6 hidden lg:block">
          <Widget community={community ? true : false} />
          <Donations />
          <PolicyWidget />
        </div>
      </div>
    </>
  )
}

export default Feed
