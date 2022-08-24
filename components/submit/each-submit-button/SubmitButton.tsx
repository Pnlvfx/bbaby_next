import {GrBold} from 'react-icons/gr'
import {GoItalic} from 'react-icons/go'
import {BiLink} from 'react-icons/bi'
import AddImage from './AddImage';
import AddVideo from './AddVideo';

const SubmitButton = () => {
    const containerClass = 'p-2 text-reddit_text-darker'
    const iconClass = 'w-[24px] h-[24px]'

    return (
        <>
            <div className='flex ml-1'>
                <div className={containerClass}>
                    <button title='Bold'>
                        <GrBold className={iconClass} />
                    </button>
                </div>
                <div className={containerClass}>
                    <button title='Italic'>
                        <GoItalic className={iconClass}/>
                    </button>
                </div>
                <div className={containerClass}>
                    <button title='Link' onClick={() => {
                        
                        }} >
                        <BiLink className={iconClass}/>
                    </button>
                </div>
                <AddImage />
                <AddVideo />
                <div className={containerClass + ' w-[80px] flex pt-0 ml-auto p-1'}>
                    <button className='hidden lg:block'>
                        <p className='text-xs text-reddit_text font-bold'>Markdown Mode</p>
                    </button>     
                </div>
            </div>
        </>
    )
}

export default SubmitButton;
