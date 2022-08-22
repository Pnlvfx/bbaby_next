import axios from 'axios'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../auth/UserContext'
import { buttonClass } from '../../utils/Button'
import ClickOutHandler from "react-clickout-ts";

interface CommentFormProps {
  rootId: string
  parentId: string
  onSubmit: Function
  onCancel?: Function
  showAuthor: boolean
}

function CommentForm({
  rootId,
  parentId,
  onSubmit,
  onCancel,
  showAuthor
}: CommentFormProps) {
  const { session } = useContext(UserContext) as SessionProps;

  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const [commentBody, setCommentBody] = useState('')
  const [commentBodyLength, setCommentBodyLength] = useState(0)
  const [enableComment, setEnableComment] = useState(false)
  const [active,setActive] = useState(false);

  const postComment = async () => {
    try {
      const data = { body: commentBody, parentId, rootId }
      const res = await axios
        .post(server + '/comments', data, { withCredentials: true })
        .then((response) => {
          setCommentBody('')
          if (onSubmit) {
            onSubmit()
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
  }, [commentBodyLength])

  return (
    <>
      {session && showAuthor && ( //SHOW AUTHOR
        <div className="mb-2 self-center text-[13px]">
          <p className="self-center">
            Comment as{' '}
            <Link href={`/user/${session.user.username}`}>
              <a className="mt-[1px] self-center text-reddit_blue">
                {session.user.username}
              </a>
            </Link>
          </p>
        </div>
      )}
      <ClickOutHandler onClickOut={() => {
        setActive(false)
      }}>
      <form
      onClick={() => {
        setActive(true)
      }}
        className={`border border-reddit_border bg-reddit_dark-brighter rounded-md ${active && "border-reddit_text"}`}
        onSubmit={(e) => {
            e.preventDefault()
            postComment()
        }}
      >
        <textarea
          className="bg-reddit_dark-brighter p-2 h-[130px] outline-none max-h-[270px] min-h-[150px] w-full placeholder:text-sm placeholder:text-reddit_text-darker"
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
      </form>
      </ClickOutHandler>
    </>
  )
}

export default CommentForm;
