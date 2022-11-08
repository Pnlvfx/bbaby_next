import { useContext, useEffect } from 'react';
import { buttonClass, Spinner } from '../utils/Button';
import CommunityDropdown from './submitutils/community-dropwdown/CommunityDropdown';
import { useSession } from '../auth/UserContext';
import { SubmitContext, SubmitContextType } from './SubmitContext';
import Body from './submitutils/Body';
import SubmitType from './SubmitType';
import SubmitTitle from './SubmitTitle';
import { newTweetProps } from './SubmitLayout';
import Link from 'next/link';
import { AiOutlineInfoCircle } from 'react-icons/ai';

type SubmitProps = {
    newTweet?: newTweetProps
    community?: string | string[]
}

const Submit = ({newTweet, community }: SubmitProps) => {
    const {session} = useSession();

    const {
        setTitle,
        setBody,
        setHeight,
        setWidth,
        selectedCommunity,
        setSelectedFile,
        setIsImage,
        setIsVideo,
        sharePostToTG,
        setSharePostToTG,
        sharePostToTwitter,
        setSharePostToTwitter,
        canPostOnTwitter,
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
            } else if (newTweet.type === 'video' && newTweet.height && newTweet.width) {
                setIsVideo(true)
                setHeight(newTweet.height)
                setWidth(newTweet.width)
                setSelectedFile(newTweet.video);
            } else if (newTweet.body) {
                setBody(newTweet.body);
            }
        }
    },[newTweet]);

  return (
    <>
    <div tabIndex={0} />
        <div className={`${loading ? 'opacity-40' : 'opacity-100'} px-2 md:px-0`}>
            {!newTweet && (
                <div className='p-1 my-4 border-b border-solid flex border-reddit_border'>
                    <div className='text-[18px] font-medium leading-[22px] flex-1'>
                        Create a Post
                    </div>
                    <button 
                        role={'button'} 
                        className='text-[12px] font-bold leading-6 ml-[10px] relative border border-transparent min-h-8 min-w-8 px-4 py-1 items-center rounded-full box-border text-center w-auto' 
                        style={{letterSpacing: .5}}
                    >
                        DRAFTS
                        <span className='font-normal leading-4 ml-1 py-[1px] px-[3px] '>0</span>
                    </button>
                </div>
            )}
            <CommunityDropdown initialCommunity={community?.toString()} />
            <div className='bg-reddit_dark-brighter mb-5 rounded-[5px]'>
                {!newTweet && <SubmitType />}
                <div className='m-4'>
                    <SubmitTitle />
                    <Body />
                </div>
                <hr className='mt-12 mb-4 border-reddit_border mx-3'/>
                <div className='text-right pb-4 mx-4'>
                    <button className={`h-[30px] mr-2 opacity-20 ${buttonClass(true)}`}><p>Save Draft</p></button>
                    <button
                        className={`h-[30px] ${buttonClass()} ${titleLength >= 1 && selectedCommunity ? "text-opacity-100" : "text-opacity-40 cursor-not-allowed"}`}
                        disabled={titleLength >= 1 && selectedCommunity ? false : true} 
                        onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            await createPost();
                        }} 
                    >
                        {!loading && <p>Post</p>}
                        {loading && <Spinner />}
                    </button>
                </div>
                <div className='h-24 bg-reddit_dark-brightest rounded-b-md border-t border-solid border-reddit_border flex py-2 px-4 relative' style={{flexFlow: 'column'}}>
                    <div className='flex w-full mt-2'>
                        <div className='mr-auto self-start' style={{flexFlow: 'column'}}>
                            {session?.user?.role === 1 && (
                                <div className='flex items-center'>
                                    <div className='mb-2 leading-[18px] text-[14px] font-medium'>
                                        <div 
                                            aria-checked={sharePostToTG} 
                                            aria-disabled='false' 
                                            className='flex items-center cursor-pointer select-none'
                                            aria-labelledby='post-to-telegram'
                                            role={'checkbox'}
                                            tabIndex={0}
                                            onClick={() => {
                                                shareToTelegram();
                                            }}
                                        >
                                            <input
                                                type="checkbox" 
                                                id='telegram' 
                                                checked={sharePostToTG}
                                                onChange={shareToTelegram}
                                                className='w-[16px] h-[20px] bg-reddit_dark-brighter' 
                                                style={{filter: 'invert(85%)'}}
                                            />
                                            <p className='ml-2'>Share this post on Telegram</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className='flex items-center'>
                                {canPostOnTwitter ? (
                                    <div className='mb-2 leading-[18px] text-[14px] font-medium'>
                                        <div
                                            aria-checked={sharePostToTwitter}
                                            aria-disabled='false'
                                            className='flex items-center cursor-pointer select-none'
                                            aria-labelledby='post-to-twitter'
                                            role={'checkbox'}
                                            tabIndex={0}
                                            onClick={() => {
                                                shareToTwitter();
                                            }}
                                        >
                                            <input 
                                                type="checkbox" 
                                                id='twitter' 
                                                checked={sharePostToTwitter} 
                                                onChange={shareToTwitter} 
                                                className='w-[16px] h-[20px] bg-reddit_dark-brighter'
                                                style={{filter: 'invert(85%)'}}
                                            />
                                            <p className='ml-2'>Share this post on Twitter</p>
                                        </div>
                                    </div>
                                ) : (
                                <>
                                    <Link 
                                        href={'/settings'}
                                        rel='noopener nofollow ugc' 
                                        target={'_blank'} 
                                        className='text-[14px] font-semibold leading-[18px] text-reddit_blue block mr-1'
                                    >
                                        Connect accounts to share your post
                                    </Link>
                                    <div className='relative'>
                                        <i 
                                            className='icon' 
                                            title='Connect a Twitter account in your User Settings. With a connected account you can choose to share new posts you make directly to Twitter.'>
                                                <AiOutlineInfoCircle className='text-reddit_text-darker' />
                                        </i>
                                    </div>
                                </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Submit;