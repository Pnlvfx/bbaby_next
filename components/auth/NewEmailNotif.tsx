import {useState} from "react";
import { buttonClass } from "../utils/Button";
import { CloseIcon } from "../utils/SVG";

interface EmailNotifProps {
    email:string
}

const NewEmailNotif = ({email}:EmailNotifProps) => {

    const [isOpen,setIsOpen] = useState(true)
    if (!isOpen) {
        return null
    }

  return (
      <>
          <div className="top-[54px] bg-reddit_dark-brighter absolute right-0 w-[320px] h-[240px] z-30">
          <div className="bg-reddit_blue h-3"/>
              <div className="flex p-4">
                  <div className="">
                      <h1 className="font-bold" >Confirm your email:</h1>
                      <h2 className="pb-2">{email}</h2>
                      <h3 className="">Check your inbox email for Bbaby&apos;s confirmation email. A current email address help ensure you don&apos;t lose access to your account</h3>
                  </div>
                  <div className="flex-none">
                      <button onClick={() => setIsOpen(false)} >
                      <CloseIcon style={{height: '16px', width: '16px'}} />
                      </button>
                  </div>
              </div>
              <div className="text-right pr-2 p-2">
              <button onClick={() => setIsOpen(false)} className={`py-1 px-10 ${buttonClass()}`} >Got It</button>
              </div>
         </div>
     
   </>
  )
}

export default NewEmailNotif;