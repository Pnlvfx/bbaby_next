import { RootCommentContextProvider } from './commentutils/RootCommentContext';
import CommentContent from './CommentContent';

interface CommentRootProps {
    post: PostProps
}

const Comment = ({ post }: CommentRootProps) => {
        
  return (
    <RootCommentContextProvider post={post} >
        <CommentContent />
    </RootCommentContextProvider>
  )
}

export default Comment;