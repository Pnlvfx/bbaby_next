import { useRouter } from 'next/router'
import { useState } from 'react'


function UserSettings() {

    const [active,setActive] = useState(false)
    const router = useRouter()

  return (
            <>
                <div>
                    <h1 className='font-bold py-4 px-6 text-[19px]'>User settings</h1>
                </div>
                <div className='flex pl-5'>
                    <button title='account' onClick={() => {
                        router.push('/settings/account')
                    }} className={`px-4 py-2 ${active && 'border-b-2'}`}>
                        <h1 className='font-bold text-sm'>Account</h1>
                    </button>
                    <button title='account' onClick={() => {
                        router.push('/settings/profile')
                    }} className={`px-4 py-2 ${active && 'border-b-2'}`}>
                        <h1 className='font-bold text-sm'>Profile</h1>
                    </button>
                    <button title='account' onClick={() => {
                        router.push('/settings/profile')
                    }} className={`px-4 py-2 ${active && 'border-b-2'}`}>
                        <h1 className='font-bold text-sm'>Safety & Privacy</h1>
                    </button>
                </div>
                <hr className='p-2 mx-2 border-reddit_border w-1/2'/>
            </>
  )
}

export default UserSettings;