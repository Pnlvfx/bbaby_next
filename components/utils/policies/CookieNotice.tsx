import PoliciesTab from './PoliciesTab'

const CookieNotice = () => {

  return (
    <div className=" justify-center py-8 md:flex">
      <div className="w-full flex-none pt-10 font-bold md:w-[35%] lg:w-[22%]">
        <p className='text-[18px]'>Jump to</p>
        <ul className="ml-4 inline-block list-disc text-[14px] font-normal p-2">
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
        <p className="mt-6 text-[14px] mb-6">
          Strictly Necessary: These cookies are necessary for our services to
          function properly and securely and cannot be switched off in our
          systems. You can set your browser to block or alert you about these
          cookies, but then some parts of the site will not work. These include:
        </p>
      </div>
    </div>
  )
}

export default CookieNotice;
