import {useContext, useState,useEffect} from 'react'
import { buttonClass, Spinner } from '../utils/Button';
import TextareaAutosize from 'react-textarea-autosize';
import ClickOutHandler from 'react-clickout-ts';
import SubmitButton from './each-submit-button/SubmitButton';
import {HiOutlineDocumentText} from 'react-icons/hi'
import { AddImageIcon } from '../utils/SVG';
import CommunityDropdown from './submitutils/CommunityDropdown';
import UserContext from '../auth/UserContext';
import { SubmitContext, SubmitContextType } from './SubmitContext';
import Body from './submitutils/Body';

type SubmitProps = {
    newTweet?: any
    community?: string | string[]
}

const Submit = ({newTweet,community}:SubmitProps) => {
    const {session} = useContext(UserContext)
    const [activeButton,setActiveButton] = useState('Post')
    const [activeClassTitle, setActiveClassTitle] = useState(false)
    const [activeClassBody, setActiveClassBody] = useState(false)
    const [titleLength,setTitleLength] = useState(0);
    const maxLength = session?.user.role === 1 ? 999 : 300
    const [enablePost,setEnablePost] = useState(false)

    const {
        title,
        setTitle,
        setHeight,
        setWidth,
        selectedCommunity,
        setSelectedCommunity,
        setSelectedFile,
        setIsImage,
        setIsVideo,
        sharePostToTG,
        setSharePostToTG,
        sharePostToTwitter,
        setSharePostToTwitter,
        loading,
        createPost
    } = useContext(SubmitContext) as SubmitContextType;
    // SHARE ON TELEGRAM
    const shareToTelegram = () => {
        setSharePostToTG(!sharePostToTG)
    }
    //SHARE TO TWITTER
    const shareToTwitter = () => {
        setSharePostToTwitter(!sharePostToTwitter)
    }

    useEffect(() => {
        if(titleLength >= 1 && selectedCommunity) {
            setEnablePost(true)
        } else {
            setEnablePost(false)
        }
    },[selectedCommunity,titleLength])
   
    useEffect(() => {
        if(community) {
            setSelectedCommunity(community.toString())
        }
    },[community])


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
            if (newTweet.video) {
                setIsVideo(true)
                setHeight(newTweet.height)
                setWidth(newTweet.width)
                setSelectedFile(newTweet.video)
            }
        }
    },[newTweet])
    //

  return (
        <div className={`${loading && ('opacity-40')}`}>
            <h1 className='mb-3 text-[17px] font-semibold'>Create a Post</h1>
            <hr className='border-reddit_border mb-4'/>
            <CommunityDropdown />
            <div className='bg-reddit_dark-brighter rounded-md flex-none mt-2'>
                <div className='flex mb-3 rounded-md h-[51px]'>
                    <button className={`border-r border-reddit_border hover:bg-reddit_hover`}>
                        <div className={`${activeButton === 'Post' && "border-b-2 border-reddit_text"} flex items-center px-11 h-full`}>
                            <HiOutlineDocumentText className='w-6 h-6 mr-1'/>
                            <p className='font-bold text-sm'>Post</p>
                        </div>
                    </button>
                    <button className='opacity-20 border-r border-reddit_border flex items-center border-b-2 hover:bg-reddit_hover h-full px-3'>
                        <AddImageIcon />
                        <p className='font-semibold text-sm'>Images & Video</p>
                    </button>
                </div>
                <ClickOutHandler onClickOut={() => {
                    setActiveClassTitle(false)
                    setActiveClassBody(false)
                }}>
                    <div 
                        className={`rounded-md flex mx-4 border break-words whitespace-pre-wrap ${activeClassTitle ? 'border-reddit_text' : 'border-reddit_border'}`}
                        onClick={() => {
                            setActiveClassTitle(true)
                        }}
                    >
                        <div className='flex w-full p-[6px] items-center'>
                            <TextareaAutosize
                            className='placeholder-reddit_text-darker text-[15px] pl-3 w-full leading-6 row-span-1 h-auto resize-none bg-reddit_dark-brighter text-reddit_text rounded-md outline-none'
                            placeholder={'Title'}
                            onChange={e => {
                                setTitle(e.target.value)
                                setTitleLength(e.target.value.length)
                            }}
                            maxLength={maxLength}
                            value={title}/>
                            <p className='text-reddit_text-darker text-[12px] mr-1 font-bold'>{titleLength}/{maxLength}</p>
                        </div>
                    </div>
                </ClickOutHandler>
                <div className={`mx-4 mt-2 border overflow-hidden border-reddit_border rounded-md mb-3 ${activeClassBody ? 'border-reddit_text' : 'border-reddit_border'}`}
                    onClick={() => setActiveClassBody(true)}>
                    <div className='bg-reddit_dark-brightest h-10 overflow-hidden'>
                        <SubmitButton/>    
                    </div>
                    <Body />
                </div>
                    <hr className='mt-12 mb-4 border-reddit_border mx-3'/>
                    <div className='text-right pb-4 mx-4'>
                        <button className={`h-[30px] mr-2 opacity-20 ${buttonClass(true)}`}><p>Save Draft</p></button>
                        <button disabled={!enablePost} onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            createPost()
                            }} 
                            className={`h-[30px] ${buttonClass()} ${enablePost ? "text-opacity-100" : "text-opacity-40 cursor-not-allowed"}`}>
                            {!loading && <p>Post</p>}
                            {loading && <Spinner />}
                        </button>
                    </div>
                <div className='h-24 bg-reddit_dark-brightest'>
                    {session?.user.role && (
                        <div id='telegram' className='flex mx-4 pt-5'>
                            <input type="checkbox" id='telegram' checked={sharePostToTG} onChange={shareToTelegram} className='w-[15px] h-[15px] px-4 self-center bg-reddit_dark-brighter' style={{filter: 'invert(85%)'}}/>
                            <p className='ml-[7px] text-[13px] self-center font-bold'>Share this post on Telegram</p>
                        </div>
                    )}
                    <div id='twitter' className='flex mx-4 pt-3'>
                        <input type="checkbox" id='telegram' checked={sharePostToTwitter} onChange={shareToTwitter} className='w-[15px] h-[15px] px-4 self-center bg-reddit_dark-brighter' style={{filter: 'invert(85%)'}}/>
                        <p className='ml-[7px] text-[13px] self-center font-bold'>Share this post on Twitter</p>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Submit;