import { FaRegFlag } from 'react-icons/fa'
import { useState } from 'react'
import Image from 'next/image'
const Donations = () => {
  //const NEXT_PUBLIC_PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPPAL_CLIENT_ID
  //const [{ isPending }] = usePayPalScriptReducer();
  const [loading, isLoading] = useState(true)

  const Spinner = () => {
    return (
      <div className="mb-2 h-[60px] items-center justify-center">
        <div className="h-[35px] bg-[#2C2E2F]"></div>
      </div>
    )
  }

  return (
    <div className="mb-5 box-content w-[310] max-w-[310px] rounded-md border border-reddit_border bg-reddit_dark-brighter">
      <div className="flex p-4">
        <div className="self-center">
          <FaRegFlag className="h-6 w-6" />
        </div>
        <div className="ml-4 text-sm">
          <div className="self-center font-bold">
            <h1>Bbaby</h1>
          </div>
          <div className="self-center">
            <h1 className="flex break-words">
              If you want to help us develop a social platform where everyone
              can share without censorship,
            </h1>
            <h2>Consider making a small PayPal donation</h2>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-2 mb-3 w-[310] justify-center flex">
        <form
          action="https://www.paypal.com/donate"
          method="post"
          target="_top"
        >
          <input type="hidden" name="hosted_button_id" value="ATPT3DVZYJ8L4" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/IT/i/btn/btn_donateCC_LG.gif"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
          />
          <Image
            alt=""
            src="https://www.paypal.com/en_IT/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
      </div>
    </div>
  )
}

export default Donations
