import ReplyButton from './commentutils/ReplyButton'
import TimeAgo from 'timeago-react'
import CommentForm from './commentutils/CommentForm';
import {useState, useContext} from 'react'
import RootCommentContext from './commentutils/RootCommentContext';
import Voting from '../voting/Voting'

function Comments(props:any) {
  const [showForm, setShowForm] = useState(false);
  const comments:any = props.comments.filter((comment:any) => props.parentId === comment.parentId);
  const rootCommentInfo:any = useContext(RootCommentContext);


  return (
    <div className={"my-2 bg-reddit_dark-brighter"}>
        {comments.map((comment:any) => { 
          const replies = props.comments.filter((c:any) => c.parentId === comment._id)

          return(
          <div className='mb-2' key={comment._id}>
              <div className="flex mb-2">
                  <img src={comment.authorAvatar} alt='' className="w-8 h-8 rounded-full mr-2" />
                  <div className="leading-10 pr-2 text-sm font-sans">{comment.author}</div>
                  <TimeAgo className='leading-10 text-sm text-reddit_text-darker font-sans' datetime={comment.createdAt} />
              </div>
              <div className='border-l-2 border-reddit_text-darker p-3' style={{marginLeft:'18px'}}>
                <div className='pl-4 -mt-4'>
                  <pre className='text-sm leading-6 break-words resize-x-none flex-none'>
                    <p style={{whiteSpace: 'pre-line',fontFamily: 'Helvetica'}}>{comment.body}</p>
                  </pre>
                  <div className='flex p-2 pl-0 w-auto'>
                    <Voting commentId={comment._id} />
                    <ReplyButton type={"button"} onClick={() => {setShowForm(comment._id)}}>Reply</ReplyButton>
                  </div>
                    {comment._id === showForm && (
                    <CommentForm parentId={comment._id} rootId={props.rootId} onSubmit={() => {setShowForm(false);
                            rootCommentInfo.refreshComments();
                    }}
                    showAuthor={false} 
                    onCancel={ (e:any) => setShowForm(false)} />
                  )}
                  {replies.length > 0 && (
                    <Comments comments={props.comments} parentId={comment._id} rootId={props.rootId} />
                  )}
                </div>
              </div>
          </div>  
        )})}
    </div>
  )
}

export default Comments;