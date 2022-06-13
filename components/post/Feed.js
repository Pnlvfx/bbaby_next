import Post from './Post'
import PostForm from '../submit/PostForm'
import CommunitiesList from '../widget/TopCommunities'
import BestPost from './postutils/BestPost'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'
import CommunitiesInfo from '../widget/CommunitiesInfo'
import dynamic from 'next/dynamic'

//PostsListings from home and best page

function Feed(props) {
  // GETTING COMMUNITY IF COMMUNITY PAGE
  const {community,author} = props
  //

  // OPEN MODAL
  //DELAY MODAL LOADING
  const PostModal = dynamic(() => import('./PostModal'))
  //
  const [postOpen, setPostOpen] = useState(false)
  let router = useRouter()
  let postId = null
  if(router.query.postId) {
    postId = router.query.postId;
  }
  useEffect(() => {
    setPostOpen(true);
  }, [postId]);

  useEffect(() => {
    postId= null
  },[postOpen]);
  //

  //INFINITE SCROLLING
  const [posts,setPosts] = useState([])
  const [loadingPosts,setLoadingPosts] = useState(true)
  const [loadingCommunity,setLoadingCommunity] = useState(true)

  //GET POST FROM COMMUNITYPAGE AND HOMEPAGE
  useEffect(() => {
    //setLoadingPosts(true)
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    if (community) {
      axios({
        method: 'get',
        url: `${server}/posts?community=${community}&limit=10&skip=0`,
        withCredentials:true
      }).then(response => {
        setPosts(response.data)
        setLoadingPosts(false)
      })
    } else if(author) {
      axios({
        method: 'get',
        url: `${server}/posts?author=${author}&limit=10&skip=0`,
        withCredentials:true
      }).then(response => {
        setPosts(response.data)
        setLoadingPosts(false)
      })
    } else {
      axios({
        method: 'get',
        url: `${server}/posts?limit=10&skip=0`,
        withCredentials:true
      }).then(response => {
        setPosts(response.data)
        setLoadingPosts(false)
      })
    }
  },[])
  //

  const getMorePosts = async() => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    if (community) {
      const res = await axios.get(`${server}/posts?community=${community}&skip=${posts.length}&limit=10`)
      const newPosts = await res.data
      setPosts((posts) => [...posts, ...newPosts])
    } if (author) {
      const res = await axios.get(`${server}/posts?author=${author}&skip=${posts.length}&limit=10`)
      const newPosts = await res.data
      setPosts((posts) => [...posts, ...newPosts])
    } else {
      const res = await axios.get(`${server}/posts?skip=${posts.length}&limit=10`)
      const newPosts = await res.data
      setPosts((posts) => [...posts, ...newPosts])
    }
  };
  //

  // GET ALL COMMUNITY INFO
  const [allCommunity,setAllCommunity] = useState([]);

  useEffect(() => {
    if (community) return
    if (!loadingPosts) {
      const server = process.env.NEXT_PUBLIC_SERVER_URL
      axios.get(server+'/communities?limit=5', {withCredentials:true})
        .then(response => {
          setAllCommunity(response.data)
          setLoadingCommunity(false)
        });
    }
    }, [loadingPosts]);
    //

  return (
    <>
    {postId && !isMobile && (
      <PostModal postId={postId} open={postOpen} onClickOut={() => {
        setPostOpen(false)
      }}/>
    )}
      <div className='flex pt-5 mx-0 lg:mx-10'>
      <div className='w-full lg:w-7/12 xl:w-5/12 2xl:w-[650px] self-center ml-auto mr-6 flex-none'>
      {loadingPosts && (
            <div>loading...</div>
          )}
          {!loadingPosts && (
            <>
          <div className='pb-3'>
            {!author && ( //authorPage
              <PostForm community={community ? community : posts?.community} allCommunity={allCommunity} />
            )}
          </div>
          <div className='pb-4'> 
            <BestPost />
          </div>
            <InfiniteScroll 
            dataLength={posts.length}
            next={getMorePosts}
            hasMore={true}
            loader={<h4></h4>}
            endMessage={<p></p>}
          >
          {posts.map(post => (
              <Post key={post._id} {...post} loadingPosts={loadingPosts} isListing={true}/>
          ))}
          </InfiniteScroll>
          </>
          )}
      </div>
      {community && (
        <div className='hidden 2-xl:block xl:block lg:block md:hidden sm:hidden mr-auto'>
          <CommunitiesInfo />
        </div>
      )}
      {!community && (
        <div className='hidden 2-xl:block xl:block lg:block md:hidden sm:hidden mr-auto'>
            <CommunitiesList allCommunity={allCommunity} loadingCommunity={loadingCommunity}/>
        </div>
      )}
    </div>
    </>
  )
}

export default Feed;