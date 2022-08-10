import Link from 'next/link';
import {BiConfused} from 'react-icons/bi';

const Errorpage = () => {
  const size = 200
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 m-auto h-[100px] w-[100%]">
        <div className="flex justify-center">
          <BiConfused style={{width: size, height: size}} />
        </div>
        <div className='text-center mt-4'>
          <p className='text-white font-xl font-bold'>Something went wrong</p>
        </div>
        <Link href={'/'}>
        <a className='text-center'>
          <p className='underline mt-4'>Go home</p>
        </a>
        </Link>
    </div>
  )
}

export default Errorpage;