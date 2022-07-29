import { useRouter } from 'next/router'
import { useState } from 'react'


function UserSettings() {

    const [active,setActive] = useState(false)
    const router = useRouter()

  return (
            <>
                <div>
                    <p className='font-bold py-4 px-8 text-[19px]'>User settings</p>
                </div>
                <div className='flex pl-5'>
                    <button title='account' onClick={() => {
                        router.push('/settings/account', undefined, {shallow:true})
                    }} className={`px-4 py-2 ${active && 'border-b-2'}`}>
                        <h2 className='font-bold text-sm'>Account</h2>
                    </button>
                    <button title='account' onClick={() => {
                        router.push('/settings/profile', undefined, {shallow:true})
                    }} className={`px-4 py-2 ${active && 'border-b-2'}`}>
                        <h2 className='font-bold text-sm'>Profile</h2>
                    </button>
                    <button title='account' onClick={() => {
                        router.push('/settings/profile', undefined, {shallow:true})
                    }} className={`px-4 py-2 ${active && 'border-b-2'}`}>
                        <h2 className='font-bold text-sm'>Safety & Privacy</h2>
                    </button>
                </div>
                <hr className='p-2 mx-8 border-reddit_border'/>
            </>
  )
}

export default UserSettings;