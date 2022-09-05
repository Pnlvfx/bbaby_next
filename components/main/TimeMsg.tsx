import { useContext, useEffect } from "react";
import { TimeMsgContext, TimeMsgContextProps } from "./TimeMsgContext";
import {AiOutlineSketch,AiOutlineWarning} from 'react-icons/ai';


const TimeMsg = () => {
    const {message,setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;

    useEffect(() => {
      if (!message.value) return;
      const ms = message.time ? message.time : 8000
        setTimeout(() => {
          setMessage({value: ''})
      }, ms)
    },[message. value])

    if (!message.value) return null;

  return (
    <div className={`${message.value ? 'block' : 'hidden'}`}>
      <div className="fixed bottom-0 z-30 flex w-full rounded-sm border border-reddit_dark-brighter bg-reddit_dark-brighter font-bold lg:left-[35%] lg:right-[50%] lg:bottom-12 lg:w-[700px] ">
        <div className={`w-5 ${message.status === 'error' ? "bg-reddit_red" : "bg-reddit_blue"}`} />
          <div className="p-3 pl-4 flex">
            {message.status === 'error' ? (
            <AiOutlineWarning className="w-5 h-5" />
            ) :
            <AiOutlineSketch className="w-5 h-5" />
            }
            <p className="ml-2 text-[15px]">{message.value}</p>
          </div>
      </div>
    </div>
  )
}

export default TimeMsg;
