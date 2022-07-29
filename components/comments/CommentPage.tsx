import CommunitiesInfo from '../widget/CommunitiesInfo'
import Donations from '../widget/Donations'
import Comment from './Comment'


  const CommentPage = ({post}:any) => {

  return (
      <div className='flex pt-5 justify-center mx-[0px] lg:mx-10'>
        <div className='w-full lg:w-7/12 xl:w-5/12 2xl:w-[750px] mr-4 flex-none'>
            <Comment post={post} postId={post._id}/>
        </div>
        <div className='hidden lg:block'>
          <CommunitiesInfo />
          <Donations />
        </div>
      </div>
  )
  }


  export default CommentPage;