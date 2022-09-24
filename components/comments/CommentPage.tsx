import Donations from '../widget/Donations';
import Widget from '../widget/Widget';
import Comment from './Comment';

interface CommentPageProps {
  post: PostProps
}

const CommentPage = ({ post }: CommentPageProps) => {
  return (
      <div className='flex pt-5 justify-center mx-[0px] lg:mx-10'>
        <div className='w-full lg:w-7/12 xl:w-5/12 2xl:w-[750px] lg:mr-4 flex-none'>
            <Comment post={post} />
        </div>
        <div className='hidden lg:block'>
          <Widget community={true} />
          <Donations />
        </div>
      </div>
  )
}


  export default CommentPage;
  