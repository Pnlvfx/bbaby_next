import {useContext, useState,useEffect} from 'react'
import Button from '../utils/Button';
import TextareaAutosize from 'react-textarea-autosize';
import ClickOutHandler from 'react-clickout-ts';
import SubmitButton from './each-submit-button/SubmitButton';
import {HiOutlineDocumentText} from 'react-icons/hi'
import ShowTimeMsg from '../utils/notification/ShowTimeMsg';
import { AddImageIcon } from '../utils/SVG';
import CommunityDropdown from './submitutils/CommunityDropdown';
import UserContext from '../auth/UserContext';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { SubmitContext, SubmitContextType } from './SubmitContext';
import Body from './submitutils/Body';

type SubmitProps = {
    newTweet?: any
    community?: string | string[]
}

const Submit = ({newTweet,community}:SubmitProps) => {
    const provider = useContext(UserContext)
    const {session} = provider
    const [startTyping,setStartTyping] = useState(false)
    const [activeClassTitle, setActiveClassTitle] = useState('border-reddit_dark-brightest')
    const [activeClassBody, setActiveClassBody] = useState('border-reddit_dark-brightest')
    const [enablePost,setEnablePost] = useState('text-opacity-40 cursor-not-allowed')

    const {
        title,
        setTitle,
        setHeight,
        setWidth,
        selectedCommunity,
        setSelectedCommunity,
        setSelectedFile,
        setIsImage,
        sharePostToTG,
        setSharePostToTG,
        sharePostToTwitter,
        setSharePostToTwitter,
        loading,
        status,
        setStatus,
        createPost
    } = useContext(SubmitContext) as SubmitContextType
    // SHARE ON TELEGRAM
    const shareToTelegram = () => {
        setSharePostToTG(!sharePostToTG)
    }
    //SHARE TO TWITTER
    const shareToTwitter = () => {
        setSharePostToTwitter(!sharePostToTwitter)
    }

    useEffect(() => {
        if(startTyping && selectedCommunity) {
            setEnablePost('text-opacity-100')
        }
    },[selectedCommunity,startTyping])
   
    useEffect(() => {
        if(community) {
            setSelectedCommunity(community.toString())
        }
    },[community])

    if(startTyping) {
        const textarea:any = document.querySelector('textarea')
        const count:any = document.getElementById('count')
        textarea.onkeyup = (e: { target: { value: string | any[]; }; }) => {
            count.innerHTML = (0 + e.target.value.length) + '/300';
        }
    }
    //

    //////MY TWEEEEEEEEET
    useEffect(() => {
        if (newTweet && newTweet.title) {
            setTitle(newTweet.title)
            if (newTweet.image) {
                setIsImage(true)
                setHeight(newTweet.height)
                setWidth(newTweet.width)
                setSelectedFile(newTweet.image)
            }
        }
    },[newTweet])
    //

  return (
        <div className={`${loading && ('opacity-40')}`}>
            <p className='mb-3 text-[17px] font-semibold'>Create a Post</p>
        <hr className='border-reddit_border mb-4'/>
            <CommunityDropdown />
            <div className='bg-reddit_dark-brighter rounded-md flex-none mt-2'>
                <div className='flex mb-3 rounded-md'>
                    <button className='text-sm border-r border-reddit_border flex border-b-2 px-8 py-1 hover:bg-reddit_hover'>
                        <HiOutlineDocumentText className='w-6 h-6 mt-2'/>
                        <h1 className='py-3 font-semibold'>Post</h1>
                    </button>
                    <button className='opacity-20 text-sm border-r border-reddit_border flex border-b-2 px-3 py-1 hover:bg-reddit_hover'>
                        <div className='mt-2 mr-1'>
                        <AddImageIcon />
                        </div>
                        <h1 className='py-3 font-semibold'>Images & Video</h1>
                    </button>
                </div>
                <>
                <ClickOutHandler onClickOut={() => {
                    setActiveClassTitle('border-reddit_dark-brightest')
                    setActiveClassBody('border-reddit_dark-brightest')
                }}>
                    <div onClick={() => {
                        setStartTyping(true),
                        setActiveClassTitle('hover:border border-reddit_text')
                        }}
                            className={'rounded-md flex mx-4 break-words whitespace-pre-wrap border '+activeClassTitle}>
                        <div className='flex w-full p-[6px]'>
                        <TextareaAutosize
                        className='placeholder-reddit_text-darker text-[15px] pl-3 w-full leading-6 row-span-1 overflow-x-hidden h-auto resize-none overflow-auto bg-reddit_dark-brighter text-reddit_text rounded-md block outline-none'
                        placeholder={'Title'}
                        onChange={e => setTitle(e.target.value)}
                        maxLength={300}
                        value={title}/>
                        <div id='count' className='text-reddit_text-darker flex-none text-[10px] mt-1'>0/300</div>
                        </div>
                    </div>
                </ClickOutHandler>
                <div onClick={() => setActiveClassBody('hover:border border-reddit_text')} className={'mx-4 mt-2 border border-reddit_border rounded-md mb-3 ' +activeClassBody}>
                    <div className='bg-reddit_dark-brightest h-10 overflow-hidden'>
                        <SubmitButton/>    
                    </div>
                    <Body />
                </div>
                    <hr className='mt-12 mb-4 border-reddit_border mx-3'/>
                    <div className='text-right pb-4 mx-4'>
                        <Button outline='true' className='h-[30px] mr-2 opacity-20'><p>Save Draft</p></Button>
                        <Button onClick={() => {createPost()}} className={"h-[30px] " + enablePost}>
                            {!loading && <p>Post</p>}
                            {loading && <AiOutlineLoading3Quarters className='animate-spin mx-auto'/>}
                        </Button>
                    </div>
                </>
                <div className='h-24 bg-reddit_dark-brightest'>
                    {session?.user.role && (
                        <div id='telegram' className='flex mx-4 pt-5'>
                            <input type="checkbox" id='telegram' checked={sharePostToTG} onChange={shareToTelegram} className='w-[15px] h-[15px] px-4 self-center bg-reddit_dark-brighter' style={{filter: 'invert(85%)'}}/>
                            <h1 className='ml-[7px] text-[13px] self-center font-bold'>Share this post on Telegram</h1>
                        </div>
                    )}
                    <div id='twitter' className='flex mx-4 pt-3'>
                        <input type="checkbox" id='telegram' checked={sharePostToTwitter} onChange={shareToTwitter} className='w-[15px] h-[15px] px-4 self-center bg-reddit_dark-brighter' style={{filter: 'invert(85%)'}}/>
                        <h1 className='ml-[7px] text-[13px] self-center font-bold'>Share this post on Twitter</h1>
                    </div>
                </div>
            </div>
                    {status && (
                        <ShowTimeMsg value={status} setValue={setStatus} />
                    )}
    </div>
  )
}

export default Submit;