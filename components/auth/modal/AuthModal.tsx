import { useState, useEffect } from 'react';
import { useAuthModal} from './AuthModalContext';
import NewEmailNotif from '../NewEmailNotif';
import UserPreferencesModal from '../../user/UserPreferencesModal';
import { CloseIcon } from '../../utils/SVG';
import { NextComponentType } from 'next';

export type StatusProps = {
  err?: string
}

const AuthModal: NextComponentType = () => {
  // IF NEW USER
  const [EmailTo, setEmailTo] = useState('');
  const authModal = useAuthModal();

  const closeModal = async () => {
    authModal.setShow('hidden');
  }

  // ONLY AFTER FIRST LOGIN
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      setNewUser(firstLogin);
    }
  }, []);

  return (
    <div>
      <div className='bg-[rgba(0,0,0,.4)] h-full left-0 fixed top-0 w-full z-[110]'>
        <div className='rounded-[12px] h-[640px] w-[400px] left-[50%] overflow-hidden shadow-[1px_7px_20px_2px_rgb(0_0_0/40%)] fixed top-[50%] z-[111' style={{transform: 'translate(-50%, -50%)'}}>
          {authModal.show === 'login' ? (
            <iframe key={authModal.show} src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/account/login`} className='w-full h-full' />
          ) : (
            <iframe key={authModal.show} src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/account/register`} className='w-full h-full' />
          )}
          <button onClick={() => closeModal()} className='absolute right-[16px] top-[16px]'>
            <CloseIcon className='h-4 w-4' />
          </button>
        </div>
      </div>
      <>
        {EmailTo && <NewEmailNotif email={EmailTo} />}
        {newUser && <UserPreferencesModal setNewUser={setNewUser} />}
      </>
    </div>
  )
}

export default AuthModal;

