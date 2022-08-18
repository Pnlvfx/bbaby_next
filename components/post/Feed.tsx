import InfiniteScroll from 'react-infinite-scroll-component'
import PostForm from '../submit/submitutils/PostForm'
import BestPost from './postutils/BestPost'
import Post from './Post'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'
import TopCommunities from '../widget/TopCommunities'
import CommunitiesInfo from '../widget/CommunitiesInfo'
import dynamic from 'next/dynamic'
import Donations from '../widget/Donations'
import { getPosts } from './APIpost'

type FeedProps = {
  posts: any
  community?: string,
  author?: string
}

const Feed = ({posts:ssrPost,community,author}:FeedProps) => {
  const PostModal = dynamic(() => import('./PostModal'))

  const [postOpen, setPostOpen] = useState(false)
  const router = useRouter()
  let postId:string[] | string = ''

  if(router.query.postId) {
    postId = router.query.postId;
  }

  useEffect(() => {
    setPostOpen(true);
  }, [postId]);

  useEffect(() => {
    postId= ''
  },[postOpen]);
  //

  //INFINITE SCROLLING
  const [posts,setPosts] = useState<PostProps[]>(ssrPost)

  const getMorePosts = async() => {
    const input = community ? 'community' : author ? 'author' : undefined
    const value = community ? community : author ? author : undefined
      const res = await getPosts(input,value,posts.length)
      const newPosts = res
      setPosts([...posts, ...newPosts])
  };
  //

  return (
    <>
    {postId !== '' && !isMobile && (
      <PostModal community={community} postId={postId.toString()} open={postOpen} onClickOut={() => {
        setPostOpen(false)
      }}/>
    )}
    {postId === '' && (
      <div className='flex justify-center mt-5 mx-[2px] lg:mx-10'>
        <div className='w-full lg:w-7/12 xl:w-5/12 2xl:w-[650px] lg:mr-4 flex-none'>
          {!author && (
            <div className='mb-[18px]'>
                  <PostForm community={community ? community : ''} />
            </div>
          )}
            <div className='mb-4'>
              <BestPost />
            </div>
              <>
              <InfiniteScroll 
              dataLength={posts.length}
              next={getMorePosts}
              hasMore={true}
              loader={<p></p>}
              endMessage={<p></p>}
            >
            {posts.map(post => (
                <Post key={post._id} post={post} isListing={true}/>
            ))}
            </InfiniteScroll>
            </>
        </div>
          <div className='hidden lg:block'>
            {community ? 
            <CommunitiesInfo /> 
            :
            <TopCommunities />
            }
            <Donations />
          </div>
  </div>
    )}
    </>
  )
}

export default Feed;
