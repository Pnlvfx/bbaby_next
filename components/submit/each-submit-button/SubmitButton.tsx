import {GrBold} from 'react-icons/gr'
import {GoItalic} from 'react-icons/go'
import {BiLink} from 'react-icons/bi'
import AddImage from './AddImage';
import AddVideo from './AddVideo';
import { ReactNode } from 'react';

const SubmitButton = () => {
    const Button = (title: string, icon: ReactNode) => {
        return (
            <span className='h-8 w-8'>
                <button 
                    role={'button'}
                    tabIndex={-1} 
                    title={title}
                    className={buttonClass}
                    style={{lineHeight: 0}}
                >
                    {icon}
                    <div className='bottom-0 left-0 absolute right-0 top-0'>
                        <div className={hoverClass}>
                            {title}
                        </div>
                    </div>
                </button>
            </span>
        )
    }

    return (
        <>
            <div className='h-full w-full items-center ml-1 relative flex'>
                <div className='flex items-center absolute'>
                    {Button('bold', <GrBold className={iconClass} />)}
                    {Button('Italics', <GoItalic className={iconClass}/>)}
                    {Button('Link', <BiLink className={iconClass}/>)}
                    <AddImage />
                    <AddVideo />
                </div>
            </div>
            <div className={'relative'}>
                <button className='flex whitespace-pre-wrap relative border solid border-transparent text-[12px] font-bold leading-4 min-h-6 min-w-6 py-1 px-2 items-center justify-center rounded-full box-border w-auto text-center'>
                    <span>Markdown Mode</span>
                </button>     
            </div>
        </>
    )
}

export default SubmitButton;

export const buttonClass = 
    `
    rounded-[4px] border-none text-reddit_text-darker items-center box-border flex outline-none p-1 relative 
    transition-colors hover:bg-[#454546] text-[14px] font-bold 
    min-h-8 min-w-8 justify-center text-center w-auto
    `
export const hoverClass = 
    `
    opacity-0 transition-opacity hidden bottom-[100%] mb-[5px] left-[50%] absolute text-[12px] 
    font-normal leading-4 translate-x-[-50%] bg-reddit_dark rounded-[5px] text-reddit_text py-[5px] 
    px-4 pointer-events-none text-center z-100 whitespace-pre
    `

export const iconClass = 'p-0 inline-block w-5 h-5 text-[20px] leading-5 align-middle'
