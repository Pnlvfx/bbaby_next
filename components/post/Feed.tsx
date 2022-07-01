import Post from './Post'
import PostForm from '../submit/PostForm'
import TopCommunities from '../widget/TopCommunities'
import BestPost from './postutils/BestPost'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'
import CommunitiesInfo from '../widget/CommunitiesInfo'
import dynamic from 'next/dynamic'
import Donations from '../widget/Donations'
import PostLoading from './PostLoading'
import { getPosts } from './APIpost'

type FeedProps = {
  community?: string,
  author?: string
}

const Feed = ({community,author}:FeedProps) => {
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
  const [posts,setPosts] = useState<any[]>([])
  const [loadingPosts,setLoadingPosts] = useState(posts ? false : true)
  const [loadingCommunity,setLoadingCommunity] = useState(true)


  //GET POST FROM COMMUNITYPAGE USER_PAGE AND HOMEPAGE
  useEffect(() => {
    setLoadingPosts(true)
    if (community) {
        getPosts({input:'community',value:community}).then(response => {
        setPosts(response.data)
      })
    } else if(author) {
        getPosts({input:'author',value:author}).then(response => {
        setPosts(response.data)
      })
    } else {  //HOME
        getPosts({}).then(response => {
        setPosts(response.data)
      })
    }
    setLoadingPosts(false)
  },[])
  //

  const getMorePosts = async() => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    if (community) {
      const res:AxiosResponse = await axios.get(`${server}/posts?community=${community}&skip=${posts.length}&limit=10`)
      const newPosts = await res.data
      setPosts([...posts, ...newPosts])
    } else if (author) {
      const res:AxiosResponse = await axios.get(`${server}/posts?author=${author}&skip=${posts.length}&limit=10`)
      const newPosts = await res.data
      setPosts([...posts, ...newPosts])
    } else {
      const res:AxiosResponse = await axios.get(`${server}/posts?skip=${posts.length}&limit=10`)
      const newPosts = await res.data
      setPosts([...posts, ...newPosts])
    }
  };
  //

  // GET ALL COMMUNITY INFO
  const [allCommunity,setAllCommunity] = useState([]);

  const refreshCommunities = () => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    axios.get(`${server}/best-communities?limit=5`,{withCredentials:true})
      .then(response => {
        setAllCommunity(response.data)
        setLoadingCommunity(false)
      });
  }

  useEffect(() => {
    if (community) return
    if (isMobile) return
    if (!loadingPosts) {
      refreshCommunities()
    }
    }, [loadingPosts]);
    //

  return (
    <>
    {postId !== '' && !isMobile && (
      <PostModal community={community} postId={postId} open={postOpen} onClickOut={() => {
        setPostOpen(false)
      }}/>
    )}
      <div className='flex pt-5 mx-[2px] lg:mx-10'>
        <div className='w-full lg:w-7/12 xl:w-5/12 2xl:w-[650px] ml-auto mr-4 flex-none overflow-hidden'>
            <div className='pb-[18px]'>
                {!author && ( //authorPage
                  <PostForm community={community ? community : ''} allCommunity={allCommunity} />
                )}
            </div>
            <div className='pb-4'>
              <BestPost />
            </div>
            {loadingPosts && (
              <>
              loading posts...
              {/* <PostLoading />
              <PostLoading /> */}
              </>
            )}
            {!loadingPosts && (
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
            )}
        </div>
        {community && !isMobile && (
          <div className='hidden 2-xl:block xl:block lg:block md:hidden sm:hidden mr-auto'>
            <CommunitiesInfo community={community} />
            <Donations />
          </div>
        )}
        {!community && !isMobile && (
          <div className='hidden 2-xl:flex xl:block lg:block md:hidden sm:hidden mr-auto'>
              <TopCommunities refreshCommunities={refreshCommunities} allCommunity={allCommunity} loadingCommunity={loadingCommunity}/>
              <Donations />
          </div>
        )}
    </div>
    </>
  )
}

export default Feed;
