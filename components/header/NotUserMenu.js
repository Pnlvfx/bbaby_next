import { useContext } from 'react'
import { BiUserCircle } from 'react-icons/bi';
import {FiSettings} from 'react-icons/fi'
import AuthModalContext from '../auth/AuthModalContext'
import Link from 'next/link';


function NotUserMenu(props) {
    const containerClass = 'hover:bg-reddit_dark-brightest cursor-pointer'
    const buttonClass = 'text-sm p-3 pl-12 font-bold'
    const authModal = useContext(AuthModalContext);


    const {userDropdownVisibilityClass,setUserDropdownVisibilityClass} = props

  return (
    <div className={'absolute right-0 top-[53px] bg-reddit_dark-brighter border border-reddit_border z-10 rounded-md text-reddit_text overflow-hidden ' +userDropdownVisibilityClass}>
        <div className='w-[280px]'>
            <div className=''>
                <div id='buttons_with_icon' className=''>
                    <div className='p-3'>

                    </div>
                    <div className={containerClass}>
                        <div className={'flex p-[10px] pl-4'} onClick={() => {
                                }}>
                            <FiSettings className='w-5 h-5 mr-2' />
                            <h1 className='font-bold text-sm mt-[2px]'>Settings</h1>
                        </div>
                    </div>
                </div>
                <hr className='border-reddit_border my-3 mb-4'/>
                    <div id='button_no_icons' className=''>
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
                    <div className={containerClass}>
                    <h1 className={buttonClass}>Content Policy</h1>    
                    </div>
                    <div className={containerClass}>
                    <h1 className={buttonClass}>Moderator Guidelines</h1>    
                    </div>
                </div>    
                <hr className='border-reddit_border my-3 mb-4'/>  
                <div className={containerClass}>
                    <div onClick={() => {
                        authModal.setShow('login')
                        setUserDropdownVisibilityClass('hidden');
                        }} className={'flex p-[9px] pl-4'}>
                        <BiUserCircle className='w-6 h-6 mr-2'/>
                        <h1 className='font-bold text-sm mt-[2px]'>Sign Up or Log In</h1>
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

export default NotUserMenu;