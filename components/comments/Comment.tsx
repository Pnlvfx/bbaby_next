import {useState,useEffect} from 'react'
import axios from 'axios'
import Post from '../post/Post'
import RootCommentContext from './commentutils/RootCommentContext'
import Comments from './Comments'
import CommentForm from './commentutils/CommentForm'
import { useRouter } from 'next/router'
import { GoCommentDiscussion } from 'react-icons/go'

interface CommentRootProps {
    post: PostProps
    postId: string | string[]
}

const Comment = ({post, postId}:CommentRootProps) => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const router = useRouter()
    const [comments,setComments] = useState<CommentProps[] | []>([]);

    const [commentsTotals,setCommentsTotals] = useState(null);
    const [userVotes,setUserVotes] = useState(null);

    const refreshComments = async () => {
        const response = await axios.get(server+'/comments/root/'+postId)
        .then(response => {
        setComments(response.data)
        })
    }

    const refreshVotes = () => {
        const commentsIds = [post._id, ...comments.map((c) => c._id)];
        axios.post(server+'/votes', {commentsIds}, {withCredentials:true})
            .then(response => {
                setCommentsTotals(response.data.commentsTotals);
                setUserVotes(response.data.userVotes);
            })
    }

    useEffect(() => {
        refreshComments();
        },[post]);

        useEffect(() => {
            if (router.query.postId) {
            refreshVotes();
            }
        },[comments.length]);
        
  return (
      <div className='w-full max-w-[740px] bg-reddit_dark-brighter rounded-md'>
        <div className='mr-6'>
        {post && (
        <Post post={post} open={true} />
      )}
      {!!post && !!post._id && (
          <div className='flex'>
            <div className='w-10 flex-none bg-[#141415]' />
            <div className='w-full'>
                <div className='w-full mt-4'>
                    <CommentForm onSubmit={() => refreshComments()} rootId={post._id} parentId={post._id} showAuthor={true} />
                </div>
                <div className='my-4'>
                    <hr className='border-reddit_border' />
                    {comments.length < 1 && (
                    <div className='w-full min-h-[600px] flex justify-center items-center'>
                        <div className='text-center'>
                            <GoCommentDiscussion className='my-3 w-[28px] h-[28px] text-reddit_text-darker mx-auto' />
                            <p className='font-bold text-reddit_text-darker'>No Comments yet</p>
                            <p className='mt-1 text-reddit_text-darker font-bold text-sm'>Be the first to share what you think!</p>
                        </div>
                    </div>
                    )}
                </div>
                <RootCommentContext.Provider value={{refreshComments,refreshVotes,commentsTotals,userVotes}}>
                    <Comments parentId={post._id} rootId={post._id} comments={comments}/>
                </RootCommentContext.Provider>
            </div>
          </div>
      )}
        </div>
      </div>
  )
}

export default Comment;