import {BiLink} from 'react-icons/bi'
import Link from 'next/link';
import {useRouter} from 'next/router'
import { useContext, useEffect, useState } from 'react';
import AuthModalContext from '../auth/AuthModalContext';
import Image from 'next/image';
import UserContext from '../auth/UserContext';

function PostForm(props) {

    const provider = useContext(UserContext)
    const {session} = provider

    let router = useRouter()
    const [url,setUrl] = useState('')
    const [query,setQuery] = useState('')
    const modalContext = useContext(AuthModalContext)

    useEffect(() => {
        if(router.asPath === '/') {
            setQuery('/submit')
            setUrl('/submit')
        } else {
            setQuery(`/submit?community=${props.community}`)
            setUrl(router.asPath+'/submit')
        }
    },[router])

    
    return (
        <div className='text-gray-400'>
            <div className='border border-reddit_border p-2 rounded-md flex bg-reddit_dark-brighter self-center mx-auto'>
                <div className='rounded-full bg-gray-600 overflow-hidden w-10 h-10 flex-none'>
                    {session && (
                        <Image src={session.user.avatar} alt='' width={'40px'} height={'40px'}/>
                    )}
                    {!session && (
                        <Image src='https://res.cloudinary.com/bbabystyle/image/upload/v1652554985/avatar_aqlsee.png' alt='' width={'40px'} height={'40px'} />
                    )}
                </div>
                <form action='' className='flex-grow bg-reddit_dark-brightest border border-reddit_border hover:border-reddit_text ml-4 mr-2 rounded-md'>
                    {session && (
                        <Link href={query} as={url}>
                        <a>
                        <input 
                            type='text' 
                            className='bg-reddit_dark-brightest p-2 px-3 text-sm block w-full rounded-md placeholder:text-reddit_text-darker' 
                            placeholder='Create Post'/>
                        </a>
                        </Link>
                    )}
                    {!session && (
                        <button onClick={e => {
                            e.preventDefault()
                            modalContext.setShow('login')
                        }}>
                        <input 
                            type='text' 
                            className='bg-reddit_dark-brightest p-2 px-3 text-sm block w-full rounded-md placeholder:text-reddit_text-darker' 
                            placeholder='Login to create a Post'/>
                        </button>
                    )}
                </form>
                <button className="mx-1 mt-[6px] opacity-10 text-reddit_text-darker">
                    <Image src={'/addimage.svg'} alt='' width={'24px'} height={'24px'} />
                </button>
                <button className="">
                    <BiLink className="text-gray-400 w-6 h-6 mx-1 opacity-10"/>
                </button>
            </div>
        </div>
    )
}

export default PostForm;