import { useEffect } from "react";
import { useMessage } from "./TimeMsgContext";
import {AiOutlineSketch,AiOutlineWarning} from 'react-icons/ai';


const TimeMsg = () => {
  const {message, setMessage} = useMessage();

  useEffect(() => {
    if (!message.value) return;
    const ms = message.time ? message.time : 8000
    setTimeout(() => {
      setMessage({value: ''})
    }, ms)
  },[message. value])

  if (!message.value) return null;

  return (
    <div className={`transition-all ${message.value ? 'block opacity-100' : 'hidden opacity-0'}`}>
      <div className="fixed bottom-0 z-30 flex w-full rounded-sm border border-reddit_border bg-[#141415] font-bold lg:left-[35%] lg:right-[50%] lg:bottom-12 lg:w-[700px] ">
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
