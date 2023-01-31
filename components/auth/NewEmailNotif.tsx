import { useState } from 'react'
import { buttonClass } from '../utils/buttons/Button'
import { CloseIcon } from '../utils/SVG/SVG'

interface EmailNotifProps {
  email: string
}

const NewEmailNotif = ({ email }: EmailNotifProps) => {
  const [isOpen, setIsOpen] = useState(true)
  if (!isOpen) {
    return null
  }

  return (
    <>
      <div className="absolute top-[54px] right-0 z-30 h-[240px] w-[320px] bg-reddit_dark-brighter">
        <div className="h-3 bg-reddit_blue" />
        <div className="flex p-4">
          <div className="">
            <p className="font-bold">Confirm your email:</p>
            <h2 className="pb-2">{email}</h2>
            <h3 className="">
              Check your inbox email for Bbaby&apos;s confirmation email. A current email address help ensure you don&apos;t lose access to your
              account
            </h3>
          </div>
          <div className="flex-none">
            <button onClick={() => setIsOpen(false)}>
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-2 pr-2 text-right">
          <button onClick={() => setIsOpen(false)} className={`py-1 px-10 ${buttonClass()}`}>
            Got It
          </button>
        </div>
      </div>
    </>
  )
}

export default NewEmailNotif
