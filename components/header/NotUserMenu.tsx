import { BiUserCircle } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { useAuthModal } from '../auth/modal/AuthModalContext'
import Link from 'next/link'

const NotUserMenu = ({ setShowDropdown }: any) => {

  const ButtonWithIcon = (name: string, ) => {
    return (
      <button className={'hover:bg-reddit_dark-brightest box-border block h-10 w-full'}>
        <span className={'flex items-center px-5 h-full'}>
          <span>
            <FiSettings className="mr-2 h-5 w-5" />
          </span>
          <span className="text-[14px] leading-[18px] font-bold">{name}</span>
          
        </span>
      </button>
    )
  }

  const containerClass = 'hover:bg-reddit_dark-brightest cursor-pointer'
  const buttonClass = 'text-sm p-3 pl-12 font-bold'
  const authModal = useAuthModal();

  return (
    <>
      <div className={'absolute right-0 top-[48px] z-10 overflow-hidden rounded-md border border-reddit_border bg-reddit_dark-brighter text-reddit_text'}>
        <div className="w-[280px]">
          <div className="">
            <div id="buttons_with_icon">
              <div className="p-3" />
              {ButtonWithIcon('Settings')}
            </div>
            <hr className="my-3 mb-4 border-reddit_border" />
            <div id="button_no_icons">
              <div className={containerClass}>
                <Link 
                  href={'/policies/user-agreement'}
                  target="_blank"
                  onClick={() => {
                    setShowDropdown(false)
                  }}
                >
                  <p className={buttonClass}>User Agreement</p>
                </Link>
              </div>
              <div className={containerClass}>
                <Link 
                  href={'/policies/privacy-policy'}
                  target="_blank"
                  onClick={() => {
                    setShowDropdown(false)
                  }}
                >
                  <p className={buttonClass}>Privacy Policy</p>
                </Link>
              </div>
              <div className={containerClass}>
                <p className={buttonClass}>Content Policy</p>
              </div>
              <div className={containerClass}>
                <p className={buttonClass}>Moderator Guidelines</p>
              </div>
            </div>
            <hr className="my-3 mb-4 border-reddit_border" />
            <div className={containerClass}>
              <div
                onClick={() => {
                  authModal.setShow('login')
                  setShowDropdown(false)
                }}
                className={'flex p-[9px] pl-4'}
              >
                <BiUserCircle className="mr-2 h-6 w-6" />
                <p className="mt-[2px] text-sm font-bold">
                  Sign Up or Log In
                </p>
              </div>
            </div>
            <div>
              <p className="p-4 pt-3 text-xs text-reddit_text-darker">
                2022 Bbabystyle.Inc. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotUserMenu;

