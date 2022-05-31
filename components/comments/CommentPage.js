import CommunitiesInfo from '../widget/CommunitiesInfo'
import Comment from './Comment'


  function CommentPage(props) {
    const {comment} = props
    const commentId = comment._id
    const {community} = comment


  return (
    <div className=''>
      <div className='flex pt-3 mx-0 lg:mx-10'>
        <div className='w-full lg:w-9/12 xl:w-[780px] 2xl:w-[850px] self-center ml-auto mr-6 flex-none'>
          <div className='bg-reddit_dark-brighter rounded-md'>
          <Comment comment={comment} id={commentId} community={community}/>
          </div>
        </div>
        <div className='hidden 2-xl:block xl:block lg:block md:hidden sm:hidden mr-auto'>
          <CommunitiesInfo />
          </div>
      </div>
    </div>
  )
  }


  export default CommentPage;