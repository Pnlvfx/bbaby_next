import Image from "next/image";
import { useState } from "react";
import { buttonClass } from "../utils/Button";
import Logo from '../../public/logo.png'

const UserPreferencesModal = (props: any) => {
  const [modalType,setModalType] = useState('userGender')
  const [userGender,setUserGender] = useState('')
  const {setNewUser} = props

  return (
    <div className={'w-screen h-screen fixed top-0 left-0 z-30 flex bg-[rgba(0,0,0,.6)]'}>
        <div className='flex w-auto h-auto border border-reddit_border bg-reddit_dark-brighter self-center mx-auto rounded-lg'>
        <div className="mx-auto self-center relative w-[500px]">
          <div className="flex px-2 py-4">
            <div className="mx-auto flex-none">
              <Image src={Logo} alt='Logo' width={'32px'} height={'32px'}/>
            </div>
            {modalType === 'userGender' && (
               <button className="right-0 pb-7">
               <div className="mx-4 right-2 absolute">
                 <p className="text-reddit_blue text-lg">Skip</p>
               </div>
               </button>
            )}
          </div>
          {modalType === 'userGender' && (
            <>
            <div className="px-4">
              <p className="text-xl">Which of the following best describes you?</p>
              <p className="text-reddit_text-darker">Bbaby will never share this information and uses it to improve what content you see.</p>
            </div>
            <div className="mx-4 py-4">
              <button className={`px-8 py-3 w-full mb-2 ${buttonClass(true)}`} onClick={() => {
                setUserGender('woman')
              }} >Woman</button>
              <button className={`px-8 py-3 w-full mb-2 ${buttonClass(true)}`} onClick={() => {
                setUserGender('man')
              }}>Man</button>
              <button className={`px-8 py-3 w-full mb-2 ${buttonClass(true)}`} onClick={() => {
                setUserGender('not-set')
              }}>Non-binary</button>
              <button className={`px-8 py-3 w-full mb-2 ${buttonClass(true)}`} onClick={() => {
                setUserGender('not-set')
              }}>I refer to myself as...</button>
              <button className={`px-8 py-3 w-full mb-2 ${buttonClass(true)}`} onClick={() => {
                setUserGender('not-set')
              }}>I prefer not to say</button>
            </div>
            <div className="mx-4 py-8">
              <button className={`px-8 py-3 w-full ${buttonClass()}`} onClick={() => {
                setModalType('userInterest')
              }} >Continue</button>
            </div>
            </>
          )}
          {modalType === 'userInterest' && (
            <>
            <div>
              <p>We are working to improve your user experience...</p>
            </div>
            <div className="mx-4 py-8">
              <button className={`px-8 py-3 w-full ${buttonClass()}`} onClick={() => {
                localStorage.removeItem('firstLogin')
                setNewUser(false)
              }} >Continue</button>
            </div>
            </>
          )}
        </div>
        </div>
    </div>
  )
}

export default UserPreferencesModal;