import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { CommunityContext } from "../community/CommunityContext";

function BoardHeader(props: any) {
    const {communityAvatar,cover,loading,user_is_moderator}: any = useContext(CommunityContext);
    const [selectedFile,setSelectedFile] = useState(communityAvatar)
    const [change,setChange] = useState(false)
    const filePickerRef: any = useRef(null)

    const {community} = props

    const handleFileInputChange = (e: { target: { files: any; }; }) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    const previewFile = (file:any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setChange(true)
            setSelectedFile(reader.result)
        }
    }

    return(
        <>
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
                                    <Image src={selectedFile ? selectedFile : communityAvatar} alt='community header' className='rounded-full flex-none' layout="fill" />
                                )}
                            </div>
                        )}
                        {user_is_moderator && (
                            <div className="-top-4 relative ml-0 lg:ml-40">
                                <div className='w-[72px] h-[72px] rounded-full overflow-hidden border-4 relative border-white bg-reddit_blue'>
                                    {!loading && (
                                        <button onClick={() => filePickerRef.current.click()}>
                                            <Image src={selectedFile ? selectedFile : communityAvatar} alt='community header' className='rounded-full flex-none' layout="fill" />
                                        </button>
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
        </>
    );
}

export default BoardHeader;