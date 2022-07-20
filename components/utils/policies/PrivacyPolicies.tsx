import PoliciesTab from './PoliciesTab'

const PrivacyPolicies = () => {
  const content1 = [
    {
      title: 'Account information',
      body: 'If you create a Bbaby account, we may require you to provide a username and password. Your username is public, and it doesn’t have to be related to your real name. You may also provide other account information, like an email address, bio, or profile picture. We also store your user account preferences and settings.',
      key: 1,
    },
    {
      title: 'Content you submit',
      body: 'We collect the content you submit to the Services. This includes your posts and comments including saved drafts, your messages with other users (e.g., private messages, chats, and modmail), and your reports and other communications with moderators and with us. Your content may include text, links, images, gifs, and videos.',
      key: 2,
    },
    {
      title: 'Actions you take',
      body: 'We collect information about the actions you take when using the Services. This includes your interactions with content, like voting, saving, hiding, and reporting. It also includes your interactions with other users, such as following, friending, and blocking. We collect your interactions with communities, like your subscriptions or moderator status.',
      key: 3,
    },
    {
      title: 'Other information',
      body: 'You may choose to provide other information directly to us. For example, we may collect information when you fill out a form, apply for a job, request customer support, or otherwise communicate with us.',
      key: 4,
    },
  ]

  const content2 = [
    {
      title: 'Log and usage data',
      body: 'We may log information when you access and use the Services. This may include your IP address, user-agent string, browser type, operating system, referral URLs, device information (e.g., device IDs), device settings, mobile carrier name, pages visited, links clicked, the requested URL, and search terms. Except for the IP address used to create your account, Bbaby will delete any IP addresses collected after 100 days.',
      key: 1,
    },
    {
      title: 'Information collected from cookies and similar technologies',
      body: `We may receive information from cookies, which are pieces of data your browser stores and sends back to us when making requests, and similar technologies. We use this information to improve your experience, understand user activity, personalize content and advertisements, and improve the quality of our Services. For example, we store and retrieve information about your preferred language and other settings. See our 
      <Link href={'/'}>
      <a className='text-reddit_blue'>
        <p>Cookie Notice</p>
        </a>
        </Link> for more information about how Bbaby uses cookies. For more information on how you can disable cookies, please see Your Choices below.`,
      key: 2,
    },
    {
      title: 'Location information',
      body: 'We may receive and process information about your location. For example, with your consent, we may collect information about the specific location of your mobile device (for example, by using GPS or Bluetooth). We may also receive location information from you when you choose to share such information on our Services, including by associating your content with a location, or we may derive your approximate location from other information about you, including your IP address.',
      key: 3,
    },
  ]

  return (
    <div className=" justify-center py-8 md:flex">
      <div className="sticky w-full flex-none pt-10 font-bold md:w-[35%] lg:w-[22%]">
        <p>Jump to</p>
        <div className="max-w-[70%] list-disc text-[14px] font-normal">
          <li className="mx-4">
            <div className="text-reddit_blue hover:underline">
              <p>What We Collect (and How it is Used and Shared)</p>
            </div>
          </li>
        </div>
      </div>
      <div className="max-w-[800px] pt-12 md:pt-8">
        <h1 className="text-[30px]">Bbaby Privacy Policy</h1>
        <p className="pt-4 text-[14px]">
          Effective May 15,2022. Last Revised May 15,2022
        </p>
        <p className="mr-0 p-8 pl-0 text-sm lg:mr-12">
          We want you to understand how and why Bbaby, Inc. (“Bbaby,” “we” or
          “us”) collects, uses, and shares information about you when you use
          our sites, mobile apps, widgets, and other online products and
          services (collectively, the “Services”) or when you otherwise interact
          with us or receive a communication from us. This Privacy Policy
          applies to all of our Services.
        </p>
        <h2 className="text-2xl font-bold">
          What We Collect (and How it is Used and Shared)
        </h2>
        <PoliciesTab
          header="Information You Provide to Us"
          underHeader="We collect information you provide to us directly when you use the Services. This includes:"
          content={content1}
        />
        <PoliciesTab
          header="Information We Collect Automatically"
          underHeader="When you access or use our Services, we may also automatically collect information about you. This includes:	"
          content={content2}
        />
      </div>
    </div>
  )
}

export default PrivacyPolicies;

