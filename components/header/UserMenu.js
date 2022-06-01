import { LogoutIcon } from '@heroicons/react/outline';
import { useContext } from 'react'
import { BiUserCircle } from 'react-icons/bi';
import {GiBabyFace} from 'react-icons/gi'
import { CommunityContext } from '../community/CommunityContext';
import { useRouter } from 'next/router';
import UserContext from '../auth/UserContext';
import axios from 'axios';
import Link from 'next/link';


function UserMenu(props) {
    const provider = useContext(UserContext)
    const {session} = provider
    const {user} = session
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const router = useRouter()

    const logout = async() => {
        const res = await axios.post(`${server}/logout`, {}, {withCredentials:true})
        localStorage.setItem('islogged', false)
        router.reload()
    }

    const containerClass = 'hover:bg-reddit_dark-brightest cursor-pointer'
    const buttonClass = 'text-sm p-3 pl-12 font-bold'
    
    const {userDropdownVisibilityClass,setUserDropdownVisibilityClass} = props
    const {setShow:setShowCommunity,setCommunity} = useContext(CommunityContext);

  return (
    <div className={'absolute right-0 top-[53px] bg-reddit_dark-brighter border border-reddit_border z-10 rounded-md text-reddit_text overflow-hidden ' +userDropdownVisibilityClass}>
        <div className='w-[280px]'>
            <div className=''>
                <div className='p-4 pb-1'>
                    <span className="text-sm flex text-reddit_text-darker">
                        <BiUserCircle className='w-6 h-6' />
                        <h1 className='text-sm pt-[3px] pl-2'>My Stuff</h1>
                    </span>
                </div>
            <div id='button_no_icons' className=''>
                <div className={containerClass}>
                <h1 className={buttonClass}>Online Status</h1>    
                </div>
                <div onClick={() => {
                    router.push(`/user/${user.username}`)
                }} className={containerClass}>
                <h1 className={buttonClass}>Profile</h1>    
                </div>
                <div className={containerClass} title='user settings' onClick={() => {
                    router.push('/settings')
                    setUserDropdownVisibilityClass('hidden');
                    }}>
                <h1 className={buttonClass}>User Settings</h1>    
                </div>
            </div>    
            <hr className='border-reddit_border my-3 mb-4'/>  
                <div id='buttons_with_icon'>
                    <div className={containerClass}>
                        <div className={'flex p-[9px] pl-4'} onClick={() => {
                                setShowCommunity(true);
                                setUserDropdownVisibilityClass('hidden');
                                }}>
                            <GiBabyFace className='w-6 h-6 mr-2' />
                            <h1 className='font-bold text-sm mt-[2px]'>Create a community</h1>
                        </div>
                    </div>
                    <div className={containerClass}>
                            <Link href={'/policies/user-agreement'}>
                                <a target='_blank' onClick={() => {
                                    setUserDropdownVisibilityClass('hidden')
                                }}>
                                    <h1 className={buttonClass}>User Agreement</h1> 
                                </a>   
                            </Link>
                    </div>
                    <div className={containerClass}>
                            <Link href={'/policies/privacy-policy'}>
                                <a target='_blank' onClick={() => {
                                    setUserDropdownVisibilityClass('hidden');
                                }} >
                                    <h1 className={buttonClass}>Privacy Policy</h1>   
                                </a>
                            </Link> 
                    </div>
                </div>
                <hr className='border-reddit_border my-3 mb-4'/>
                <div className={containerClass}>
                    <div onClick={() => {
                        logout()
                        setUserDropdownVisibilityClass('hidden');
                        }} className={'flex p-[9px] pl-4'}>
                        <LogoutIcon className='w-6 h-6 mr-2'/>
                        <h1 className='font-bold text-sm mt-[2px]'>Log Out</h1>
                    </div>
                </div>
                    <div>
                        <h1 className='text-xs p-4 pt-3 text-reddit_text-darker'>2022 Bbabystyle.Inc. All rights reserved</h1>
                    </div>
        </div> 
            </div>
    </div>
  )
}

export default UserMenu
