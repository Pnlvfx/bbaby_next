import {FaSpaceShuttle} from 'react-icons/fa'
import Link from 'next/link';

function BestPost() {

    return (
            <div className='border border-reddit_border py-[13px] px-2 rounded-md flex bg-reddit_dark-brighter self-center mx-auto'>
                <div className='flex'>
                    <div className={'rounded-full py-1 px-3 self-center '}>
                        <Link href={'/'} as={'/best'}>
                            <a className='flex'>
                                <FaSpaceShuttle className='-rotate-90 mt-[2px] mr-1 w-5 h-5'/>
                                <h1 className='text-sm font-bold'>Best</h1>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default BestPost;