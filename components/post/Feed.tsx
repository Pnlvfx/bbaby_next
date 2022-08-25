import InfiniteScroll from 'react-infinite-scroll-component';
import PostForm from '../submit/submitutils/PostForm';
import BestPost from './postutils/BestPost';
import Post from './Post';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import TopCommunities from '../widget/TopCommunities'
import CommunitiesInfo from '../widget/CommunitiesInfo'
import dynamic from 'next/dynamic'
import Donations from '../widget/Donations'
import { getPosts } from './APIpost'
import GoogleAdsense2 from '../google/GoogleAdsense2'

type FeedProps = {
  posts: PostProps[]
  community?: string
  author?: string
}

const Feed = ({ posts: ssrPost, community, author }: FeedProps) => {
  const [posts, setPosts] = useState<PostProps[]>(ssrPost)
  const [postOpen, setPostOpen] = useState(false)
  const router = useRouter()
  
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
    const res = await getPosts(input, value, posts.length)
    const newPosts = res
    setPosts([...posts, ...newPosts])
  }
  //

  const PostModal = dynamic(() => import('./PostModal'))
  
  return (
    <>
      {postId !== '' && isMobile && (
        <PostModal
          community={community}
          postId={postId.toString()}
          open={postOpen}
          onClickOut={() => {
            setPostOpen(false)
          }}
        />
      )}
      {postId === '' && (
        <div className="mx-[2px] mt-5 flex justify-center lg:mx-10">
          <div className="w-full lg:w-7/12  lg:mr-4 2xl:w-[650px] flex-none">
            {!author && (
              <div className="mb-[18px]">
                <PostForm community={community ? community : ''} />
              </div>
            )}
            <div className="mb-4">
              <BestPost />
            </div>
            {/* {production && <GoogleAdsense2 />} */}
            <>
              <InfiniteScroll
                dataLength={posts.length}
                next={getMorePosts}
                hasMore={true}
                loader={<p></p>}
                endMessage={<p></p>}
              >
                {posts.map((post) => (
                  <Post key={post._id} post={post} isListing={true} />
                ))}
              </InfiniteScroll>
            </>
          </div>
          <div className="hidden lg:block">
            {community ? <CommunitiesInfo /> : <TopCommunities />}
            <Donations />
          </div>
        </div>
      )}
    </>
  )
}

export default Feed;

