import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../auth/UserContext'
import { buttonClass } from '../../utils/Button'
import ClickOutHandler from "react-clickout-ts";
import { postRequestHeaders } from '../../main/config';

interface CommentFormProps {
  rootId: string
  parentId: string
  onSubmit: Function
  onCancel?: Function
  showAuthor: boolean
}

const CommentForm = ({
  rootId,
  parentId,
  onSubmit,
  onCancel,
  showAuthor
}: CommentFormProps) => {
  const { session } = useContext(UserContext) as SessionProps;
  const [commentBody, setCommentBody] = useState('')
  const [commentBodyLength, setCommentBodyLength] = useState(0)
  const [enableComment, setEnableComment] = useState(false)
  const [active,setActive] = useState(false);

  const postComment = async () => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL
      const url = `${server}/comments`;
      const body = JSON.stringify({ body: commentBody, parentId, rootId })
      const res = await fetch(url, {
        method: 'POST',
        headers: postRequestHeaders,
        credentials: 'include',
        body,
      })
      const data = await res.json();
      if (res.ok) {
        setCommentBody('')
        if (onSubmit) {
          onSubmit()
        }
      } else {
        console.log(data?.msg)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (commentBodyLength >= 1) {
      setEnableComment(true)
    }
  }, [commentBodyLength])

  return (
    <>
      {session && showAuthor && ( //SHOW AUTHOR
        <span className="text-[12px] leading-[18px]">
          Comment as{' '}
          <Link href={`/user/${session.user.username}`}>
            <a className="text-[12px] leading-[16px]  text-[#4fbcff]">
              {session.user.username}
            </a>
          </Link>
        </span>
      )}
        <div className='left-[33px]'>
          <div className='relative'>
            <form
            onClick={() => {
              setActive(true)
            }}
              className={`relative border solid border-reddit_border bg-reddit_dark-brighter rounded-[4px] ${active && "border-reddit_text"}`}
              onSubmit={(e) => {
                  e.preventDefault()
                  postComment()
              }}
            >
              <ClickOutHandler onClickOut={() => {
                setActive(false)
              }}>
              <textarea
                className="bg-reddit_dark-brighter text-[16px] p-2 h-[130px] outline-none max-h-[270px] min-h-[150px] w-full placeholder:text-sm placeholder:text-reddit_text-darker"
                onChange={(e) => {
                  setCommentBody(e.target.value)
                  setCommentBodyLength(e.target.value.length)
                }}
                value={commentBody}
                placeholder={'What are your thoughts?'}
              />
              <div className="h-[34px] w-full bg-reddit_dark-brightest">
                <div className="text-right">
                  {!!onCancel && (
                    <button
                      className={`${buttonClass()} mr-4 border-none h-[24px] hover:bg-reddit_hover`}
                      onClick={(e) => onCancel()}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    disabled={!enableComment}
                    className={`my-1 mr-2 h-[24px] ${buttonClass()} ${
                      enableComment
                        ? 'text-opacity-100'
                        : 'cursor-not-allowed text-opacity-40'
                    }`}
                  >
                    <p>Comment</p>
                  </button>
                </div>
              </div>
              </ClickOutHandler>
            </form>
          </div>
        </div>
    </>
  )
}

export default CommentForm;
