import { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import ClickOutHandler from 'react-clickout-ts'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MainButtonNav = () => {
  const [show, setShow] = useState(false)
  const router = useRouter()
  const title =
    router.pathname === '/policies/privacy-policy'
      ? 'Bbaby Privacy Policy'
      : router.pathname === '/policies/cookies'
      ? 'Cookie Notice'
      : 'Bbaby User Agreement'
  return (
    <>
      <div className="flex justify-center">
        <div className="relative">
          <button
            onClick={() => {
              setShow(!show)
            }}
            className="mt-10 flex h-[40px] items-center rounded-full bg-reddit_blue px-3 text-sm font-bold text-white"
          >
            <p className="mx-2">{title}</p>
            <RiArrowDownSLine className="h-[18px] w-[18px] text-reddit_text" />
          </button>
          {show && (
            <div className="absolute top-20 bg-white">
              <ClickOutHandler
                onClickOut={() => {
                  setShow(false)
                }}
              >
                <div className="p-2">
                  <Link href={'/policies/cookies'}>
                    <a>
                      <p className="pb-3 text-sm text-reddit_blue">
                        Cookie Notice
                      </p>
                    </a>
                  </Link>
                  <Link href={'/policies/privacy-policy'}>
                    <a>
                      <p className="pb-3 text-sm text-reddit_blue">
                        Bbaby Privacy Policy
                      </p>
                    </a>
                  </Link>
                  <Link href={'/policies/user-agreement'}>
                    <a>
                      <p className="pb-3 text-sm text-reddit_blue">
                        Bbaby User Agreement
                      </p>
                    </a>
                  </Link>
                </div>
              </ClickOutHandler>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MainButtonNav
