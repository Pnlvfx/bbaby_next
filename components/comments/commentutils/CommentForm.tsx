import axios from 'axios';
import Link from 'next/link';;
import {useContext, useEffect, useState} from 'react'
import UserContext from '../../auth/UserContext';
import { buttonClass } from '../../utils/Button';
import Textarea from '../../utils/Textarea';


interface CommentFormProps {
    showAuthor: boolean;
    rootId: string
    parentId: string
    onSubmit: Function
    onCancel?: Function
}

function CommentForm({showAuthor,rootId,parentId,onSubmit,onCancel}:CommentFormProps) {
    const {session} = useContext(UserContext)

    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const [commentBody,setCommentBody] = useState('');
    const [commentBodyLength,setCommentBodyLength] = useState(0);
    const [enableComment,setEnableComment] = useState(false);

    const postComment = async(e:any) => {
        e.preventDefault();
        try {
        const data = {body:commentBody, parentId, rootId};
        const res = await axios.post(server+'/comments', data, {withCredentials:true})
            .then(response => {
            setCommentBody('');
            if(onSubmit) {
                onSubmit();
            }    
        })
        } catch (err) {
            console.log(err)
            // if(err.response.status === 401) { ///NOW WE PREVENT TO POST NOT USER CLIENT SIDE
            //     authModalContext.setShow('login');
            // }
        }
    }

    useEffect(() => {
        if (commentBodyLength >= 1) {
            setEnableComment(true)
        }
    },[commentBodyLength])

  return (
    <>
        {session && showAuthor && (
            <div className='mb-2 text-[13px] self-center'>
                <p className='self-center'>Comment as <Link href={`/user/${session.user.username}`}> 
                    <a className='text-reddit_blue mt-[1px] self-center'>{session.user.username}</a> 
                    </Link>
                </p>
            </div>
        )}
        <form onSubmit={e => postComment(e)}>
            <Textarea
                className="w-full h-[150px] border-reddit_border min-h-[150px] max-h-[270px] placeholder:text-sm placeholder:text-reddit_text-darker"
                onChange={(e:any) => {
                    setCommentBody(e.target.value)
                    setCommentBodyLength(e.target.value.length)
                }}
                value={commentBody} 
                placeholder={'What are your thoughts?'} />
            <div className='bg-reddit_dark-brightest h-28px] w-full mb-3'>
                <div className="text-right">
                    {!!onCancel && (
                        <button className={`${buttonClass()} p-1 mr-4 hover:bg-reddit_hover border-none`} onClick={(e) => onCancel()}>Cancel</button>
                    )}
                    <button disabled={!enableComment} className={`p-1 my-1 mr-4 ${buttonClass()} ${enableComment ? "text-opacity-100" : "text-opacity-40 cursor-not-allowed"}`}>
                        <p>Comment</p>
                    </button>
                </div>
            </div>
        </form> 
    </>
  )
}

export default CommentForm;