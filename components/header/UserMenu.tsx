import { LogoutIcon } from '@heroicons/react/outline';
import { useContext } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import {GiBabyFace} from 'react-icons/gi';
import { CommunityContext, CommunityContextProps } from '../community/CommunityContext';
import Router from 'next/router';
import { useSession } from '../auth/UserContext';
import Link from 'next/link';
import { postRequestHeaders } from '../main/config';

function UserMenu({showDropdown,setShowDropdown}:any) {
    const {session} = useSession();
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const containerClass = 'hover:bg-reddit_dark-brightest cursor-pointer'
    const buttonClass = 'text-sm p-3 pl-12 font-bold'

    const logout = async() => {
        const url = `${server}/logout`;
        const body = JSON.stringify({})
        const res = await fetch(url, {
            method: 'POST',
            body,
            headers: postRequestHeaders,
            credentials: 'include'
        });
        localStorage.removeItem('isLogged')
        Router.reload()
    }
    
    const {setShow: setShowCommunity} = useContext(CommunityContext) as CommunityContextProps;

  return (
    <>
    {showDropdown && (
        <div className={'absolute right-0 top-[53px] bg-reddit_dark-brighter border border-reddit_border z-10 rounded-md text-reddit_text overflow-hidden'}>
        <div className='w-[280px]'>
                <div className='p-4 pb-1'>
                    <span className="text-sm flex text-reddit_text-darker">
                        <BiUserCircle className='w-6 h-6' />
                        <p className='text-sm pt-[3px] pl-2'>My Stuff</p>
                    </span>
                </div>
                <div id='button_no_icons' >
                    {session?.user?.role === 1 && (
                        <Link href={`/governance`}>
                            <a onClick={() => {
                                setShowDropdown(false)
                        }}>
                                <div className={containerClass}>
                                    <p className={buttonClass}>Governance</p>    
                                </div>
                            </a>
                        </Link>
                    )}
                    <div className={containerClass}>
                        <p className={buttonClass}>Online Status</p>    
                    </div>
                    {session?.user && (
                        <Link href={`/user/${session.user.username}`}>
                            <a onClick={() => {
                                setShowDropdown(false)
                            }}>
                                <div className={containerClass}>
                                    <p className={buttonClass}>Profile</p>    
                                </div>
                            </a>
                        </Link>
                    )}
                    <Link href={`/settings`}>
                        <a onClick={() => {
                            setShowDropdown(false)
                        }}>
                            <div className={containerClass}>
                                <p className={buttonClass}>User Settings</p>    
                            </div>
                        </a>
                    </Link>
                </div>    
                <hr className='border-reddit_border my-3 mb-4'/>  
                <div id='buttons_with_icon'>
                    <div className={containerClass}>
                        <div className={'flex p-[9px] pl-4'} onClick={() => {
                                setShowCommunity(true);
                                setShowDropdown(false)
                                }}>
                            <GiBabyFace className='w-6 h-6 mr-2' />
                            <p className='font-bold text-sm mt-[2px]'>Create a community</p>
                        </div>
                    </div>
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
                </div>
                <hr className='border-reddit_border my-3 mb-4'/>
                <div className={containerClass}>
                    <div onClick={() => {
                        logout()
                        setShowDropdown(!showDropdown)
                        }} className={'flex p-[9px] pl-4'}>
                        <LogoutIcon className='w-6 h-6 mr-2'/>
                        <p className='font-bold text-sm mt-[2px]'>Log Out</p>
                    </div>
                </div>
                    <div>
                        <p className='text-xs p-4 pt-3 text-reddit_text-darker'>2022 Bbabystyle.Inc. All rights reserved</p>
                    </div>
            </div>
    </div>
    )}
    </>
  )
}

export default UserMenu;

