import {ChatAltIcon} from '@heroicons/react/outline'


function ReplyButton(props) {
  let classNames = "flex text-[#717273] hover:bg-reddit_dark-brightest rounded-sm p-2 pl-0"

  return (
    <button {...props} className={classNames + props.className}>
        <ChatAltIcon className='w-6 h-6 mr-1'/>
        <h1 className=''>Reply</h1>
    </button>

  )
}






export default ReplyButton;