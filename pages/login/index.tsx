import { NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { getSession } from "../../components/API/ssrAPI";
import AuthInput from "../../components/auth/auth-input/AuthInput";
import Google from "../../components/auth/providers/google/Google";
import { siteUrl } from "../../components/main/config";

const LoginPage = () => {
  const title = `${siteUrl}: Log in`
  const url = `${siteUrl}/login`
  const description = `Don't worry, we won't tell anyone your username. Log in to your Bbaby account.`

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel='canonical' href={url} key='canonical' />
        <meta name="description" content={description} key={'description'} />
      </Head>
      <div className="box-border block bg-reddit_dark-brighter">
        <main className="block box-border">
          <div className="items-center justify-center min-h-[100vh] w-[100vw] flex flex-col box-border">
            <div className="flex box-border">
              <div className="max-w-[280px] p-0 self-center w-full box-border">
                <div className="mx-auto max-w-[280px] w-[280px] box-border block">
                  <h1 className="mt-6 text-xl">Log In</h1>
                </div>
                <p className=" mt-2 mx-auto text-xs">
                  By continuing, you agree are setting up a Bbabystyle and agree to our{' '}
                  <Link 
                    target={'_blank'} 
                    href={'/policies/user-agreement'}
                    className='text-reddit_blue'
                  >
                    User Agreement{' '}
                  </Link>
                  and{' '}
                  <Link 
                    target={'_blank'} 
                    href={'/policies/privacy-policy'}
                    className='text-reddit_blue'
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
                <form 
                  method="post" 
                  action="/login"
                  className="m-auto max-w-[280px] w-[280px] box-border block"
                >
                  <div className="mt-8 mb-[18px] box-border">
                    <div className="box-border">
                      <div className="min-w-[280px] block h-[44px] my-2 relative max-w-[400px] w-[280px] box-border">
                        <Google />
                      </div>
                    </div>
                    <div className="mt-[20px] mb-6 items-center flex justify-between">
                      <span className="box-border w-[40%]"/>
                      <span className="box-border w-[40%] font-bold text-sm">OR</span>
                      <span className="box-border w-[40%]"/>
                    </div>
                  </div>
                  <AuthInput value={username} setValue={setUsername} />
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default LoginPage;

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context);
    return {
      props: {
        session,
      },
    }
  } catch (err) {
    const error = `Don't panic. Now we will fix the issue!`
    return {
      props: {
        error
      }
    }
  }
}