import {useState,useEffect} from 'react'
import axios from 'axios';
import Post from '../post/Post';
import RootCommentContext from './commentutils/RootCommentContext'
import Comments from './Comments'
import CommentForm from '../submit/CommentForm'
import { useRouter } from 'next/router'

function Comment(props) {

    const server = process.env.NEXT_PUBLIC_SERVER_URL

    const router = useRouter()

    const {post,postId} = props
    const [comments,setComments] = useState([]);

    const [commentsTotals,setCommentsTotals] = useState(null);
    const [userVotes,setUserVotes] = useState(null);

    
    
    function refreshComments() {
        axios.get(server+'/comments/root/'+postId)
        .then(response => {
        setComments(response.data)
        })
    }

    function refreshVotes() {
        const commentsIds = [post._id, ...comments.map(c => c._id)];
        axios.post(server+'/votes', {commentsIds}, {withCredentials:true})
            .then(response => {
                setCommentsTotals(response.data.commentsTotals);
                setUserVotes(response.data.userVotes);
            })
    }

    
    useEffect(() => {
        if (router.query.postId) {
        refreshComments();
        }
        },[post,router]);

        useEffect(() => {
            if (router.query.postId) {
            refreshVotes();
            }
        },[comments.length]);

        
        

  return (
      <>
      {post && (
        <Post {...post} open={true} />
      )}
      
      {!!post && !!post._id && (
          <>
          <hr className='border-reddit_border my-4'/>
          <CommentForm onSubmit={() => refreshComments()} rootId={post._id} parentId={post._id} showAuthor={true} community={props.community} />
          <hr className='border-reddit_border my-4'/> 
          <RootCommentContext.Provider value={{refreshComments,refreshVotes,commentsTotals,userVotes}}>
              <Comments parentId={post._id} rootId={post._id} comments={comments}/>
          </RootCommentContext.Provider>
          </>
      )}
      </>
  )
}

export default Comment;