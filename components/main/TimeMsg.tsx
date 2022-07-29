import { useContext, useEffect } from "react"
import { TimeMsgContext, TimeMsgContextProps } from "./TimeMsgContext"
import {AiOutlineSketch,AiOutlineWarning} from 'react-icons/ai'


const TimeMsg = () => {
    const {message,setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;

    const ms = message.time ? message.time : 8000
  
    useEffect(() => {
      if (!message.value) return 
        setTimeout(() => {
          setMessage({value: ''})
      },ms)
    },[message.value])

  return (
    <>
    {message.value && (
        <div className="bottom-0 left-0 right-0 m-auto h-[100px] w-[100%] fixed z-30">
            <div className="w-[90%] lg:w-[40%] border border-reddit_text overflow-hidden bg-reddit_dark-brighter mx-auto rounded-md flex min-h-[50px]">
                <div className={`w-5 ${message.status === 'error' ? "bg-reddit_red" : "bg-reddit_blue"}`} />
                <div className="text-center flex items-center ml-2">
                {message.status === 'error' ? (
                    <AiOutlineWarning className="w-5 h-5" />
                ) :
                <AiOutlineSketch className="w-5 h-5" />
                }
                    <p className="ml-2 text-[15px]">{message.value}</p>
                </div>
            </div>
        </div>
    )}
    </>
  )
}

export default TimeMsg;
