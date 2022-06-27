import { useEffect } from "react";
import { isMobile } from "react-device-detect";

type TimeMessage = {
  value: string,
  setValue: any,
  status?: string,
  time?: number,
  gov_value?: {}
}

function ShowTimeMsg({value,setValue,status,time,gov_value}:TimeMessage) {


  const ms = time ? time : 8000
  const _status = status === 'error' ? 'bg-reddit_red' : 'bg-[#0079D3] w-4'

  useEffect(() => {
    if (!value) return 
    if(!gov_value) {
      setTimeout(() => {
        setValue('')
    }, ms)
    } else {
      setTimeout(() => {
        setValue({...gov_value,err:'',success:''})
    },ms)
    }
  },[value])

  
 return(
    <>
      {value && (
        <>
        {!isMobile && (
        <div className='bottom-12 fixed flex bg-reddit_dark-brighter border border-reddit_text rounded-sm z-30'>
          <div className={_status}>
          </div>
            <p className='p-3 pl-4 w-[600px]'>{value}</p>
        </div>
      )}
      {isMobile && (
          <div className='bottom-12 fixed flex bg-reddit_dark-brighter border border-reddit_text rounded-md overflow-hidden w-[300px] z-30'>
          <div className={_status}>
          </div>
            <p className='p-3 pl-4'>{value}</p>
          </div>
      )}
      </>
    )}
    </>
  )
 }

export default ShowTimeMsg;