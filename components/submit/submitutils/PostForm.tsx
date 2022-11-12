import {BiLink} from 'react-icons/bi'
import Link from 'next/link';
import { useAuthModal} from '../../auth/modal/AuthModalContext';
import Image from 'next/image';
import {AddImageIcon} from '../../utils/SVG'
import { useSession } from '../../auth/UserContext';

type PostFormProps = {
    community?: string
}

function PostForm({community}: PostFormProps) {
    const {session} = useSession();
    const modalContext = useAuthModal();
    const inputClass = 'text-[16px] md:text-[14px] leading-5 bg-reddit_dark-brightest p-2 px-3 block w-full rounded-md placeholder:text-reddit_text-darker'

    if (!session?.user) return null;
    
    return (
    <div className='border border-reddit_border p-2 rounded flex bg-reddit_dark-brighter mx-auto'>
        <div className='overflow-hidden w-[38px] h-[38px]'>
            <Link 
                href={`/user/${session.user.username.toLowerCase()}`}
                className='w-[38px] h-[38px]'
            >
                <div className='relative h-full'>
                    <div className='rounded-[50%] w-[38px] h-[38px] relative'>
                        <div className='bg-[#343536] w-full h-full rounded-[50%]' />
                            <picture className='absolute bottom-0 w-full h-full rounded-[50%]'>
                                <img
                                    src={session.user.avatar} 
                                    className='w-full h-full rounded-[50%]'
                                    style={{transformOrigin: 'bottom center'}}
                                    alt='User Avatar'
                                />
                            </picture>
                    </div>
                </div>
            </Link>
        </div>
        <form className='flex-grow bg-reddit_dark-brightest border border-reddit_border hover:border-reddit_text ml-4 mr-2 rounded-md'>
            {session?.user && (
                <Link href={!community ? '/submit' : `/b/${community}/submit`}>
                    <input 
                        type='text' 
                        className={inputClass} 
                        placeholder='Create Post'
                    />
                </Link>
            )}
            {!session?.user && (
                <div onClick={e => {
                    e.preventDefault()
                    modalContext.setShow('login')
                }}>
                <input 
                    type='text'
                    className={inputClass} 
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