import Link from 'next/link';
import { useSession } from '../../auth/UserContext';
import { postRequestHeaders } from '../../main/config';
import { CloseIcon } from '../SVG';

const CookieConsent = () => {
  const {session, setSession} = useSession();

  const eu_cookie = async (status: boolean) => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL;
      const url = `${server}/eu_cookie`;
      const body = JSON.stringify({status});
      const res = await fetch(url, {
        method: 'POST',
        headers: postRequestHeaders,
        credentials: 'include',
        body
      });
      if (res.ok) {
        const data = await res.json();
        setSession({...session, eu_cookie: data});
      }
    } catch (err) {
      
    }
  }

  return (
    <>
    <div className={'hidden md:block'}>
      <div className="fixed bottom-0 z-30 flex w-full rounded-sm border border-reddit_text-darker bg-reddit_dark-brighter font-bold lg:left-[35%] lg:right-[50%] lg:bottom-12 lg:w-[700px]">
        <div className={'w-6 bg-reddit_blue'} />
        <div>
          <p className="p-3 pl-4 text-[15px]">
            We use cookies on our website for a number of purposes, including
            analytics and performance, functionality and advertising.{' '}
            <Link href={'/policies/cookies'}>
              <a target={'_blank'} className="text-[#4BB3F3]">
                Learn more about Bbaby&apos;s use of cookies.
              </a>
            </Link>
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={async () => {
                await eu_cookie(false);
              }}
              className="rounded-full bg-reddit_text p-2 px-3 text-sm font-bold"
            >
              <p className='text-reddit_dark'>Reject non-essential</p>
            </button>
            <button
              onClick={async () => {
                await eu_cookie(true);
              }}
              className="rounded-full bg-reddit_text p-2 px-3 text-sm font-bold"
            >
              <p className='text-reddit_dark'>Accept all</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className='text-[0.875rem] relative bg-reddit_dark-brighter rounded-[4px] block my-4 p-4 border border-solid border-[#3a3a3c] md:hidden'>
        <button
          name='close'
          aria-label='close cookie'
          className='p-1 absolute right-1 top-1'
          onClick={async () => {
            await eu_cookie(true);
          }}
        >
          <i className='inline-block align-middle leading-[1em]'>
            <CloseIcon className='h-[1em] w-auto leading-4' />
          </i>
        </button>
          Cookies help us deliver out Services. we only use essential cookies.{' '}
          <Link href={'/policies/cookies'}>
            <a target={'_blank'} className='text-reddit_blue'>
              Cookie policy
            </a>
          </Link>
      </div>
    </>
  )
}

export default CookieConsent;

