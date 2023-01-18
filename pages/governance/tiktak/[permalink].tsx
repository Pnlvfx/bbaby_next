import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { catchErrorWithMessage } from '../../../components/API/common'
import tiktakapis from '../../../components/API/governance/tiktakapis/tiktakapis'
import { getSession } from '../../../components/API/ssrAPI'
import GovernanceCtrl from '../../../components/governance/GovernanceCtrl'
import TiktakText from '../../../components/governance/tiktak/TiktakText'
import { siteUrl } from '../../../components/main/config'
import { useMessage } from '../../../components/main/TimeMsgContext'
import { buttonClass, Spinner } from '../../../components/utils/Button'

interface TiktakPage {
  data: GetTiktakResponse
}

const TiktakPage: NextPage<TiktakPage> = ({ data }) => {
  const [translated, setTranslated] = useState(data.tiktak.body)
  const [loading, setLoading] = useState(false)
  const message = useMessage()

  const create = async () => {
    try {
      setLoading(true)
      await tiktakapis.createTiktak(data.tiktak.permalink, translated)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      catchErrorWithMessage(err, message)
    }
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
        <div className="mt-6 flex justify-center">
          <button disabled={loading} className={`${buttonClass()} flex h-[35px] w-20 items-center justify-center`} onClick={create}>
            {loading && <Spinner />}
            {!loading && <p className="text-right">Create</p>}
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
    const error = `Don't panic. Now we fix the issue!`
    return {
      props: {
        error,
      },
    }
  }
}
