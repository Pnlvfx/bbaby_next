import ReplyButton from './commentutils/ReplyButton';
import TimeAgo from 'timeago-react';
import CommentForm from './commentutils/CommentForm';
import {useState} from 'react';
import { useCommentContext } from './commentutils/RootCommentContext';
import Voting from '../voting/Voting';
import Linkify from 'react-linkify';

interface CommentsProps {
  parentId: string
  rootId: string
}

const Comments = ({parentId, rootId }: CommentsProps) => {
  const {comments: propsComments, getComments} = useCommentContext()
  const [showForm, setShowForm] = useState(false);
  const comments = propsComments.filter((comment) => parentId === comment.parentId);

  return (
    <div className={"my-2 bg-reddit_dark-brighter"}>
        {comments.map((comment) => { 
          const replies = propsComments.filter((c) => c.parentId === comment._id)
          return (
          <div className='mb-2' key={comment._id}>
              <div className="flex mb-2">
                  <img
                    src={comment.authorAvatar} 
                    alt='User Avatar' 
                    className="w-8 h-8 rounded-full mr-2" 
                  />
                  <div className="leading-10 pr-2 text-sm font-sans">{comment.author}</div>
                  <TimeAgo className='leading-10 text-sm text-reddit_text-darker font-sans' datetime={comment.createdAt} />
              </div>
              <div className='border-l-2 border-reddit_text-darker p-3 ml-[18px]'>
                <div className='pl-4 -mt-4'>
                  <div className='inline text-sm leading-6 break-words resize-x-none flex-none'>
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a
                        className='text-reddit_blue' 
                        target={'_blank'} 
                        href={decoratedHref} 
                        key={key}
                        rel={'noopener nofollow ugc noreferrer'}
                      >
                        {decoratedText}
                      </a>
                    )} >
                      <p className='inline whitespace-pre-wrap'>{comment.body}</p>
                    </Linkify>
                  </div>
                  <div className='flex p-2 pl-0 w-auto'>
                    <Voting comment={comment} />
                    <ReplyButton type={"button"} onClick={() => {setShowForm(!!comment._id)}}>Reply</ReplyButton>
                  </div>
                    {!!comment._id === showForm && (
                    <CommentForm 
                      parentId={comment._id} 
                      rootId={rootId} 
                      showAuthor={false} 
                      onCancel={ () => setShowForm(false)} 
                    />
                  )}
                  {replies.length > 0 && (
                    <Comments parentId={comment._id} rootId={rootId} />
                  )}
                </div>
              </div>
          </div>  
        )}
      )}
    </div>
  )
}

export default Comments;