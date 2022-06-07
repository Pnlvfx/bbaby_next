import Image from "next/image";
import { useState } from "react";
import Button from "../utils/Button";

const UserPreferencesModal = (props: any) => {
  const [modalType,setModalType] = useState('userGender')
  const [userGender,setUserGender] = useState('')
  const {setNewUser} = props




  return (
    <div className={'w-screen h-screen fixed top-0 left-0 z-30 flex '} style={{backgroundColor:'rgba(0,0,0,.6'}}>
        <div className='flex w-auto h-auto border border-reddit_border bg-reddit_dark-brighter self-center mx-auto rounded-lg'>
        <div className="mx-auto self-center relative w-[500px]">
          <div className="flex px-2 py-4">
            <div className="mx-auto flex-none">
              <Image src={'/logo.png'} alt='' width={'32px'} height={'32px'}/>
            </div>
            {modalType === 'userGender' && (
               <button className="right-0 pb-7">
               <div className="mx-4 right-2 absolute">
                 <h1 className="text-reddit_blue text-lg">Skip</h1>
               </div>
               </button>
            )}
          </div>
          {modalType === 'userGender' && (
            <>
            <div className="px-4">
              <h1 className="text-xl">Which of the following best describes you?</h1>
              <h2 className="text-reddit_text-darker">Bbaby will never share this information and uses it to improve what content you see.</h2>
            </div>
            <div className="mx-4 py-4">
              <Button outline='true' className='px-8 py-3 w-full mb-2' onCLick={() => {
                setUserGender('woman')
              }} >Woman</Button>
              <Button outline='true' className='px-8 py-3 w-full mb-2' onCLick={() => {
                setUserGender('man')
              }}>Man</Button>
              <Button outline='true' className='px-8 py-3 w-full mb-2' onCLick={() => {
                setUserGender('not-set')
              }}>Non-binary</Button>
              <Button outline='true' className='px-8 py-3 w-full mb-2' onCLick={() => {
                setUserGender('not-set')
              }}>I refer to myself as...</Button>
              <Button outline='true' className='px-8 py-3 w-full mb-2' onCLick={() => {
                setUserGender('not-set')
              }}>I prefer not to say</Button>
            </div>
            <div className="mx-4 py-8">
              <Button className='px-8 py-3 w-full' onClick={() => {
                setModalType('userInterest')
              }} >Continue</Button>
            </div>
            </>
          )}
          {modalType === 'userInterest' && (
            <>
            <div>
              <h1>We are working to improve your user experience...</h1>
            </div>
            <div className="mx-4 py-8">
              <Button className='px-8 py-3 w-full' onClick={() => {
                localStorage.removeItem('firstLogin')
                setNewUser(false)
              }} >Continue</Button>
            </div>
            </>
          )}
        </div>
        </div>
    </div>
  )
}

export default UserPreferencesModal;