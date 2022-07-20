import Head from 'next/head'
import React from 'react'
import CookieNotice from '../../components/utils/policies/CookieNotice'
import PoliciesLayout from '../../components/utils/policies/PoliciesLayout'

const Cookies = () => {
  return (
    <div>
      <Head>
        <title>Bbabystyle Cookies Policy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PoliciesLayout>
        <CookieNotice />
      </PoliciesLayout>
    </div>
  )
}

export default Cookies
