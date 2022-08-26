import { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "../twitter/Skeleton";
import RedditPost from "./RedditPost";

type RedditPostContent = {
    posts: RedditPosts[]
    postForm: ReactNode
    bestPost: ReactNode
}

const RedditFeed = ({posts, postForm, bestPost}: RedditPostContent) => {

    const getMore = async () => {

    }

    console.log(posts.length)
  return (
    <div className="mx-[2px] lg:mx-10 mt-5 flex justify-center">
        <div className="w-full lg:w-7/12  lg:mr-4 2xl:w-[650px] flex-none">
            <div className='mb-[18px]'>
                {postForm}
            </div>
            <div className="mb-4">
                {bestPost}
            </div>
            {posts.length > 14 ?
            <InfiniteScroll 
                dataLength={posts.length}
                next={getMore}
                hasMore={true}
                loader={<></>}
                endMessage={<></>}
            >
                {posts.map((post, id) => <RedditPost post={post.data} key={id} />)}
            </InfiniteScroll>
            : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((_, idx) => (
                <Skeleton isImage={true} key={idx} />
            ))
        }
        </div>
    </div>
  )
}

export default RedditFeed;
