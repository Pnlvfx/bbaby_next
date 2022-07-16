import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { CommunityContext } from "../community/CommunityContext";

function BoardHeader(props: any) {
    const {communityAvatar,cover,loading,user_is_moderator,name,refreshCommunity}: any = useContext(CommunityContext);
    const [selectedFile,setSelectedFile] = useState(communityAvatar)
    const filePickerRef: any = useRef(null)
    const server = process.env.NEXT_PUBLIC_SERVER_URL

    const {community} = props

    const handleFileInputChange = (e: { target: { files: any; }; }) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    const previewFile = (file:any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setSelectedFile(reader.result)
        }
    }

    useEffect(() => {
        if (!selectedFile) return
        axios({
            method: "POST",
            url: `${server}/communities/${name}/change_avatar`,
            data: {image: selectedFile},
            headers: {'Content-Type': 'application/json'}
        }).then(() => {
            refreshCommunity()
            setSelectedFile(false)
        })
    },[selectedFile])

    return(
        <div className="z-10">
            <div className="h-48 bg-cover no-repeat" 
            style={{backgroundImage: `url("${cover}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'rgb(0,108,189)',
                    backgroundPosition: '50%',

                
                }}>
            </div>
                <div className='bg-reddit_dark-brighter self-center mx-auto'>
                    <div className='mx-5 flex'>
                        {!user_is_moderator && (
                            <div className='w-[72px] h-[72px] rounded-full overflow-hidden border-4 relative -top-4 border-white bg-reddit_blue ml-0 lg:ml-40'>
                                {!loading && (
                                    <Image src={communityAvatar} alt='community header' className='rounded-full flex-none' layout="fill" />
                                )}
                            </div>
                        )}
                        {user_is_moderator && (
                            <div className="-top-4 relative ml-0 lg:ml-40 cursor-pointer" onClick={() => filePickerRef.current.click()}>
                                <div className='w-[72px] h-[72px] rounded-full overflow-hidden border-4 relative border-white bg-reddit_blue'>
                                    {!loading && (
                                        <Image src={communityAvatar} alt='community_header' className='rounded-full flex-none' width={72} height={72}/>
                                    )}
                                </div>
                                <span className="text-xs font-bold">Update icon</span>
                                <input hidden type="file" name="image" id="file_up" ref={filePickerRef} onChange={handleFileInputChange} />
                            </div>
                        )}
                            <div className='pt-2 pl-4'>
                                <h1 className='text-2xl font-bold mx-auto'>{community}</h1>
                                <h2 className='text-reddit_text-darker text-sm mt-1'>b/{community}</h2>
                            </div>
                    </div>
                </div>
        </div>
    );
}

export default BoardHeader;