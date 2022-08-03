import { useContext } from 'react'
import { BiUserCircle } from 'react-icons/bi';
import {FiSettings} from 'react-icons/fi'
import {AuthModalContext, AuthModalContextProps} from '../auth/AuthModalContext'
import Link from 'next/link';


function NotUserMenu({showDropdown,setShowDropdown}:any) {
    const containerClass = 'hover:bg-reddit_dark-brightest cursor-pointer'
    const buttonClass = 'text-sm p-3 pl-12 font-bold'
    const authModal = useContext(AuthModalContext) as AuthModalContextProps;

  return (
    <>
    {showDropdown && (
        <div className={'absolute right-0 top-[53px] bg-reddit_dark-brighter border border-reddit_border z-10 rounded-md text-reddit_text overflow-hidden'}>
        <div className='w-[280px]'>
            <div className=''>
                <div id='buttons_with_icon' className=''>
                    <div className='p-3'>
                    </div>
                    <div className={containerClass}>
                        <div className={'flex p-[10px] pl-4'} onClick={() => {
                                }}>
                            <FiSettings className='w-5 h-5 mr-2' />
                            <p className='font-bold text-sm mt-[2px]'>Settings</p>
                        </div>
                    </div>
                </div>
                <hr className='border-reddit_border my-3 mb-4'/>
                    <div id='button_no_icons' className=''>
                    <div className={containerClass}>
                            <Link href={'/policies/user-agreement'}>
                                <a target='_blank' onClick={() => {
                                    setShowDropdown(false)
                                }}>
                                    <p className={buttonClass}>User Agreement</p> 
                                </a>   
                            </Link>
                    </div>
                    <div className={containerClass}>
                            <Link href={'/policies/privacy-policy'}>
                                <a target='_blank' onClick={() => {
                                    setShowDropdown(false)
                                }} >
                                    <p className={buttonClass}>Privacy Policy</p>   
                                </a>
                            </Link> 
                    </div>
                    <div className={containerClass}>
                    <p className={buttonClass}>Content Policy</p>    
                    </div>
                    <div className={containerClass}>
                    <p className={buttonClass}>Moderator Guidelines</p>    
                    </div>
                </div>    
                <hr className='border-reddit_border my-3 mb-4'/>  
                <div className={containerClass}>
                    <div onClick={() => {
                        authModal.setShow('login')
                        setShowDropdown(false)
                        }} className={'flex p-[9px] pl-4'}>
                        <BiUserCircle className='w-6 h-6 mr-2'/>
                        <p className='font-bold text-sm mt-[2px]'>Sign Up or Log In</p>
                    </div>
                </div>
                    <div>
                        <p className='text-xs p-4 pt-3 text-reddit_text-darker'>2022 Bbabystyle.Inc. All rights reserved</p>
                    </div>
        </div> 
            </div>
    </div>
    )}
    </>
  )
}

export default NotUserMenu;