import Link from 'next/link'

const CookieNotice = () => {
  return (
    <div className=" justify-center py-8 md:flex">
      <div className="w-full flex-none pt-10 font-bold md:w-[35%] lg:w-[22%]">
        <p className="text-[18px]">Jump to</p>
        <ul className="ml-4 inline-block list-disc p-2 text-[14px] font-normal">
          <li className="">
            <p className="max-w-[70%] text-reddit_blue hover:underline">
              What are cookies and how does Bbaby use them?
            </p>
          </li>
        </ul>
      </div>
      <div className="max-w-[800px] pt-12 md:pt-8">
        <h1 className="text-[30px]">Cookie Notice</h1>
        <p className="pt-4 text-[14px]">Last updated July 20, 2022.</p>
        <p className="mr-0 p-8 pl-0 text-sm lg:mr-12">
          This Cookie Notice explains how we use cookies and similar
          technologies as well as the options you have to control them.
        </p>
        <h2 className="text-2xl font-bold">
          What are cookies and how does Bbaby use them?
        </h2>
        <p className="mt-6 text-[14px]">
          A cookie is a small text file that a site stores on your computer or
          mobile device when you visit the site. Browsers support cookies and
          similar technologies (such as local storage and pixels) so that a site
          like Bbabystyle can remember information about your visit and can use
          the information to improve your experience and to create aggregated
          anonymized statistics about usage of the site. In this Notice, we use
          the term “cookie” to refer both to cookies and similar technologies.
        </p>
        <p className="mt-6 text-[14px]">
          Cookies may be set by the site you are visiting (called “first-party
          cookies”) or by a third party, such as those who provide analytics or
          advertising services or interactive content on the site (“third-party
          cookies”). In addition to using cookies on our sites, we may also
          serve third party cookies.
        </p>
        <p className="mt-6 text-[14px]">
          Our first-party cookies include cookies that are strictly necessary,
          functional cookies, cookies related to analytics/performance and
          advertising-related cookies.
        </p>
        <p className="mt-6 mb-6 text-[14px]">
          Strictly Necessary: These cookies are necessary for our services to
          function properly and securely and cannot be switched off in our
          systems. You can set your browser to block or alert you about these
          cookies, but then some parts of the site will not work. These include:
        </p>
        <div className="mr-0 mb-12 border border-reddit_border text-sm">
          <div className="p-8">
            <div className="flex overflow-hidden space-x-5 justify-center">
              <div className="mx-auto lg:ml-4">
                <p className="">Cookie</p>
                <p className="my-8">token</p>
                <p>Google DoubleClick DART Cookie</p>
              </div>
              <div className="mx-auto mb-7">
                <p className='text-center'>Purpose</p>
                <p className="my-8">
                  Stores a login token needed to act as a logged in user.
                </p>
                <p>
                Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL:{' '}
                <a target={'_blank'} rel={'nofollow noreferrer'} className='text-reddit_blue' href='https://policies.google.com/technologies/ads'>
                  https://policies.google.com/technologies/ads
                </a>
                </p>
              </div>
              <div className="mx-auto">
                <p>Expires</p>
                <p className="my-8">2 years</p>
              </div>
            </div>
          </div>
        </div>
        <p className="mb-6 text-[14px]">
          Functional: These cookies enable Bbaby to provide enhanced
          functionality and personalization. If you do not allow these cookies
          then some or all of these features may not function properly.
        </p>
        <p className="mb-6 text-[14px]">
          Analytics and Performance: These cookies allow us to count visits and
          traffic sources so we can measure and improve the performance of our
          site. They help us to know which pages are the most and least popular
          and see how visitors move around the site.
        </p>
        <p className="mb-6 text-[14px]">
          Advertising: We use these cookies to deliver advertisements, to make
          them more relevant and meaningful to users, and to track the
          efficiency of our advertising campaigns, both on our services and on
          other sites or mobile apps. Our third-party advertising partners may
          use these cookies to build a profile of your interests and deliver
          relevant advertising on other sites.
        </p>
        <p className="mb-6 text-[14px]">
          Third-Party Cookies: Bbaby&apos;s services also include cookies from third
          parties that we partner with directly or indirectly. Many of these
          third parties are companies that work with us or with advertisers who
          advertise on Bbaby in order to help target ads or measure the results
          of an advertising campaign.
        </p>
        <p className="mb-6 text-[14px]">
          Third-Party Sites: Third parties who advertise on Bbaby may use our
          advertising technology, including our advertising pixel, on their
          sites. We may serve advertising cookies when you visit their sites so
          that we can measure the effectiveness of ads on Bbaby and to show you
          more relevant advertising. The placement of these cookies is
          controlled by the third-party sites.
        </p>
        <h3 className="mb-6 text-2xl">
          How do I control cookies and how my data is used?
        </h3>
        <p className="mb-6 text-[14px]">
          There are a number of ways you can control how information is
          collected from cookies on Bbaby and how that information is used.
        </p>
        <p className="mb-6 text-xl">Your browser settings</p>
        <p className="mb-6 text-[14px]">
          Your browser includes controls that allow you to manage the use of
          cookies by the sites that you visit. Most browsers have features that
          enable you to see and delete cookies stored on your device and to
          block cookies from all or selected sites. For more information, here
          are links to external help materials from some of the popular
          browsers:
        </p>
        <ul className="ml-12 mb-6 inline-block list-disc space-y-2">
          <li>
            <Link
              href={
                'https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer'
              }
            >
              <a>
                <p className="text-[14px] text-reddit_blue hover:underline">
                  Mozilla Firefox
                </p>
              </a>
            </Link>
          </li>
          <li>
            <Link
              href={
                'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac'
              }
            >
              <a>
                <p className="text-[14px] text-reddit_blue hover:underline">
                  Apple Safari
                </p>
              </a>
            </Link>
          </li>
          <li>
            <Link href={'https://support.google.com/chrome/answer/95647'}>
              <a>
                <p className="text-[14px] text-reddit_blue hover:underline">
                  Google Chrome
                </p>
              </a>
            </Link>
          </li>
          <li>
            <Link
              href={
                'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09'
              }
            >
              <a>
                <p className="text-[14px] text-reddit_blue hover:underline">
                  Microsoft Edge
                </p>
              </a>
            </Link>
          </li>
        </ul>
        <p className="mb-6 text-xl">Your mobile device settings</p>
        <p className='mb-6 text-[14px]'>
          Your mobile device may also include browser settings that allow you to
          manage the use of cookies, especially if the device supports
          installing apps such as iOS and Android devices. iOS and Android
          devices also include additional device settings that control whether
          advertising partners can use information about your app activity for
          advertising purposes. On iOS, you can search for a setting called
          Limit Ad Tracking. On Android, you can search for a setting called Opt
          out of Ads Personalization.
        </p>
        <p className="mb-6 text-xl">Third-party opt-outs</p>
        <p className='mb-6 text-[14px]'>
          Your mobile device may also include browser settings that allow you to
          manage the use of cookies, especially if the device supports
          installing apps such as iOS and Android devices. iOS and Android
          devices also include additional device settings that control whether
          advertising partners can use information about your app activity for
          advertising purposes. On iOS, you can search for a setting called
          Limit Ad Tracking. On Android, you can search for a setting called Opt
          out of Ads Personalization.
        </p>
      </div>
    </div>
  )
}

export default CookieNotice
