import Image from "next/image";
import {useState} from "react";
import Button from "../utils/Button";
import closeIcon from '../../public/closeIcon.svg'


function NewEmailNotif(props) {

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
                      <h2 className="pb-2">{props.email}</h2>
                      <h3 className="">Check your inbox email for Bbaby&apos;s confirmation email. A current email address help ensure you don&apos;t lose access to your account</h3>
                  </div>
                  <div className="flex-none">
                      <button onClick={() => setIsOpen(false)} >
                      <Image src={closeIcon} alt="" width={'16px'} height={'16px'} style={{filter:'invert(60%)'}} />
                      </button>
                  </div>
              </div>
              <div className="text-right pr-2 p-2">
              <Button onClick={() => setIsOpen(false)} className="py-1 px-10" >Got It</Button>
              </div>
         </div>
     
   </>
  )
}

export default NewEmailNotif;