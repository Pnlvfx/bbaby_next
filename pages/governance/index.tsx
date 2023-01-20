import type { NextPage, NextPageContext } from 'next'
import GovernanceCtrl from '../../components/governance/GovernanceCtrl'
import Head from 'next/head'
import GovernanceMainMenù from '../../components/governance/GovernanceMainMenù'
import Homepage from '../../components/governance/main/Homepage'
import youtubeapis from '../../components/API/governance/youtubeAPI'
import { useEffect } from 'react'
import { useMessage } from '../../components/main/TimeMsgContext'
import { useRouter } from 'next/router'
import { getSession } from '../../components/API/ssrAPI'
import { siteUrl } from '../../components/main/config'
import { catchErrorWithMessage } from '../../components/API/common'

const Governance: NextPage = () => {
  const message = useMessage()
  const router = useRouter()

  useEffect(() => {
    const getToken = async () => {
      try {
        if (!router.isReady) return
        if (!router.query.code) return
        const data = await youtubeapis.getYoutubeAccessToken(router.query.code.toString())
        console.log(data)
        message.setMessage({ value: data.msg, status: 'success' })
        router.replace('/governance', undefined, { shallow: false })
      } catch (err) {
        catchErrorWithMessage(err, message)
      }
    }
    getToken()
  }, [router])

  return (
    <>
      <Head>
        <title>Bbabystyle - authority page</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${siteUrl}/governance`} key="canonical" />
      </Head>
      <GovernanceCtrl>
        <GovernanceMainMenù />
        <Homepage />
      </GovernanceCtrl>
    </>
  )
}

export default Governance

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context)
    return {
      props: {
        session,
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
