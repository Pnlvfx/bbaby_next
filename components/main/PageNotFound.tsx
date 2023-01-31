import Link from 'next/link'
import { useEffect } from 'react'
import { BiConfused } from 'react-icons/bi'
import telegramapis from '../API/telegramapis'

const PageNotFound = () => {
  const size = 200

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') return
    telegramapis.sendLog(`Page 404 in production;`)
  }, [])

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 m-auto h-[100px] w-[100%]">
      <div className="flex justify-center">
        <BiConfused style={{ width: size, height: size }} />
      </div>
      <div className="mt-4 text-center">
        <p className="font-xl font-bold text-white">Something went wrong</p>
      </div>
      <Link href={'/'} className="text-center">
        <p className="mt-4 underline">Go home</p>
      </Link>
    </div>
  )
}

export default PageNotFound
