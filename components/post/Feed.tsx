import InfiniteScroll from 'react-infinite-scroll-component';
import PostForm from '../submit/submitutils/PostForm';
import BestPost from './postutils/BestPost';
import Post from './Post';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import Donations from '../widget/Donations'
import { getPosts } from '../API/postAPI';
import Skeleton from '../governance/twitter/Skeleton';
import Widget from '../widget/Widget';
import { useSession } from '../auth/UserContext';
import PolicyWidget from '../widget/PolicyWidget';
import YandexAds from '../utils/yandex-ads/YandexAds';

type FeedProps = {
  posts: PostProps[]
  community?: string
  author?: string
}

const Feed = ({ posts: ssrPost, community, author }: FeedProps) => {
  const [posts, setPosts] = useState<PostProps[]>(ssrPost);
  const [postOpen, setPostOpen] = useState(false);
  const router = useRouter();
  const {session} = useSession();
  const PostModal = dynamic(() => import('./PostModal'));
  
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
      <div className="max-w-full md:py-5 md:px-6 box-border flex justify-center mx-auto">
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
              hasMore={posts?.length > 0 ? true : false}
              loader={[1, 2, 3, 4, 5].map((_, idx) => (
                <Skeleton isImage={true} key={idx} />
              ))}
              endMessage={<></>}
              
            >
              {posts?.length >= 1 ? (
                posts.map((post, index) => {
                  if (index === 3) {
                    return (
                      <YandexAds key={index} />
                    )
                  } else {
                    return (
                      <Post key={post._id} post={post} isListing={true} />
                    )}
                  })
              ) : (
                <div>
                   
                </div>
              )}
            </InfiniteScroll>
          </div>
        </div>
        <div className="hidden lg:block ml-6">
          <Widget community={community ? true : false} />
          <Donations />
          <PolicyWidget />
        </div>
      </div>
    </>
  )
}

export default Feed;

