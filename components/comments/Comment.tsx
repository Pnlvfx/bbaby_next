import {useState,useEffect} from 'react'
import axios from 'axios'
import Post from '../post/Post'
import RootCommentContext from './commentutils/RootCommentContext'
import Comments from './Comments'
import CommentForm from './commentutils/CommentForm'
import { useRouter } from 'next/router'

interface CommentProps {
    post: PostProps
    postId: string | string[]
}

function Comment({post,postId}:CommentProps) {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const router = useRouter()
    const [comments,setComments] = useState([]);

    const [commentsTotals,setCommentsTotals] = useState(null);
    const [userVotes,setUserVotes] = useState(null);

    const refreshComments = () => {
        axios.get(server+'/comments/root/'+postId)
        .then(response => {
        setComments(response.data)
        })
    }

    function refreshVotes() {
        const commentsIds = [post._id, ...comments.map((c:any) => c._id)];
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
      <div className='bg-reddit_dark-brighter'>
      {post && (
        <Post post={post} open={true} />
      )}
      {!!post && !!post._id && (
          <>
          <hr className='border-reddit_border my-4'/>
          <CommentForm onSubmit={() => refreshComments()} rootId={post._id} parentId={post._id} showAuthor={true}/>
          <hr className='border-reddit_border my-4'/> 
          <RootCommentContext.Provider value={{refreshComments,refreshVotes,commentsTotals,userVotes}}>
              <Comments parentId={post._id} rootId={post._id} comments={comments}/>
          </RootCommentContext.Provider>
          </>
      )}
      </div>
  )
}

export default Comment;