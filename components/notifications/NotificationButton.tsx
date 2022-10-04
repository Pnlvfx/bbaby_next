import { useEffect, useState } from 'react';
import {IoIosNotificationsOutline} from 'react-icons/io';
import style from './notification.module.css';
import NotificationContent from './NotificationContent';
import ClickOutHandler from 'react-clickout-ts';
import Link from 'next/link';

const NotificationButton = () => {
  const [windowDimension, setWindowDimension] = useState(0);
  const [show, setShow] = useState(false);

  const detectSize = () => { //-752 originals
    if (window.innerWidth >= 752) {
      setWindowDimension(window.innerWidth - 752)
    } else {
      setWindowDimension(0)
    }
  }

  useEffect(() => {
    if (typeof window === undefined) return;
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    }
  }, [windowDimension]);

  useEffect(() => {
    if (typeof window === undefined) return;
    detectSize();
  }, []);

  return (
    <span className='ml-2 h-8'>
      <ClickOutHandler onClickOut={() => {
        setShow(false);
      }}>
      <button 
        className={`relative rounded-[2px]`}
        aria-expanded='false'
        aria-haspopup='true'
        aria-label='Open notifications'
        onClick={() => {
          setShow(!show);
        }}
      >
        <div className='box-border h-8 w-8 relative'>
          <span className='bg-reddit_red rounded-xl box-border text-[10px] font-bold h-4 left-5 leading-4 px-1 absolute text-center top-0 align-middle min-w-[16px] w-auto z-[1]'>9</span>
          <i className='icon absolute top-0 bottom-0 left-0 right-0 m-auto'>
            <IoIosNotificationsOutline />
          </i>
        </div>
      </button>
      {show && 
        <div className={style.dropdown} style={{transform: `translate(${windowDimension}px, 46px)`}}>
          <div className={style.dropdownContainer}>
            <div className={style.dropdownContainer2}>
              <nav className={style.dropdownNav}>
                <span className={style.navSpan}>Notifications</span>
              </nav>
              {(
              <div>
                <NotificationContent />
              </div>
              )}
              <div className='overflow-hidden overflow-y-auto'>
                <div className='pb-8 items-center flex justify-center rounded-[4px] flex-col p-5'>
                  <img
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/icons/goku_notification.jpeg`}
                    alt='default user avatar'
                    className='h-[128px] mt-3'
                  />
                  <h1 className='text-[18px] leading-[22px] font-medium mb-2 mt-6'>You don&apos;t have any activity yet</h1>
                  <p className='text-[14px] leading-[18px] text-center mx-10 text-reddit_text-darker '>
                    That&apos;s o, maybe you need the right inspitation. Try posting in
                    <Link href={''}>
                      <a>{' '}

                      </a>
                    </Link>
                    a popular community for discussion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      </ClickOutHandler>
    </span>
  )
}

export default NotificationButton;
