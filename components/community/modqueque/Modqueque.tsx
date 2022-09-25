import { useRouter } from 'next/router'
import { useSession } from '../../auth/UserContext'

const Modqueque = () => {
  const { session } = useSession();
  const router = useRouter()
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 m-auto h-[100px] w-[100%]">
      {!session && (
        <div className="text-center">
          <p className='text-lg font-bold mb-4'>Sorry, this is a moderator-only page</p>
          <p className='text-reddit_text-darker text-sm'>
            You must be a moderator of b/{router?.query?.community} to view this
            page.
          </p>
        </div>
      )}
    </div>
  )
}

export default Modqueque;

