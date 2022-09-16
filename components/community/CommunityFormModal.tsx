import { useContext, useState } from 'react'
import { CommunityContext, CommunityContextProps } from './CommunityContext'
import ClickOutHandler from 'react-clickout-ts'
import { inputClass } from '../utils/Input'
import { buttonClass, Spinner } from '../utils/Button'
import { useRouter } from 'next/router'
import { CloseIcon } from '../utils/SVG'
import { showErrMsg } from '../utils/validation/Notification'
import { postRequestHeaders } from '../main/config'

const CommunityFormModal = () => {
  const { show, setShow } = useContext(CommunityContext) as CommunityContextProps;

  const initialState = {
    err: '',
    success: '',
  }
  const router = useRouter()
  const [name, setName] = useState('')
  const [loading,setLoading] = useState(false)
  const [status, setStatus] = useState(initialState)

  const create = async () => {
    try {
      setLoading(true)
      const server = process.env.NEXT_PUBLIC_SERVER_URL;
      const url = `${server}/communities`;
      const body = JSON.stringify({ name })
      const res = await fetch(url, {
        method: 'POST',
        body,
        headers: postRequestHeaders,
        credentials: 'include'
      });
      setShow(false);
      router.push({
        pathname: `/b/${name}`,
        query: {new_community : true}
    }, `/b/${name}`)
    } catch (err:any) {
        err.response.data.msg &&
        setStatus({err: err.response.data.msg, success: ""})
        setLoading(false)
    }
  }

  const close = async () => {
    setShow(false)
    setName('')
    setLoading(false)
    setStatus(initialState)
  }

  if (!show) {
    return null;
  }

  return (
    <div
      className={'fixed top-0 left-0 z-30 flex items-center justify-center h-screen w-screen'}
      style={{ backgroundColor: 'rgba(25,25,25,.8' }}
    >
      <ClickOutHandler
        onClickOut={() => {
          close()
        }}
      >
        <div className="rounded-md border border-reddit_border bg-reddit_dark-brighter w-[88%]  max-w-[525px]">
          <div className='mx-3'>
            <div className="flex my-4 items-center">
                <p className="font-semibold">Create a community</p>
                <button className="ml-auto" onClick={() => close()}>
                    <CloseIcon style={{ height: '16px', width: '16px' }} />
                </button>
              </div>
              <hr className="border-reddit_border mb-3" />
              <div className="mb-4">
                <p className="font-semibold">Name</p>
                <p className="text-[11px] text-reddit_text-darker">
                  Community names including capitalization cannot be changed.
                </p>
              </div>
                <div id="community name" className="mb-32">
                  <input
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    className={`${inputClass} w-full border border-reddit_border py-[5px] placeholder:text-reddit_text-darker`}
                    placeholder=" b/"
                    maxLength={21}
                  />
                  <p className="mt-2 text-xs text-reddit_text-darker mb-1">
                    max 21 characters
                  </p>
                  {status.err && showErrMsg(status.err)}
                </div>
                </div>
              <div className="flex bg-[#343536] p-4 items-center justify-end">
                  <button
                    onClick={() => setShow(false)}
                    className={`mr-2 h-[32px] w-[80px] ${buttonClass(true)}`}
                  >
                    Cancel
                  </button>
                  <button disabled={loading} onClick={() => create()} className={`w-[160px] h-[32px] ${buttonClass()}`}>
                    {loading && <Spinner />}
                    {!loading && <p>Create a community</p>}
                  </button>
              </div>
        </div>
      </ClickOutHandler>
    </div>
  )
}

export default CommunityFormModal;
