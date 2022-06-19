import {BiLink} from 'react-icons/bi'
import Link from 'next/link';
import {useRouter} from 'next/router'
import { useContext, useEffect, useState } from 'react';
import AuthModalContext from '../auth/AuthModalContext';
import Image from 'next/image';
import UserContext from '../auth/UserContext';
import {AddImage} from '../utils/SVG'

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
            <div className='border border-reddit_border p-2 rounded-md flex bg-reddit_dark-brighter mx-auto'>
                <div className='flex-none rounded-full bg-gray-600 overflow-hidden w-9 h-9 relative border border-reddit_border'>
                    {session && (
                        <Link href={`/user/${session.user.username}`}>
                            <a>
                                <Image src={session.user.avatar} className='rounded-full' alt='' layout='fill' objectFit='cover' />
                            </a>
                        </Link>
                    )}
                    {!session && (
                        <Image className='rounded-full' src='https://res.cloudinary.com/bbabystyle/image/upload/v1655209740/default/avatar_txt7me.webp' alt='' layout='fill' objectFit='cover' />
                    )}
                </div>
                <form className='flex-grow bg-reddit_dark-brightest border border-reddit_border hover:border-reddit_text ml-4 mr-2 rounded-md'>
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
                        <div onClick={e => {
                            e.preventDefault()
                            modalContext.setShow('login')
                        }}>
                        <input 
                            type='text' 
                            className='bg-reddit_dark-brightest p-2 px-3 text-sm block w-full rounded-md placeholder:text-reddit_text-darker' 
                            placeholder='Login to create a Post'/>
                        </div>
                    )}
                </form>
                <div className='self-center mt-[6px] flex-none'>
                    <button title='Create media post' className="mx-1 opacity-10 text-reddit_text-darker">
                        <AddImage />
                    </button>
                    <button className="">
                        <BiLink className="text-reddit_text-darker w-6 h-6 mx-1 opacity-10"/>
                    </button>
                </div>
            </div>
    )
}

export default PostForm;