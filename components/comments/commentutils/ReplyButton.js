import Image from 'next/image';
import CommentIcon from '../../../public/comment.svg'


function ReplyButton(props) {
  let classNames = "flex text-[#717273] hover:bg-reddit_dark-brightest rounded-sm p-2 pl-0"

  return (
    <button {...props} className={classNames + props.className}>
      <div className='mr-1'>
        <Image src={CommentIcon} width={'24px'} height={'24px'} />
      </div>
        <h1 className=''>Reply</h1>
    </button>

  )
}






export default ReplyButton;