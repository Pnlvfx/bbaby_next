import InfiniteScroll from 'react-infinite-scroll-component';
import PostForm from '../submit/submitutils/PostForm';
import BestPost from './postutils/BestPost';
import Post from './Post';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import dynamic from 'next/dynamic'
import Donations from '../widget/Donations'
import { getPosts } from './APIpost';
import Skeleton from '../governance/twitter/Skeleton';
import { TimeMsgContext, TimeMsgContextProps } from '../main/TimeMsgContext';
import Link from 'next/link';
import Widget from '../widget/Widget';

type FeedProps = {
  posts: PostProps[]
  community?: string
  author?: string
}

const Feed = ({ posts: ssrPost, community, author }: FeedProps) => {
  const [posts, setPosts] = useState<PostProps[]>(ssrPost);
  const [postOpen, setPostOpen] = useState(false);
  const router = useRouter();
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;
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
          <div className="w-full lg:w-[640px]">
            {!author && (
              <div className="mb-[18px]">
                <PostForm community={community ? community : ''} />
              </div>
            )}
            <div className="mb-4">
              <BestPost />
            </div>
            
           <div>
            <InfiniteScroll
                dataLength={posts?.length || 0}
                next={getMorePosts}
                hasMore={true}
                loader={[1, 2, 3, 4, 5].map((_, idx) => (
                  <Skeleton isImage={true} key={idx} />
                ))}
                endMessage={<></>}
                
              >
                {posts?.map((post, index) => (
                <Post key={post._id} post={post} isListing={true} index={index} />
                ))}
              </InfiniteScroll>
           </div>
          </div>
          <div className="hidden lg:block ml-6">
            <Widget community={community ? true : false} />
            <Donations />
            <div className='relative flex-grow'>
              <div className='sticky top-[57px]'>
                <div className='bg-transparent text-reddit_text-darker p-2'>
                  <div className='border-b solid border-transparent flex py-2 mx-3'>
                    <div className='flex w-[50%] px-1' style={{flexDirection: 'column', flexWrap: 'nowrap'}} >
                      <Link href={'/policies/user-agreement'}>
                        <a className='mx-1 text-[12px] leading-4 inline-block'>
                          User Agreement
                        </a>
                      </Link>
                      <Link href={'/policies/privacy-policy'}>
                        <a className='mx-1 text-[12px] leading-4 inline-block mt-1'>
                          Privacy Policy
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className='text-[12px] leading-4 flex p-3'>Bbabystyle Inc © 2022. All rights reserved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Feed;

