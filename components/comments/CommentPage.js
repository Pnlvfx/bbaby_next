import CommunitiesInfo from '../widget/CommunitiesInfo'
import Donations from '../widget/Donations'
import Comment from './Comment'


  function CommentPage(props) {
    const {post} = props
    const postId = post._id


  return (
    <div className=''>
      <div className='flex pt-3 mx-0 lg:mx-10'>
        <div className='w-full lg:w-7/12 xl:w-[780px] 2xl:w-[850px] ml-auto mr-6 flex-none'>
          <div className='bg-reddit_dark-brighter rounded-md'>
            <Comment post={post} postId={postId}/>
          </div>
        </div>
        <div className='hidden 2-xl:flex xl:block lg:block md:hidden sm:hidden mr-auto'>
          <CommunitiesInfo community={post.community} />
          <Donations />
          </div>
      </div>
    </div>
  )
  }


  export default CommentPage;