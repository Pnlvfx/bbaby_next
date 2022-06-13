import { isMobile } from "react-device-detect";

function showTimeMsg(value:any) {
  
 return(
    <>
    {!isMobile && (
      <div className='bottom-12 fixed flex bg-reddit_dark-brighter border border-reddit_text rounded-sm z-30'>
         <div className='bg-[#0079D3] w-4'>
         </div>
           <h1 className='p-3 pl-4 w-[600px]'>{value}</h1>
      </div>
    )}
    {isMobile && (
        <div className='bottom-12 fixed flex bg-reddit_dark-brighter border border-reddit_text rounded-md overflow-hidden w-[300px] z-30'>
        <div className='bg-[#0079D3] w-4'>
        </div>
           <h1 className='p-3 pl-4'>{value}</h1>
        </div>
    )}
    </>
  )
 }

export default showTimeMsg;