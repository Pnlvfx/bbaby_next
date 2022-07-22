import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Logo from '../../../public/logo.png'
import { TextLogo } from '../SVG';

const PoliciesHeader = () => {
  return (
    <header className='h-[52px] items-center sticky top-0 z-30 border-b border-reddit_border bg-reddit_dark-brighter'>
        <div className='flex ml-0 lg:ml-2 items-center h-full'>
            <Link href={'/'}>
                <a className='flex items-center'>
                    <div className="mr-2 ml-0 lg:ml-2">
                      <Image src={Logo} height={34} width={34} alt='logo' />
                    </div>
                    <div className='hidden lg:block'>
                      <TextLogo />
                    </div>
                </a>
            </Link>
        </div>
    </header>
  )
}

export default PoliciesHeader;