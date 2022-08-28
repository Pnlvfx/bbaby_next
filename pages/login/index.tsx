import Head from "next/head";
import PoliciesHeader from "../../components/policies/PoliciesHeader";

const LoginPage = () => {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
  const title = `${hostname}: Log in`
  const url = `${hostname}/login`
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