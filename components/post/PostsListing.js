import Post from './Post'
import PostForm from '../submit/PostForm'
import CommunitiesInfo from '../widget/CommunitiesInfo'
import BestPost from './postutils/BestPost'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { useState } from 'react'

//postslistings from posts and community page

function PostsListing(props) {
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  //INFINITE SCROLLING

  const [posts,setPosts] = useState(props.posts)

  const getMorePosts = async() => {
    const res = await axios.get(`${server}/posts?community=${props.community}skip=${posts.length}&limit=10`)
    
    const newPosts = await res.data
    setPosts((posts) => [...posts, ...newPosts])
  }

  return (
    <div className=''>
      <div className='flex pt-5 mx-0 lg:mx-10'>
        <div className='w-full lg:w-7/12 xl:w-5/12 2xl:w-[650px] self-center ml-auto mr-6 flex-none'>
          <div>
          </div>
          <div className='pb-3'>
            <PostForm community={props.community} />
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
    </div>
  )
}

export default PostsListing;