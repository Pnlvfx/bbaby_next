import { CommentIcon } from '../../utils/SVG';


function ReplyButton(props) {
  let classNames = "flex text-[#717273] hover:bg-reddit_dark-brightest rounded-sm p-2 pl-0"

  return (
    <button {...props} className={classNames + props.className}>
      <div className='mr-1'>
        <CommentIcon style={{height: '20px', width: '20px'}} />
      </div>
        <h1 className=''>Reply</h1>
    </button>

  )
}






export default ReplyButton;