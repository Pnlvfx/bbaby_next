import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { catchErrorWithMessage } from '../../../components/API/common'
import tiktakapis from '../../../components/API/governance/tiktakapis/tiktakapis'
import { TiktakProps } from '../../../components/API/governance/tiktakapis/types/tiktak'
import { getSession } from '../../../components/API/ssrAPI'
import GovernanceCtrl from '../../../components/governance/GovernanceCtrl'
import GovernanceMainMenù from '../../../components/governance/GovernanceMainMenù'
import TiktakList from '../../../components/governance/tiktak/tiktaklist/TikTakList'
import TiktakText from '../../../components/governance/tiktak/TiktakText'
import { siteUrl } from '../../../components/main/config'
import { useMessage } from '../../../components/main/TimeMsgContext'
import { buttonClass, Spinner } from '../../../components/utils/Button'

export interface TikTakPage {
  tiktaks: TiktakProps[]
}

const TikTakPage: NextPage<TikTakPage> = ({ tiktaks }) => {
  const [originalText, setOriginalText] = useState('')
  const [loading, setLoading] = useState(false)
  const message = useMessage()
  const router = useRouter()

  const newTiktak = async () => {
    try {
      setLoading(true)
      const tiktak = await tiktakapis.newTiktak(originalText, 'en')
      router.push(tiktak.permalink)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      catchErrorWithMessage(err, message)
    }
  }
  return (
    <div>
      <Head>
        <title>Bbabystyle - authority page</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${siteUrl}/governance/bbaby`} key="canonical" />
      </Head>
      <GovernanceCtrl>
        <GovernanceMainMenù />
        <TiktakList tiktaks={tiktaks} />
        <TiktakText value={originalText} setValue={setOriginalText} />
        <div className="mt-6 flex justify-center">
          <button disabled={loading} className={`${buttonClass()} flex h-[35px] w-20 items-center justify-center`} onClick={newTiktak}>
            {loading && <Spinner />}
            {!loading && <p className="text-right">Translate</p>}
          </button>
        </div>
      </GovernanceCtrl>
    </div>
  )
}

export default TikTakPage

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context)
    const tiktaks = await tiktakapis.getTiktaks(context)
    return {
      props: {
        session,
        tiktaks,
      },
    }
  } catch (err) {
    const error = `Don't panic. Now we fix the issue!`
    return {
      props: {
        error,
      },
    }
  }
}
