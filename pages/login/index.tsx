import Head from "next/head";
import { siteUrl } from "../../components/main/config";

const LoginPage = () => {
  const title = `${siteUrl}: Log in`
  const url = `${siteUrl}/login`
  const description = `Don't worry, we won't tell anyone your username. Log in to your Bbaby account.`
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel='canonical' href={url} key='canonical' />
        <meta name="description" content={description} key={'description'} />
      </Head>
    </div>
  )
}

export default LoginPage;