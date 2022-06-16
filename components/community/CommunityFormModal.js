import { useContext, useState } from "react"
import {CommunityContext} from './CommunityContext'
import ClickOutHandler from 'react-clickout-handler'
import Input from "../utils/Input";
import Button from "../utils/Button";
import axios from "axios";
import { useRouter } from "next/router";
import { CloseIcon } from "../utils/SVG";

function CommunityFormModal() {

    const {show,setShow} = useContext(CommunityContext)
    const visibleClass = show ? 'block' : 'hidden';
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const router = useRouter()

    const [name,setName] = useState('');

    if (!show) {
        return null
    }


    function create() {
        const data = {name};
        axios.post(server+'/communities', data, {withCredentials:true})
            .then(() => {
                router.push('/b/'+name);
                setShow(false);
            })
    }


  return (
    <div className={'w-screen h-screen fixed top-0 left-0 z-30 flex '+ visibleClass} style={{backgroundColor:'rgba(0,0,0,.6'}}>
        <ClickOutHandler onClickOut={() => {
            setShow(false)
        }}>
        <div className='flex w-auto h-auto border border-reddit_border bg-reddit_dark-brighter self-center mx-auto rounded-md'>
            <div className="mx-auto self-center relative w-[500px]">
                <div className="flex px-2 py-4">
                    <h1 className="font-semibold">Create a community</h1>
                    <button className="right-0 pb-5" onClick={() => setShow(false)}>
                        <div className="mx-1 right-2 absolute">
                            <CloseIcon style={{height:'16px', width: '16px'}} />
                        </div>
                    </button>
                </div>
                <hr className="pb-3 border-reddit_border mx-2"/>
                    <div className="p-2 pb-4">
                    <h2 className="font-semibold">Name</h2>
                    <h3 className="text-xs text-reddit_text-darker">Community names including capitalization cannot be changed.</h3>
                    </div>
                    <div className="p-2 pb-32">
                        <div id="community name" className="pb-6">
                        <Input value={name} onChange={ev => setName(ev.target.value)} className=' p-[6px] w-full placeholder:text-reddit_text-darker border border-reddit_border' placeholder='b/' maxLength='21' />
                        <h1 className="text-xs pl-[2px] pt-2 text-reddit_text-darker">max 21 characters</h1>
                        </div>
                    </div>
                    <div className="bg-[#343536] pb-12 flex p-4">
                        <div className="absolute right-2">
                            <Button onClick={() => setShow(false)} outline className='py-1 px-4 mr-2'>Cancel</Button>
                            <Button onClick={() => create()} className='py-1'>Create a community</Button>
                        </div>
                    </div>
            </div>
        </div>
        </ClickOutHandler>
    </div>
  )
}

export default CommunityFormModal;