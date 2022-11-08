import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import {BiConfused} from 'react-icons/bi';
import telegramapis from '../components/utils/telegramapis';

const Errorpage: NextPage = () => {
  const size = 200

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') return;
    telegramapis.sendLog(`Page 500 in production;`)
  }, []);

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 m-auto h-[100px] w-[100%]">
        <div className="flex justify-center">
          <BiConfused style={{width: size, height: size}} />
        </div>
        <div className='text-center mt-4'>
          <p className='text-white font-xl font-bold'>Something went wrong</p>
        </div>
        <Link href={'/'} className='text-center'>
          <p className='underline mt-4'>Go home</p>
        </Link>
    </div>
  )
}

export default Errorpage;