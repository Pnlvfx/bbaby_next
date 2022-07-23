import axios from 'axios'
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
  const [posts,setPosts] = useState<any[]>(ssrPost)

  const getMorePosts = async() => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    if (community) {
      const res = await axios.get(`${server}/posts?community=${community}&skip=${posts.length}&limit=10`)
      const newPosts = res.data
      setPosts([...posts, ...newPosts])
    } else if (author) {
      const res = await axios.get(`${server}/posts?author=${author}&skip=${posts.length}&limit=10`)
      const newPosts = res.data
      setPosts([...posts, ...newPosts])
    } else {
      const res = await axios.get(`${server}/posts?skip=${posts.length}&limit=10`)
      const newPosts = res.data
      setPosts([...posts, ...newPosts])
    }
  };
  //

  return (
    <>
    {postId !== '' && !isMobile && (
      <PostModal community={community} postId={postId} open={postOpen} onClickOut={() => {
        setPostOpen(false)
      }}/>
    )}
    {postId === '' && (
      <div className='flex pt-5 mx-[2px] lg:mx-10'>
        <div className='w-full lg:w-7/12 xl:w-5/12 2xl:w-[650px] ml-auto mr-4 flex-none'>
            <div className='pb-[18px]'>
                {!author && ( //authorPage
                  <PostForm community={community ? community : ''} />
                )}
            </div>
            <div className='pb-4'>
              <BestPost />
            </div>
              <>
              <InfiniteScroll 
              dataLength={posts.length}
              next={getMorePosts}
              hasMore={true}
              loader={<h4></h4>}
              endMessage={<p></p>}
            >
            {posts.map(post => (
                <Post key={post._id} post={post} isListing={true}/>
            ))}
            </InfiniteScroll>
            </>
        </div>
          <div className='hidden 2-xl:block xl:block lg:block md:hidden sm:hidden mr-auto'>
            {community ? 
            <CommunitiesInfo community={community} /> 
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
