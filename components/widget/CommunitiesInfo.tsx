import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { EditTextarea } from 'react-edit-text';
import Button from '../utils/Button'
import {MdOutlineAdminPanelSettings, MdOutlineModeEditOutline} from 'react-icons/md'
import moment from 'moment';
import Link from "next/link";
import AuthModalContext from "../auth/AuthModalContext";
import UserContext from "../auth/UserContext";
import LoaderPlaceholder from "../post/LoaderPlaceholder";
import Image from "next/image";
import { CommunityContext } from "../community/CommunityContext";

function CommunitiesInfo(props:any) {
    const provider = useContext(UserContext)
    const {session}:any = provider
    const router = useRouter()
    const {communityAvatar,name,description,createdAt,loading,user_is_moderator}:any = useContext(CommunityContext)
    const {community} = props
    const [descr,setDescr] = useState('')

    const [commit,setCommit] = useState(false)
    

    const {user} = session ? session : {user: {username: ''}}
    const {setShow}:any = useContext(AuthModalContext)
    
    useEffect(() => {
        if(commit) {
            const server = process.env.NEXT_PUBLIC_SERVER_URL
            const data = {descr, name}
            axios.post(server+'/communities/edit/description',data,{withCredentials:true}).then(response => {
                setCommit(false)
            })
        }
    },[commit])

    //TEXTAREA
    const handleSave = ({name,value,previousValue}:any) => {
        //alert(name + value + previousValue)
        setDescr(value)
        setCommit(true)
    }
    //
    
    return (
      <div className='bg-reddit_dark-brighter shadow-lg w-[310px] h-96 ml-2 rounded-md border border-reddit_border mb-5'>
          <div className='p-2'>
              <div className="flex text-reddit_text-darker">
                <div className="p-1 self-center">
                    {loading && <LoaderPlaceholder extraStyles={{height: '15px'}}/>}
                    {!loading && (
                        <h1 className="font-bold text-[15px]">About community</h1>
                    )}
                </div>
                    {user_is_moderator && (
                    <Link href={`/b/${community}/about/modqueue`}>
                        <a className="ml-auto self-center">
                            <div className="flex mt-1 self-center">
                                <MdOutlineAdminPanelSettings className="w-6 h-6 self-center" />
                                <span className="text-xs p-1 font-bold self-center">MOD TOOLS</span>
                            </div>
                        </a>
                    </Link>
                )}
              </div>
                <div>
                    {loading && (
                        <LoaderPlaceholder extraStyles={{height: '32px'}} />
                    )}
                    {!loading && (
                        <Link href={`/b/${community}`}>
                            <a className='flex pt-3'>
                                <div className=''>
                                    <Image unoptimized src={communityAvatar} alt='' height={'32px'} width={'32px'} className="rounded-full flex-none"/>
                                </div>
                                <h3 className="h-12 pl-2 mt-[4px]">b/{name}</h3>
                            </a>
                        </Link>
                    )}
                </div>
              {user_is_moderator && !loading && (
                    <div className="flex hover:border border-reddit_text self-center">
                                <div className="overflow-hidden self-center bg-black w-full">
                                    <EditTextarea
                                    name={'description'}
                                    defaultValue={description}
                                    onSave={handleSave}
                                    inputClassName={'bg-reddit_dark-brighter break-words leading-6 overflow-hidden outline-none'} 
                                    className='bg-reddit_dark-brighter break-words leading-6 overflow-hidden outline-none'
                                    />
                                </div>
                                <div className="text-reddit_text-darker self-center">
                                    <MdOutlineModeEditOutline className="w-6 h-6 self-center"/>
                                </div>
                    </div>
              )} 
              {!user_is_moderator && !loading && (
                  <div className="flex">
                    <div className="overflow-hidden mb-2">
                        <span className='bg-reddit_dark-brighter break-words leading-6 overflow-hidden resize-none outline-none'>{description}</span>               
                    </div>
                </div>
              )}

              <div>
                  <hr className="border-reddit_border"></hr>
                  <div className="py-3 text-sm">
                      Created {moment(createdAt).format('MMM DD, YYYY')}
                  </div>
                  <hr className="border-reddit_border"/>
              </div>
              <div className="">
                  {!user && (
                      <Button onClick={() => {setShow('login')}} className='w-full py-1 mt-3 mb-4'>Create a Post</Button>
                  )}
                  {user && (
                    <Link href={`/submit?with_community=${name}`} as={'/submit'}>
                        <a>
                            <Button className='w-full py-1 mt-3 mb-4'>Create a Post</Button>
                        </a>
                    </Link>
                  )}
              </div>
              <hr className="border-reddit_border"/>
          </div>
      </div>
    )
  }
  
  export default CommunitiesInfo;