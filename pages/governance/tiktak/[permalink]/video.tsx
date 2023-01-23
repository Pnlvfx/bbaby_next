import type { NextPage, NextPageContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import tiktakapis from '../../../../components/API/governance/tiktakapis/tiktakapis'
import { getSession } from '../../../../components/API/ssrAPI'
import { TiktakPage } from '../[permalink]'

const TiktakVideo: NextPage<TiktakPage> = ({ data }) => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <div className="h-full w-full">
      {data?.tiktak.video && (
        <>
          <div>
            <video className={`aspect-video`} src={data.tiktak.video} id="video_pre-share" controls={true} width={1080} height={1920} />
          </div>
        </>
      )}
      <div className="mx-2 mt-6 flex justify-between">
        <button
          onClick={goBack}
          className="flex h-[35px] w-16 items-center justify-center rounded-full border border-reddit_border bg-reddit_dark-brighter"
        >
          <AiOutlineArrowLeft className="h-6 w-6" />
        </button>
        {data?.tiktak.video && (
          <Link
            target={'_blank'}
            href={data?.tiktak.video}
            download
            className={`mb-3 ml-auto mr-5 flex h-9 w-40 items-center justify-center rounded-full border-2 border-reddit_border bg-white text-sm font-bold text-black`}
          >
            <p>Download video</p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default TiktakVideo

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const { permalink } = context.query
    if (!permalink) throw new Error('Missing title parameter!')
    const session = await getSession(context)
    const data = await tiktakapis.getTiktak(permalink.toString(), context)
    return {
      props: {
        session,
        data,
      },
    }
  } catch (err) {
    const error = `Don't panic. We're working to fix the issue!`
    return {
      props: {
        error,
      },
    }
  }
}
