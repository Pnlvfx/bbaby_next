import { ReactNode, useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { catchErrorWithMessage } from "../../API/common";
import { getRedditPosts, getRedditPostsFromCommunity } from "../../API/governance/redditAPI";
import { TimeMsgContext, TimeMsgContextProps } from "../../main/TimeMsgContext";
import Skeleton from "../twitter/Skeleton";
import RedditPost from "./RedditPost";

type RedditPostContent = {
    postForm: ReactNode
    bestPost: ReactNode
}

const RedditFeed = ({postForm, bestPost}: RedditPostContent) => {
    const [redditPosts,setRedditPosts] = useState<RedditPostsProps[] | []>([])
    const [after, setAfter] = useState(undefined);
    const message = useContext(TimeMsgContext) as TimeMsgContextProps;

    useEffect(() => {
        const get = async () => {
          try {
            const res = await getRedditPosts();
            setRedditPosts(res.children);
            setAfter(res.after);
          } catch (err) {
            catchErrorWithMessage(err, message)
          }
        }
        get();
      }, []);
    

    const getMore = async () => {
        try {
            const res = await getRedditPosts(after, redditPosts.length);
            const newPosts = res.children;
            setRedditPosts([...redditPosts, ...newPosts])
            setAfter(res.after);
        } catch (err) {
            catchErrorWithMessage(err, message)
        }
    }

  return (
    <div className="mx-[2px] lg:mx-10 mt-5 flex justify-center">
        <div className="w-full lg:w-[640px] lg:mr-4">
            <div className='mb-[18px]'>
                {postForm}
            </div>
            <div className="mb-4">
                {bestPost}
            </div>
            {redditPosts.length > 14 ?
            <InfiniteScroll 
                dataLength={redditPosts.length}
                next={getMore}
                hasMore={true}
                loader={<></>}
                endMessage={<></>}
            >
                {redditPosts.map((post, id) => <RedditPost post={post.data} key={id} />)}
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
