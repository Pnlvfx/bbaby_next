import { useRouter } from 'next/router';
import {FaSpaceShuttle} from 'react-icons/fa'
import { useState } from 'react';

function BestPost() {

    const selectedClass = 'text-reddit_text bg-reddit_dark-brightest'
    const notSelectedClass = 'text-reddit_text-darker hover:bg-reddit_dark-brightest'
    const [bestClass,setBestClass] = useState(selectedClass)

    const router = useRouter();
    return (
        <div className=''>
            <div className='border border-reddit_border py-3 px-2 rounded-md flex bg-reddit_dark-brighter self-center mx-auto'>
                <div className='flex'>
                    <div className={'rounded-full py-1 px-3 '+bestClass}> 
                    <button value='best' onClick={() => {
                        router.push({
                            pathname:'/'
                        },'/best')
                        setBestClass(selectedClass)
                        }} className='flex'>
                        <FaSpaceShuttle className='-rotate-90 mt-[2px] mr-1'/>
                        <h1 className='text-sm font-bold'>Best</h1>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BestPost;