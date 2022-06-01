import ReplyButton from './commentutils/ReplyButton'
import TimeAgo from 'timeago-react'
import CommentForm from '../submit/CommentForm';
import {useState, useContext} from 'react'
import RootCommentContext from './commentutils/RootCommentContext';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Voting from '../voting/Voting'

function Comments(props) {
  const [showForm, setShowForm] = useState(false);
  const comments = props.comments.filter(comment => props.parentId === comment.parentId);
  const rootCommentInfo = useContext(RootCommentContext);


  return (
    <div className={"my-2"}>
        {comments.map(comment => { 
          const replies = props.comments.filter(c => c.parentId === comment._id)

          return(
          <div className='mb-2'>
              <div className="flex mb-2">
                  <img src={comment.authorAvatar} alt='' className="bg-gray-600 w-8 h-8 rounded-full mr-2" />
                  <div className="leading-10 pr-2 text-sm font-sans">{comment.author}</div>
                  <TimeAgo className='leading-10 text-sm text-reddit_text-darker font-sans' datetime={comment.createdAt} />
              </div>
              <div className='border-l-2 border-reddit_text-darker p-3'
              style={{marginLeft:'18px'}} >
                <div className='pl-4 -mt-4'>
                  <div>
                    <ReactMarkdown remarkPlugins={[gfm]} children={comment.body} />
                  </div>


                  <div className='flex p-2 pl-0 w-auto'>
                  <Voting commentId={comment._id} />
                  <ReplyButton type={"button"} onClick={() => {setShowForm(comment._id)}}>Reply</ReplyButton>
                  </div>


                    {comment._id === showForm && (
                    <CommentForm parentId={comment._id} rootId={props.rootId} onSubmit={() => {setShowForm(false);
                            rootCommentInfo.refreshComments();
                    }}
                    showAuthor={false} 
                    onCancel={ e => setShowForm(false)} />
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