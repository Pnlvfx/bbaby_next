import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from '../../auth/UserContext';
import { buttonClass } from '../../utils/Button';
import ClickOutHandler from "react-clickout-ts";
import { postComment } from '../../API/commentAPI';

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
  const { session } = useSession();
  const [commentBody, setCommentBody] = useState('')
  const [commentBodyLength, setCommentBodyLength] = useState(0)
  const [enableComment, setEnableComment] = useState(false)
  const [active, setActive] = useState(false);

  const doPostComment = async () => {
    try {
      const create = await postComment(commentBody, parentId, rootId);
      setCommentBody('')
        if (onSubmit) {
          onSubmit()
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (commentBodyLength >= 1) {
      console.log(commentBodyLength)
      setEnableComment(true)
    }
  }, [commentBodyLength])

  // useEffect(() => {
  //   if (!commentBody) return;
  //   const urlify = () => {
  //     var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  //     return commentBody.replace(urlRegex, (url) => {
  //       return `<a href="${url}" target="_blank">${url}</a>`
  //     })
  //   }
  //   urlify()
  // }, [commentBody])

  return (
    <>
      {session && showAuthor && ( //SHOW AUTHOR
        <div className='mb-1'>
          <span className="text-[12px] leading-[18px]">
            Comment as{' '}
            <Link href={`/user/${session.user.username}`}>
              <a className="text-[12px] leading-[16px]  text-[#4fbcff]">
                {session.user.username}
              </a>
            </Link>
          </span>
        </div>
      )}
        <div className='left-[33px]'>
          <div className='relative'>
            <div
              className={`relative border solid border-reddit_border bg-reddit_dark-brighter rounded-[4px] ${active && "border-reddit_text"}`}
              onClick={() => {
                setActive(true)
              }}
              onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  doPostComment()
              }}
            >
              <ClickOutHandler onClickOut={() => {
                setActive(false)
              }}>
              <textarea
                className="bg-reddit_dark-brighter text-[16px] p-2 h-[130px] outline-none max-h-[270px] min-h-[150px] w-full placeholder:text-sm placeholder:text-reddit_text-darker pl-3"
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
            </div>
          </div>
        </div>
    </>
  )
}

export default CommentForm;
