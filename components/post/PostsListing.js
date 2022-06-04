import Post from './Post'
import PostForm from '../submit/PostForm'
import CommunitiesInfo from '../widget/CommunitiesInfo'
import BestPost from './postutils/BestPost'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { useEffect, useState } from 'react'
import CommentModal from '../comments/CommentModal'
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'

//postslistings from posts and community page

function PostsListing(props) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const [postOpen, setPostOpen] = useState(false)

  const {community} = props

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

  //INFINITE SCROLLING
  const [posts,setPosts] = useState()
  const [loading,setLoading] = useState(true)

  //GET POST
  useEffect(() => {
    setLoading(true)
    axios({
      method: 'get',
      url: `${server}/posts?community=${community}&limit=10&skip=0`,
      withCredentials:true
    }).then(response => {
      setPosts(response.data)
      setLoading(false)
    })
  },[])
  //


  const getMorePosts = async() => {
    const res = await axios.get(`${server}/posts?community=${community}skip=${posts.length}&limit=10`)
    
    const newPosts = await res.data
    setPosts((posts) => [...posts, ...newPosts])
  };
  //


  return (
    <>
    {postId && !isMobile && (
      <CommentModal postId={postId} open={postOpen} onClickOut={() => {
        setPostOpen(false)
      }} />
    )}
    {loading && (
      <div classname='opacity-60'>
        <h1>Loading...</h1>
      </div>
    )}
    {!loading && (
       <div className='flex pt-5 mx-0 lg:mx-10'>
       <div className='w-full lg:w-7/12 xl:w-5/12 2xl:w-[650px] self-center ml-auto mr-6 flex-none'>
         <div>
         </div>
         <div className='pb-3'>
           <PostForm community={community} />
         </div>
           <div className='pb-4'> 
               <BestPost />
           </div>
           <div className=''>
           <InfiniteScroll 
             dataLength={posts.length}
             next={getMorePosts}
             hasMore={true}
             loader={<h4></h4>}
             endMessage={<p></p>}
           >
           {posts.map(post => (
               <Post key={post._id} {...post} isListing={true}/>
           ))}
           </InfiniteScroll>
           </div> 
       </div>
       <div className='hidden 2-xl:block xl:block lg:block md:hidden sm:hidden mr-auto'>
         <CommunitiesInfo />
       </div>
     </div>
    )}
    </>
  )
}

export default PostsListing;