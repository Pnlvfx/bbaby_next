import { useSession } from '../auth/UserContext';
import Donations from '../widget/Donations';
import Widget from '../widget/Widget';
import Comment from './Comment';

interface CommentPageProps {
  post: PostProps
}

const CommentPage = ({ post }: CommentPageProps) => {
  const {session} = useSession();
  return (
    <>
    {session?.device?.mobile ? (
      <div className='pt-2 block box-border mb-2 bg-reddit_dark-brighter'>
        <Comment post={post} />
      </div>
    ) : (
      <div className='flex flex-col min-h-[calc(100vh_-_48px)]'>
        <div className='max-w-[1600px] md:py-5 md:px-6 box-border flex flex-row justify-center mx-auto'>
          <div className='w-full lg:w-7/12 xl:w-5/12 2xl:w-[750px] lg:mr-4 flex-none bg-reddit_dark-brighter break-words rounded-md'>
              <Comment post={post} />
          </div>
          <div className='hidden lg:block'>
            <Widget community={true} />
            <Donations />
          </div>
        </div>
      </div>
    )}
    </>
  )
}


  export default CommentPage;
  