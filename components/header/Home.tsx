import Image from 'next/image'
import React from 'react'
import { HiChevronDown } from 'react-icons/hi'
import HomeIcon from '../../public/home.svg'

const Home = () => {
  return (
    <>
        <div id='home_button' className=' w-[255px] hidden lg:block'>
            <button className='hover:border border-reddit_border h-[42px] self-center rounded-md w-full'>
                <div className='flex self-center ml-1'>
                <Image src={HomeIcon} alt='' className='flex-none self-center' width={'25px'} height={'25px'}/>
                <h1 className='text-sm pl-2 self-center'>Home</h1>
                <HiChevronDown className=' w-[25px] h-[25px] ml-auto mr-2'/>
                </div>
            </button>
        </div>
    </>
  )
}

export default Home;