import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { catchErrorWithMessage } from '../../../components/API/common'
import tiktakapis from '../../../components/API/governance/tiktakapis/tiktakapis'
import { GetTiktakResponse } from '../../../components/API/governance/tiktakapis/types/tiktak'
import { getSession } from '../../../components/API/ssrAPI'
import GovernanceCtrl from '../../../components/governance/GovernanceCtrl'
import TiktakText from '../../../components/governance/tiktak/TiktakText'
import { siteUrl } from '../../../components/main/config'
import { useMessage } from '../../../components/main/TimeMsgContext'
import { Spinner } from '../../../components/utils/buttons/Button'

export interface TiktakPage {
  data?: GetTiktakResponse
}

const TiktakPage: NextPage<TiktakPage> = ({ data }) => {
  const [translated, setTranslated] = useState(data?.tiktak.body || '')
  const [loading, setLoading] = useState(false)
  const message = useMessage()
  const router = useRouter()
  const [synthetize, setSynthetize] = useState(data?.tiktak.synthetize || '')

  const create = async () => {
    try {
      if (!data || !translated || !synthetize) return
      setLoading(true)
      await tiktakapis.createTiktak(data.tiktak.permalink, translated, synthetize)
      setLoading(false)
      router.push(`${router.asPath}/video`)
    } catch (err) {
      setLoading(false)
      catchErrorWithMessage(err, message)
    }
  }

  useEffect(() => {
    if (data?.tiktak.video) {
      router.push(`${router.asPath}/video`)
    }
  }, [])

  const goBack = () => {
    router.back()
  }

  return (
    <>
      <Head>
        <title>Bbabystyle - authority-onlypage</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${siteUrl}/governance`} key="canonical" />
      </Head>
      <GovernanceCtrl>
        <TiktakText value={translated} setValue={setTranslated} />
        <div className="mx-2 mt-6 flex justify-between">
          <button
            disabled={loading}
            onClick={goBack}
            className={`flex h-[35px] w-16 items-center justify-center rounded-full border border-reddit_border bg-reddit_dark-brighter`}
          >
            <AiOutlineArrowLeft className="h-6 w-6" />
          </button>
          <input
            value={synthetize}
            onChange={(e) => setSynthetize(e.target.value)}
            className="rounded-md bg-reddit_dark-brighter p-2 text-center font-bold outline-none"
          />
          <button
            disabled={loading}
            className={`flex h-[35px] w-16 items-center justify-center rounded-full border border-reddit_border bg-reddit_dark-brighter`}
            onClick={create}
          >
            {loading && <Spinner />}
            {!loading && <AiOutlineArrowRight className="h-6 w-6" />}
          </button>
        </div>
      </GovernanceCtrl>
    </>
  )
}

export default TiktakPage

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
