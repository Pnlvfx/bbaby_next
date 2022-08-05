import {BiLink} from 'react-icons/bi'
import Link from 'next/link';
import {useRouter} from 'next/router'
import { useContext } from 'react';
import {AuthModalContext, AuthModalContextProps} from '../../auth/AuthModalContext';
import Image from 'next/image';
import UserContext from '../../auth/UserContext';
import {AddImageIcon} from '../../utils/SVG'

type PostFormProps = {
    community?: string
}

function PostForm({community}:PostFormProps) {
    const {session} = useContext(UserContext)

    let router = useRouter()
    const {setShow} = useContext(AuthModalContext) as AuthModalContextProps;
    
    return (
            <div className='border border-reddit_border p-2 rounded-md flex bg-reddit_dark-brighter mx-auto'>
                <div className='flex-none rounded-full bg-gray-600 overflow-hidden w-9 h-9 border border-reddit_border'>
                    {session && (
                        <Link href={`/user/${session.user.username}`}>
                            <a>
                                <div className='w-9 h-9 relative'>
                                    <Image src={session.user.avatar} className='rounded-full' alt='' layout='fill' objectFit='cover' />
                                </div>
                            </a>
                        </Link>
                    )}
                    {!session && (
                        <div className='w-9 h-9 relative'>
                            <Image className='rounded-full' src='https://res.cloudinary.com/bbabystyle/image/upload/v1655209740/default/avatar_txt7me.webp' alt='' layout='fill' objectFit='cover' />
                        </div>
                    )}
                </div>
                <form className='flex-grow bg-reddit_dark-brightest border border-reddit_border hover:border-reddit_text ml-4 mr-2 rounded-md'>
                    {session && (
                        <Link href={!community ? '/submit' : `/b/${community}/submit?community=${community}`} as={!community ? undefined : `${router.asPath}/submit`}>
                            <a>
                                <input 
                                    type='text' 
                                    className='bg-reddit_dark-brightest p-2 px-3 text-sm block w-full rounded-md placeholder:text-reddit_text-darker' 
                                    placeholder='Create Post'
                                />
                            </a>
                        </Link>
                    )}
                    {!session && (
                        <div onClick={e => {
                            e.preventDefault()
                            setShow('login')
                        }}>
                        <input 
                            type='text' 
                            className='bg-reddit_dark-brightest p-2 px-3 text-sm block w-full rounded-md placeholder:text-reddit_text-darker' 
                            placeholder='Login to create a Post'/>
                        </div>
                    )}
                </form>
                {/* <div className='self-center mt-[6px] flex-none'> CHANGE TO A LINK
                    <button title='Create media post' className="mx-1 opacity-10 text-reddit_text-darker">
                        <AddImageIcon/>
                    </button>
                    <a>
                        <BiLink className="text-reddit_text-darker w-6 h-6 mx-1 opacity-10"/>
                    </a>
                </div> */}
            </div>
    )
}

export default PostForm;