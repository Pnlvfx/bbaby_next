import { CommentIcon } from '../../utils/SVG';

const ReplyButton = (props) => {
  let classNames = "flex text-[#717273] hover:bg-reddit_dark-brightest rounded-sm p-2 pl-0"

  return (
    <button {...props} className={classNames + props.className}>
      <div className='mr-1'>
        <CommentIcon className='h-5 w-5' />
      </div>
        <p>Reply</p>
    </button>

  )
}

export default ReplyButton;
