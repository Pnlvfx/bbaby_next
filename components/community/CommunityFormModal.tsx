import { useContext, useState } from 'react';
import { CommunityContext, CommunityContextProps } from './CommunityContext';
import ClickOutHandler from 'react-clickout-ts';
import { buttonClass, Spinner } from '../utils/Button';
import Router from 'next/router';
import { CloseIcon, PrivateCommunity, PublicCommunity } from '../utils/SVG';
import { showErrMsg } from '../utils/validation/Notification';
import { postRequestHeaders } from '../main/config';
import CommunityFormType from './CommunityFormType';

const CommunityFormModal = () => {
  const { show, setShow } = useContext(CommunityContext) as CommunityContextProps;

  const initialState = {
    err: '',
    success: '',
  }

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
      if (!res.ok) {
        const error = await res.json();
        setStatus({err: error?.msg, success: ''})
        setLoading(false);
      } else {
        setShow(false);
        Router.push({
          pathname: `/b/${name.toLowerCase()}`,
          query: {new_community : true}
      }, `/b/${name.toLowerCase()}`)
      }
    } catch (err) {
        setLoading(false);
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
    <div className={'bg-[rgba(28,28,28,.9)] items-center box-border flex h-full overflow-auto pt-[75px] pr-[30px] pb-5 pl-[30px] fixed top-0 z-50 w-full'} >
      <ClickOutHandler
        onClickOut={() => {
          close()
        }}
      >
        <div aria-modal='true' className="rounded-md border m-auto pointer-events-auto z-50 border-[#343536] bg-reddit_dark-brighter">
          <div className='flex pointer-events-none'>
            <div className='self-center rounde-md flex overflow-y-auto max-h-[100vh] max-w-[568px] relative w-[fit-content] pointer-events-auto'>
              <div className='flex items-center box-border p-4 relative rounded-b-md flex-1 m-0 max-w-[100vw] max-h-[100%] overflow-y-auto'>
                <div className='max-w-[492px] max-h-[100%]'>
                  <h1 className="font-medium text-[16px] leading-5 border-b border-solid border-reddit_border mb-4 pb-4 flex justify-between">
                    Create a community
                    <CloseIcon onClick={() => close()} className='w-4 h-4 ml-auto cursor-pointer overflow-hidden leading-5 text-[16px] ' />
                  </h1>
                  <div className='flex flex-col mb-[30px]' style={{flexWrap: 'wrap'}}>
                    <div className="mb-[-4] max-w-[100%] flex flex-col mr-2">
                      <h2 className="font-medium text-[16px] leading-5 flex- mb-1">Name</h2>
                      <p className="text-[12px] leading-4 text-reddit_text-darker">
                        <span className='w-full'>
                          Community names including capitalization cannot be changed.
                        </span>
                      </p>
                    </div>
                    <div id="community name" className="items-start mt-3 flex-col flex flex-grow justify-end">
                      <span className='text-reddit_text-darker relative top-[26px] left-3'>b/</span>
                      <input
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                        className={`max-h-[37px] pt-1 pl-6 bg-reddit_dark-brighter border border-reddit_border box-border h-12 mb-2 rounded pb-1 pr-6 w-full text-[14px] md:text-[16px] leading-[21px]`}
                        maxLength={21}
                        type={'text'}
                      />
                      <div className="pt-1 text-xs text-reddit_text-darker mb-1">
                        21 Characters remaining
                      </div>
                    </div>
                  </div>
                  <div className='mt-[-32px] mb-4 leading-4 text-[12px] pt-1 text-right flex'>
                    {status.err && showErrMsg(status.err)}
                  </div>
                  <div className='flex-col mb-[30px] flex'>
                    <div className='max-w-[100%] mb-[-4px] flex flex-col mr-2'>
                      <h3 className='text-[16px] font-medium leading-5 flex mb-1'>Community type</h3>
                    </div>
                    <div className='items-start mt-3 flex-col flex flex-grow justify-end'>
                      <div aria-label='type' role={'radiogroup'}>
                        <input type={'hidden'} value={''} />
                        <CommunityFormType
                          text={{
                            title: 'Public',
                            body: 'Anyone can view, post and comment to this community.'
                          }}
                          icon={<PublicCommunity className='w-4 h-4 mr-1' />}
                          checked={true}
                        />
                        <CommunityFormType
                          text={{
                            title: 'Private',
                            body: 'Only approved users can view and submit to this community.'
                          }}
                          icon={<PrivateCommunity className='w-4 h-4 mr-1' />}
                          checked={false}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#343536] p-4 mt-4 mb-[-16px] mx-[-16px] flex justify-end rounded-br">
                    <button
                      role={'button'}
                      tabIndex={0}
                      onClick={() => setShow(false)}
                      className={`mr-2 h-[32px] w-[80px] ${buttonClass(true)}`}
                    >
                      Cancel
                    </button>
                    <button
                      role={'button'}
                      tabIndex={0}
                      disabled={loading} 
                      onClick={() => create()} 
                      className={`w-[160px] h-[32px] ${buttonClass()}`}
                    >
                      {loading && <Spinner />}
                      {!loading && <p>Create a community</p>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClickOutHandler>
    </div>
  )
}

export default CommunityFormModal;
