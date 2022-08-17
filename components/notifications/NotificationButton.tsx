import { BellIcon } from '@heroicons/react/outline';

const NotificationButton = () => {
  const boxIconSize = 32;
  return (
    <>
      <button className="relative top-0 left-0 mx-2 hidden lg:block" style={{width: boxIconSize, height: boxIconSize}}>
        <BellIcon className="relative top-0 left-0 h-[20px] w-[20px] text-[#D7DADC]" />
        <div className='p-1 absolute -top-[4px] left-[6px] rounded-full w-[17px] h-[17px]'>
                <div className='bg-reddit_red rounded-full w-[13px] h-[13px] self-center text-center'>
                    <p className='text-xs self-center font-bold'>9</p>
                </div>
            </div>
      </button>
    </>
  )
}

export default NotificationButton;
