import { useContext, useState } from 'react'
import { CommunityContext, CommunityContextProps } from './CommunityContext'
import ClickOutHandler from 'react-clickout-ts'
import { inputClass } from '../utils/Input'
import { buttonClass } from '../utils/Button'
import axios from 'axios'
import { useRouter } from 'next/router'
import { CloseIcon } from '../utils/SVG'
import { showErrMsg } from '../utils/validation/Notification'

function CommunityFormModal() {
  const { show, setShow } = useContext(CommunityContext) as CommunityContextProps;

  const initialState = {
    err: '',
    success: '',
  }
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const router = useRouter()
  const [name, setName] = useState('')
  const [loading,setLoading] = useState(false)
  const [status, setStatus] = useState(initialState)

  const create = async () => {
    try {
        setLoading(true)
      const data = { name }
      const res = await axios.post(server + '/communities', data, {
        withCredentials: true,
      })
      setShow(false)
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

  if (!show) {
    return null;
  }

  return (
    <div
      className={'fixed top-0 left-0 z-30 flex h-screen w-screen'}
      style={{ backgroundColor: 'rgba(25,25,25,.8' }}
    >
      <ClickOutHandler
        onClickOut={() => {
          setShow(false)
        }}
      >
        <div className="mx-auto flex self-center rounded-md border border-reddit_border bg-reddit_dark-brighter">
          <div className="relative w-[500px] self-center">
            <div className="flex px-2 py-4">
              <h1 className="font-semibold">Create a community</h1>
              <button className="right-0 pb-5" onClick={() => setShow(false)}>
                <div className="absolute right-2 mx-1">
                  <CloseIcon style={{ height: '16px', width: '16px' }} />
                </div>
              </button>
            </div>
            <hr className="mx-2 border-reddit_border pb-3" />
            <div className="p-2 pb-4">
              <p className="font-semibold">Name</p>
              <p className="text-[11px] text-reddit_text-darker">
                Community names including capitalization cannot be changed.
              </p>
            </div>
            <div className="p-2 pb-32">
              <div id="community name" className="mb-2">
                <input
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  className={`${inputClass} w-full border border-reddit_border p-[6px] placeholder:text-reddit_text-darker`}
                  placeholder="b/"
                  maxLength={21}
                />
                <p className="pl-[2px] pt-2 text-xs text-reddit_text-darker">
                  max 21 characters
                </p>
              </div>
              {status.err && showErrMsg(status.err)}
            </div>
            <div className="flex bg-[#343536] p-4 pb-12">
              <div className="absolute right-2">
                <button
                  onClick={() => setShow(false)}
                  className={`mr-2 py-1 px-4 ${buttonClass(true)}`}
                >
                  Cancel
                </button>
                <button onClick={() => create()} className={`py-1 ${buttonClass()}`}>
                  <p>Create a community</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </ClickOutHandler>
    </div>
  )
}

export default CommunityFormModal;
