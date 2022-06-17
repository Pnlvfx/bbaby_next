import {FaRegFlag} from 'react-icons/fa'
import Button from '../utils/Button'
import { PayPalScriptProvider,PayPalButtons } from '@paypal/react-paypal-js'

const Donations = () => {
   const NEXT_PUBLIC_PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPPAL_CLIENT_ID
  return (
    <div className='bg-reddit_dark-brighter rounded-md ml-2 w-[310] max-w-[310px] mb-5 border border-reddit_border box-content'>
        <div className='p-4 flex'>
            <div className='self-center'>
                <FaRegFlag className='w-6 h-6' />
            </div>
            <div className='ml-4 text-sm'>
                <div className='self-center font-bold'>
                    <h1>Bbaby</h1>
                </div>
                <div className='self-center'>
                    <h1 className='flex break-words'>If you want to help us develop a social platform where everyone can share without censorship,</h1>
                    <h2>Consider making a small PayPal donation</h2>
                </div>
            </div>
        </div>
        <div className='w-[310] mx-2 mb-3'>
            <PayPalScriptProvider options={{"client-id": 'AU1ut3kg1iLfhoZ22Dv04YUwSMs9CsSeeHN4sxBVytTdmAH0g4so2g4R3ZUoNwrt239Qs2VCB3enjO2F'}}>
                <PayPalButtons style={{layout: "horizontal"}} className='w-full' />
            </PayPalScriptProvider>
        </div>
    </div>
  )
}

export default Donations