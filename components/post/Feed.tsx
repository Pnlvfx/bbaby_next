import InfiniteScroll from 'react-infinite-scroll-component';
import PostForm from '../submit/submitutils/PostForm';
import BestPost from './postutils/BestPost';
import Post from './Post';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import TopCommunities from '../widget/TopCommunities'
import CommunitiesInfo from '../widget/CommunitiesInfo'
import dynamic from 'next/dynamic'
import Donations from '../widget/Donations'
import { getPosts } from './APIpost'
import GoogleAdsense2 from '../google/GoogleAdsense2'
import Skeleton from '../governance/twitter/Skeleton';
import { TimeMsgContext, TimeMsgContextProps } from '../main/TimeMsgContext';

type FeedProps = {
  posts: PostProps[]
  community?: string
  author?: string
}

const Feed = ({ posts: ssrPost, community, author }: FeedProps) => {
  const PostModal = dynamic(() => import('./PostModal'));
  const [posts, setPosts] = useState<PostProps[]>(ssrPost);
  const [postOpen, setPostOpen] = useState(false);
  const router = useRouter();
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;
  
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
  
  return (
    <>
      {postId !== '' && !isMobile && (
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
        <div className="mx-[2px] lg:mx-10 mt-5 flex justify-center">
          <div className="w-full lg:w-[640px] lg:mr-4">
            {!author && (
              <div className="mb-[18px]">
                <PostForm community={community ? community : ''} />
              </div>
            )}
            <div className="mb-4">
              <BestPost />
            </div>
            {process.env.NEXT_PUBLIC_NODE_ENV === 'production' && <GoogleAdsense2 />}
           <div>
            <InfiniteScroll
                dataLength={posts?.length || 0}
                next={getMorePosts}
                hasMore={true}
                loader={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((_, idx) => (
                  <Skeleton isImage={true} key={idx} />
                ))}
                endMessage={<></>}
                
              >
                {posts?.map((post) => <Post key={post._id} post={post} isListing={true} />)}
              </InfiniteScroll>
           </div>
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

