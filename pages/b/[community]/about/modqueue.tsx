import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSession } from '../../../../components/API/ssrAPI'
import Modqueque from '../../../../components/community/modqueque/Modqueque'
import { siteUrl } from '../../../../components/main/config'

interface ModqueuePageProps {
  community?: string
}

const ModqueuePage: NextPage<ModqueuePageProps> = ({ community }) => {
  const router = useRouter()
  const name = community || router.asPath.split('/')[1]
  const url = `${siteUrl}/b/${name.toLowerCase()}/about/modqueque`
  return (
    <div>
      <Head>
        <title>Bbabystyle - community admin page </title>
        <link rel="canonical" href={url} key="canonical" />
      </Head>
      <Modqueque />
    </div>
  )
}

export default ModqueuePage

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context)
    const { community } = context.query
    return {
      props: {
        session,
        community,
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
