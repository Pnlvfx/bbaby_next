import { BellIcon } from "@heroicons/react/outline"

const NotificationButton = () => {
  return (
    <>
        <button className='relative top-0 left-0 mx-2 w-6 h-6 self-center'>
            <BellIcon className='text-[#D7DADC] w-[25px] h-[25px] relative top-0 left-0'/>
            {/* <div className='p-1 absolute -top-[8px] left-[12px] rounded-full w-[17px] h-[17px]'>
                <div className='bg-reddit_red rounded-full w-[17px] h-[17px] self-center text-center'>
                    <p className='text-sm self-center font-bold'>9</p>
                </div>
            </div> */}
        </button>
    </>
  )
}

export default NotificationButton