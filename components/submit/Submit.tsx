import axios from 'axios';
import React, {useContext, useState,useEffect} from 'react'
import AuthModalContext from '../auth/AuthModalContext';
import Button from '../utils/Button';
import { useRouter } from 'next/router';
import TextareaAutosize from 'react-textarea-autosize';
import ClickOutHandler from 'react-clickout-ts';
import Image from 'next/image';
import SubmitButton from './submitutils/SubmitButton';
import {FaTrashAlt} from 'react-icons/fa'
import {HiOutlineDocumentText} from 'react-icons/hi'
import ShowTimeMsg from '../utils/notification/ShowTimeMsg';
import { AddImage } from '../utils/SVG';
import CommunityDropdown from './submitutils/CommunityDropdown';
import UserContext from '../auth/UserContext';
import { SubmitContext, SubmitContextProvider } from './submitutils/SubmitContext';

type SubmitProps = {
    translatedTweet?: string
    community?: string | string[]
}

function Submit({translatedTweet,community}:SubmitProps) {
    const provider = useContext(UserContext)
    const {session} = provider
    const authModalContext = useContext(AuthModalContext)
    const [startTyping,setStartTyping] = useState(false)
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    ///image
    const [showDeleteOptions,setShowDeleteOptions] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [isImage,setIsImage] = useState(false)
    //ONLY FOR VISUALIZATION
    const [imageWidth,setImageWidth] = useState()
    const [imageHeight, setImageHeight] = useState()
    //
    const [loading,setLoading] = useState(false)
    // SHARE ON TELEGRAM
    const [sharePostToTG,setSharePostToTG] = useState(session?.user.role === 1 ? true : false)
    const [sharePostToTwitter,setSharePostToTwitter] = useState(session?.user.role ? true : false)
    const shareToTelegram = () => {
        setSharePostToTG(!sharePostToTG)
    }
    //SHARE TO TWITTER
    const shareToTwitter = () => {
        setSharePostToTwitter(!sharePostToTwitter)
    }
    //
    //community
    const [activeClassTitle, setActiveClassTitle] = useState('border-reddit_dark-brightest')
    const [activeClassBody, setActiveClassBody] = useState('border-reddit_dark-brightest')
    //community dropdown
    const [enablePost,setEnablePost] = useState('text-opacity-40 cursor-not-allowed')
   
    const [selectedCommunity,setSelectedCommunity] = useState<string | string[]| undefined>('')
    const [communityIcon,setCommunityIcon] = useState('')
    const router = useRouter()

    useEffect(() => {
        if(startTyping && selectedCommunity) {
            setEnablePost('text-opacity-100')
        }
    },[selectedCommunity,startTyping])

     //get all community info
     useEffect(() => {
        if(selectedCommunity) {
            const server = process.env.NEXT_PUBLIC_SERVER_URL
            const name = selectedCommunity
            axios.get(server+'/communities/'+name,{withCredentials:true})
            .then(response => {
                setCommunityIcon(response.data.communityAvatar)
            })
        }
    },[selectedCommunity])
   
    useEffect(() => {
        if(community) {
            setSelectedCommunity(community)
        }
    },[community])

    if(startTyping) {
        const textarea:any = document.querySelector('textarea')
        const count:any = document.getElementById('count')
        textarea.onkeyup = (e: { target: { value: string | any[]; }; }) => {
            count.innerHTML = (0 + e.target.value.length) + '/300';
        }
    }

    let imageId = ''
    let image = ''
    //TWITTER ERROR 
    const [value,setValue] = useState('')
    //
    const createPost = async() => {
        try {
            setLoading(true)
            if(isImage) {
                const data = selectedFile
                const server = process.env.NEXT_PUBLIC_SERVER_URL
                const res = await axios.post(server+'/posts/image', {
                data,
                headers: {'Content-type': 'application/json',withCredentials:true}
                })
                const {url} = await res.data
                imageId = await res.data.imageId
                image = await url
            }
            const data = {title,body,community:selectedCommunity,communityIcon,image,isImage,imageHeight,imageWidth,imageId,sharePostToTG,sharePostToTwitter};
            const server = process.env.NEXT_PUBLIC_SERVER_URL
            const res =  await axios.post(server+'/posts', data, {withCredentials:true})
            if (session?.user.role === 0) {
                const {_id,community} = await res.data
                router.push('/b/'+community+'/comments/'+_id)
            } else {
                setValue('OK')
                setLoading(false)
            }
        } catch (err:any) {
            if(err.response.status === 401) {
                authModalContext.setShow('login');
            } else if (err?.response?.data?.msg) {
            setValue(err.response.data.msg)
            setLoading(false)
            }
        }
    }
    //

    //////MY TWEEEEEEEEET
    useEffect(() => {
        if (translatedTweet) {
            setTitle(translatedTweet)
        }
    },[translatedTweet])
    //

  return (
    <div className={`${loading && ('opacity-40')}`}>
        <div className='border-b border-reddit_border flex mb-4'>
            <h1 className='mb-3 pt-4 text-lg font-semibold'>Create a Post</h1>
        </div>
            <CommunityDropdown selectedCommunity={selectedCommunity} setSelectedCommunity={setSelectedCommunity} />
                <div className='bg-reddit_dark-brighter rounded-md flex-none mt-2'>
                    <div className='flex mb-3 rounded-md'>
                        <button className='text-sm border-r border-reddit_border flex border-b-2 px-8 py-1 hover:bg-reddit_hover'>
                            <HiOutlineDocumentText className='w-6 h-6 mt-2'/>
                            <h1 className='py-3 font-semibold'>Post</h1>
                        </button>
                        <button className='opacity-20 text-sm border-r border-reddit_border flex border-b-2 px-3 py-1 hover:bg-reddit_hover'>
                            <div className='mt-2 mr-1'>
                            <AddImage />
                            </div>
                            <h1 className='py-3 font-semibold'>Images & Video</h1>
                        </button>
                    </div>
                    {!loading && (
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
                        
                            <div onClick={() => setActiveClassBody('hover:border border-reddit_text')} className={'mx-4 mt-2 border border-reddit_border rounded-md mb-3 ' +activeClassBody}>
                                <div className='bg-reddit_dark-brightest h-10 overflow-hidden'>
                                    <SubmitButton setImageHeight={setImageHeight} setImageWidth={setImageWidth} title={title} setTitle={setTitle} setSelectedFile={setSelectedFile} setIsImage={setIsImage} />    
                                </div>
                                {!selectedFile && (
                                     <textarea 
                                     className='placeholder-reddit_text-darker w-full text-sm outline-none
                                     bg-reddit_dark-brighter p-2 min-h-[135px]'
                                     placeholder={'Text (optional)'}
                                     onChange={e => setBody(e.target.value)}
                                     value={body}/>
                                )}
                                {selectedFile && imageHeight && imageWidth && (
                                    <ClickOutHandler onClickOut={() => setShowDeleteOptions(false)}>
                                        <div className='relative rounded-lg my-9 mx-5'>
                                        {showDeleteOptions && (
                                            <div onClick={() => {
                                                setSelectedFile(null)
                                                setIsImage(false)
                                                setShowDeleteOptions(false)
                                                }} className='border border-reddit_border mx-auto w-9 h-8 hover:bg-reddit_dark-brightest cursor-pointer'>
                                            <FaTrashAlt className='text-reddit_text-darker px-2 py-1 self-center mx-auto w-full h-full' />
                                            </div>
                                        )}
                                        <div onClick={() => {
                                                setShowDeleteOptions(true)
                                            }}>
                                            <div className='rounded-lg mx-auto border border-reddit_border hover:border-4 hover:border-reddit_text'>
                                                <Image 
                                                src={selectedFile}
                                                alt={'DisplayImage'}
                                                height={`${imageHeight}px`}
                                                width={`${imageWidth}px`}
                                                />
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <textarea className='bg-reddit_dark-brighter' />
                                        </div>
                                    </div>
                                    </ClickOutHandler>
                                )}
                            </div>
                            </ClickOutHandler>
                                <div className='h-12 mb-4 border-b border-reddit_border mx-3'>
                                </div>
                                    <div className='text-right pb-4 mx-4'>
                                        <Button outline='true' className='px-4 py-1 mr-2 opacity-20'>Save Draft</Button>
                                        <Button onClick={() => {
                                        createPost()
                                        }} className={"px-4 py-1 "+enablePost}>Post</Button>
                                    </div>
                        </>
                    )}
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
                    {value && (
                        <ShowTimeMsg value={value} setValue={setValue} />
                    )}
    </div>
  )
}

export default Submit;