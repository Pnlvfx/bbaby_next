import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession } from '../../auth/UserContext'
import { buttonClass } from '../../utils/buttons/Button'
import ClickOutHandler from 'react-clickout-ts'
import { postComment } from '../../API/commentAPI'
import { useCommentContext } from './RootCommentContext'

interface CommentFormProps {
  rootId: string
  parentId: string
  onCancel?: Function
  showAuthor: boolean
}

const CommentForm = ({ rootId, parentId, onCancel, showAuthor }: CommentFormProps) => {
  const { session } = useSession()
  const [commentBody, setCommentBody] = useState('')
  const [commentBodyLength, setCommentBodyLength] = useState(0)
  const [enableComment, setEnableComment] = useState(false)
  const [active, setActive] = useState(false)
  const { getComments } = useCommentContext()

  const doPostComment = async () => {
    try {
      await postComment(commentBody, parentId, rootId)
      setCommentBody('')
      getComments()
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
      {session?.user && showAuthor && (
        <div className="mx-1 mb-1">
          <span className="text-[16px] leading-[18px] lg:text-[12px]">
            Comment as{' '}
            <Link className="text-[16px] leading-[16px] text-[#4fbcff] lg:text-[12px]" href={`/user/${session.user.username.toLowerCase()}`}>
              {session.user.username}
            </Link>
          </span>
        </div>
      )}
      <div className="left-[33px]">
        <div className="relative">
          <div
            className={`solid relative mt-2 rounded-[4px] border border-reddit_border bg-reddit_dark-brighter ${active && 'border-reddit_text'}`}
            onClick={() => {
              setActive(true)
            }}
          >
            <ClickOutHandler
              onClickOut={() => {
                setActive(false)
              }}
            >
              <textarea
                className="h-[130px] max-h-[270px] min-h-[150px] w-full bg-reddit_dark-brighter p-2 pl-3 text-[16px] outline-none placeholder:text-reddit_text-darker lg:placeholder:text-sm"
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
                    <button className={`${buttonClass()} mr-4 h-[24px] border-none hover:bg-reddit_hover`} onClick={(e) => onCancel()}>
                      Cancel
                    </button>
                  )}
                  <button
                    disabled={!enableComment}
                    onClick={doPostComment}
                    className={`my-1 mr-2 h-[24px] ${buttonClass()} ${enableComment ? 'text-opacity-100' : 'cursor-not-allowed text-opacity-40'}`}
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

export default CommentForm
