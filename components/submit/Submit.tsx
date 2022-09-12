import {useContext, useEffect} from 'react';
import { buttonClass, Spinner } from '../utils/Button';
import CommunityDropdown from './submitutils/CommunityDropdown';
import UserContext from '../auth/UserContext';
import { SubmitContext, SubmitContextType } from './SubmitContext';
import Body from './submitutils/Body';
import SubmitType from './SubmitType';
import SubmitTitle from './SubmitTitle';
import { newTweetProps } from './SubmitLayout';

type SubmitProps = {
    newTweet?: newTweetProps
    community?: string | string[]
}

const Submit = ({newTweet, community }: SubmitProps) => {
    const {session} = useContext(UserContext) as SessionProps;

    const {
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
        titleLength,
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
        if(community) {
            setSelectedCommunity(community.toString())
        }
    },[community])


    //////MY TWEEEEEEEEET
    useEffect(() => {
        if (!newTweet) return;
        if (newTweet.title) {
            setTitle(newTweet.title)
            if (newTweet.type === 'photo' && newTweet.height && newTweet.width) {
                setIsImage(true)
                setHeight(newTweet.height)
                setWidth(newTweet.width)
                setSelectedFile(newTweet.image)
            }
            if (newTweet.type === 'video' && newTweet.height && newTweet.width) {
                setIsVideo(true)
                setHeight(newTweet.height)
                setWidth(newTweet.width)
                setSelectedFile(newTweet.video);
            }
        }
    },[newTweet])
    //

  return (
    <>
    <div tabIndex={0} />
        <div className={`${loading ? 'opacity-40' : 'opacity-100'} px-2 md:px-0`}>
            <div className='p-1 my-4 border-b solid flex border-reddit_border'>
                <div className='mb-3 text-[17px] font-semibold leading-[22px] flex-grow flex-shrink'>
                    Create a Post
                </div>
                <button role={'button'} className='text-[12px] font-bold leading-6 ml-[10px] relative border border-transparent min-h-8 min-w-8 px-4 py-1 items-center rounded-full box-border text-center w-auto' style={{letterSpacing: .5}}>
                    DRAFTS
                    <span className='font-normal leading-4 ml-1 py-[1px] px-[3px] '>0</span>
                </button>
            </div>
            <CommunityDropdown />
            <div className='bg-reddit_dark-brighter mb-5 rounded-[5px]'>
                <SubmitType />
                <div className='m-4'>
                    <SubmitTitle />
                    <Body />
                </div>
                    <hr className='mt-12 mb-4 border-reddit_border mx-3'/>
                    <div className='text-right pb-4 mx-4'>
                        <button className={`h-[30px] mr-2 opacity-20 ${buttonClass(true)}`}><p>Save Draft</p></button>
                        <button disabled={titleLength >= 1 && selectedCommunity ? false : true} onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            createPost()
                            }} 
                            className={`h-[30px] ${buttonClass()} ${titleLength >= 1 && selectedCommunity ? "text-opacity-100" : "text-opacity-40 cursor-not-allowed"}`}>
                            {!loading && <p>Post</p>}
                            {loading && <Spinner />}
                        </button>
                    </div>
                <div className='h-24 bg-reddit_dark-brightest'>
                    {session?.user.role === 1 && (
                        <div className='flex mx-4 pt-5'>
                            <input type="checkbox" id='telegram' checked={sharePostToTG} onChange={shareToTelegram} className='w-[15px] h-[15px] px-4 self-center bg-reddit_dark-brighter' style={{filter: 'invert(85%)'}}/>
                            <p className='ml-[7px] text-[13px] self-center font-bold'>Share this post on Telegram</p>
                        </div>
                    )}
                    <div className='flex mx-4 pt-3'>
                        <input type="checkbox" id='twitter' checked={sharePostToTwitter} onChange={shareToTwitter} className='w-[15px] h-[15px] px-4 self-center bg-reddit_dark-brighter' style={{filter: 'invert(85%)'}}/>
                        <p className='ml-[7px] text-[13px] self-center font-bold'>Share this post on Twitter</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Submit;