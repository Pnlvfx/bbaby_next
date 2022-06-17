import axios from 'axios';
import {useContext, useState,useEffect} from 'react'
import AuthModalContext from '../auth/AuthModalContext';
import Button from '../utils/Button';
import Input from '../utils/Input';
import { useRouter } from 'next/router';
import TextareaAutosize from 'react-textarea-autosize';
import CommunityList from './submitutils/CommunityList';
import ClickOutHandler from 'react-clickout-handler';
import Image from 'next/image';
import {MdOutlineCircle} from 'react-icons/md'
import SubmitButton from './SubmitButton';
import {FaTrashAlt} from 'react-icons/fa'
import {HiChevronDown,HiOutlineDocumentText} from 'react-icons/hi'
import ShowTimeMsg from '../utils/notification/ShowTimeMsg';
import { AddImage } from '../utils/SVG';

function Submit(props) {
    
    const {translatedTweet,userRole} = props

    const authModalContext = useContext(AuthModalContext)

    const [startTyping,setStartTyping] = useState(false)

    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');

    const [newPostId,setNewPostId] = useState(null);
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
    const [sharePostToTG,setSharePostToTG] = useState(userRole ? true : false)
    const [sharePostToTwitter,setSharePostToTwitter] = useState(userRole ? true : false)

    const shareToTelegram = () => {
        setSharePostToTG(!sharePostToTG)
    }

    //SHARE TO TWITTER
    const shareToTwitter = () => {
        setSharePostToTwitter(!sharePostToTwitter)
    }
    //

    //community
    const [activeClass, setActiveClass] = useState('border-reddit_dark-brightest')
    const [activeClassTitle, setActiveClassTitle] = useState('border-reddit_dark-brightest')
    const [activeClassBody, setActiveClassBody] = useState('border-reddit_dark-brightest')
    //community dropdown
    const [show,setShow] = useState(false)
    const [enablePost,setEnablePost] = useState('text-opacity-40 cursor-not-allowed')
   
    const [allCommunity,setAllCommunity] = useState([]);
    const [selectedCommunity,setSelectedCommunity] = useState('')
    const community = selectedCommunity
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
        if(props.community) {
            setSelectedCommunity(props.community)
        }
    },[props.community])

    useEffect(() => {
        const server = process.env.NEXT_PUBLIC_SERVER_URL
        axios.get(server+'/communities?limit=11', {withCredentials:true})
        .then(response => setAllCommunity(response.data));
    }, []);

    if(startTyping) {
        const textarea = document.querySelector('textarea')
        const count = document.getElementById('count')
        textarea.onkeyup = (e) => {
        count.innerHTML = (0 + e.target.value.length) + '/300';
    }
    }

    //console.log(selectedFile)
    let imageId = null
    let image = null
    //create a post
    //TWITTER ERROR 
    const [value,setValue] = useState()
    //
    const createPost = async() => {
        try {
            setLoading(true)
            if(isImage) {
                const data = selectedFile
                const server = process.env.NEXT_PUBLIC_SERVER_URL
                const res =
                await axios.post(server+'/posts/image', {
                data,
                headers: {'Content-type': 'application/json',withCredentials:true}
                })
                const {url} = await res.data
                imageId = await res.data.imageId
                image = await url
            }
            const data = {title,body,community,communityIcon,image,isImage,imageHeight,imageWidth,imageId,sharePostToTG,sharePostToTwitter};
            const server = process.env.NEXT_PUBLIC_SERVER_URL
            const res =  await axios.post(server+'/posts', data, {withCredentials:true})
            if (!userRole) {
                const {_id} = await res.data
                setNewPostId(_id);
            } else {
                setValue('OK')
                setLoading(false)
            }
        } catch (err) {
            if(err.response.status === 401) {
                authModalContext.setShow('login');
            }
        }
    }
    //

    // set community directly to selected (happens only from communitiesinfo widget)
    useEffect(() => {
        if(router.query.with_community)
        setSelectedCommunity(router.query.with_community)
    },[])

    //////MY TWEEEEEEEEET
    useEffect(() => {
        if (translatedTweet) {
            setTitle(translatedTweet)
        }
    },[translatedTweet])
    //
    

    if(newPostId) {
        router.push('/b/'+community+'/comments/'+newPostId)
    }

  return (
    <div className={`${loading && ('opacity-40')}`}>
        <div className='border-b border-reddit_border flex mb-4'>
            <h1 className='mb-3 pt-4 text-lg font-semibold'>Create a Post</h1>
        </div>
            <ClickOutHandler onClickOut={() => {
                setShow(false)
                setActiveClass('border-reddit_dark-brightest')}}>
                <div className='w-[300px]'>
                <button value={'choose a community'} onClick={() => {
                    setActiveClass('hover:border border-reddit_text')
                    setShow(!show)
                }} className={'border border-reddit_border flex bg-reddit_dark-brighter h-[42px] rounded-md '+activeClass}>
                        <MdOutlineCircle className='w-10 h-10 text-reddit_text-darker mx-2 '/>
                        <Input className='w-full h-full outline-none placeholder:text-gray-300 text-sm'
                        placeholder={'Choose a community'}
                        value={selectedCommunity}
                        readOnly={true}
                        />
                        <HiChevronDown className='text-reddit_text-darker w-10 h-10 ml-12 mr-2'/>
                </button>
               
                {show && (
                        <div className={' border border-reddit_text absolute bg-reddit_dark-brighter z-10 text-reddit_text overflow-hidden '}>
                            <div className='w-[300px]'>
                                {allCommunity.map(community => (
                                    <CommunityList key={community._id} {...community} setSelectedCommunity={setSelectedCommunity} setActiveClass={setActiveClass} setShow={setShow} />
                                
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                </ClickOutHandler>
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
                            maxLength="300"
                            type='text'
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
                                        <div className='' onClick={() => {
                                                setShowDeleteOptions(true)
                                            }}>
                                            <div className='rounded-lg object-contain mx-auto border border-reddit_border hover:border-4 hover:border-reddit_text'>
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
                                            {userRole && (
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