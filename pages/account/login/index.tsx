import { NextPageContext } from 'next'
import Head from 'next/head'
import { getSession } from '../../../components/API/ssrAPI'
import LoginForm from '../../../components/auth/LoginForm'
import { siteUrl } from '../../../components/main/config'

const LoginPage = () => {
  const title = `${siteUrl}: Log in`
  const url = `${siteUrl}/account/login`
  const description = `Don't worry, we won't tell anyone your username. Log in to your Bbaby account.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={url} key="canonical" />
        <meta name="description" content={description} key={'description'} />
      </Head>
      <LoginForm />
    </>
  )
}

export default LoginPage

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context)
    return {
      props: {
        session,
      },
    }
  } catch (err) {
    const error = `Don't panic. Now we will fix the issue!`
    return {
      props: {
        error,
      },
    }
  }
}
