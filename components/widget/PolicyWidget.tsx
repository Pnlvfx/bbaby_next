import Link from "next/link"

const PolicyWidget = () => {
  return (
    <div className='relative flex-grow'>
        <div className='sticky top-[57px]'>
            <div className='bg-transparent text-reddit_text-darker p-2'>
            <div className='border-b solid border-transparent flex py-2 mx-3'>
                <div className='flex w-[50%] px-1 flex-col flex-nowrap' >
                <Link   
                    href={'/policies/user-agreement'}
                    className='mx-1 text-[12px] leading-4 inline-block'
                >
                    User Agreement
                </Link>
                <Link 
                    href={'/policies/privacy-policy'}
                    className='mx-1 text-[12px] leading-4 inline-block mt-1'
                >
                    Privacy Policy
                </Link>
                </div>
            </div>
            <div className='text-[12px] leading-4 flex p-3'>Bbabystyle Inc © 2022. All rights reserved</div>
            </div>
        </div>
    </div>
  )
}

export default PolicyWidget