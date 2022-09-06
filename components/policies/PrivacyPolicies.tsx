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

  const content3 = [
    {
      title: 'Linked services',
      body: 'If you authorize or link a third-party service (e.g., an unofficial mobile app client) to access your Bbaby account, Bbaby receives information about your use of that service when it uses that authorization. Linking services may also cause the other service to send us information about your account with that service. For example, if you sign in to Bbaby with a third-party identity provider, that provider may share an email address with us. Information sharing with linked services is described later in this section.',
      key: 1,
    },
    {
      title: 'Information collected from integrations',
      body: `We also may receive information about you, including log and usage data and cookie information, from third-party sites that integrate our Services, including our embeds and advertising technology. For example, when you visit a site that uses Bbaby embeds, we may receive information about the web page you visited. Similarly, if an advertiser incorporates Bbaby’s ad technology, Bbaby may receive limited information about your activity on the advertiser’s site or app, such as whether you bought something from the advertiser. You can control how we use this information to personalize the Services for you as described in Your Choices - Controlling Advertising and Analytics below.`,
      key: 2,
    },
  ]

  const content4 = [
    {
      title: 'Embedded content',
      body: `Bbaby displays some linked content in-line on the Bbaby services via “embeds.” For example, Bbaby posts that link to YouTube or Twitter may load the linked video or tweet within Bbaby directly from those services to your device so you don't have to leave Bbaby to see it. In general, Bbaby does not control how third-party services collect data when they serve you their content directly via these embeds. As a result, embedded content is not covered by this privacy policy but by the policies of the service from which the content is embedded.`,
      key: 1,
    },
    {
      title: 'Information collected from integrations',
      body: `We also may receive information about you, including log and usage data and cookie information, from third-party sites that integrate our Services, including our embeds and advertising technology. For example, when you visit a site that uses Bbaby embeds, we may receive information about the web page you visited. Similarly, if an advertiser incorporates Bbaby’s ad technology, Bbaby may receive limited information about your activity on the advertiser’s site or app, such as whether you bought something from the advertiser. You can control how we use this information to personalize the Services for you as described in Your Choices - Controlling Advertising and Analytics below.`,
      key: 2,
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
        <PoliciesTab
          header="Information We Collect From Other Sources"
          underHeader="We may receive information about you from other sources, including from other users and third parties, and combine that information with the other information we have about you. For example, we may receive demographic or interest information about you from third parties, including advertisers (such as the fact that an advertiser is interested in showing you an ad), and combine it with our own data using a common account identifier such as a hash of an email address or a mobile-device ID. You can control how we use this information to personalize the Services for you as described in Your Choices - Controlling Advertising and Analytics below."
          content={content3}
        />
        <PoliciesTab
          header="Information Collected by Third Parties"
          content={content4}
        />

        <div>
          <p className="text-xl font-bold">
            Additional Information for EEA Users
          </p>
          <p className="mt-5 text-sm">
            Users in the European Economic Area have the right to request access
            to, rectification of, or erasure of their personal data; to data
            portability in certain circumstances; to request restriction of
            processing; to object to processing; and to withdraw consent for
            processing where they have previously provided consent. These rights
            can be exercised using the information provided under Your Choices
            above or as described in the Your Rights - Data Subject and Consumer
            Information Requests section above. EEA users also have the right to
            lodge a complaint with their local supervisory authority.
          </p>
          <p className="mt-5 text-sm">
            As required by applicable law, we collect and process information
            about individuals in the EEA only where we have a legal basis for
            doing so. Our legal bases depend on the Services you use and how you
            use them. We process your information on the following legal bases:
          </p>
          <ul className="ml-12 mt-6 inline-block list-disc space-y-2">
            <li>
              <p className="text-sm">
                You have consented for us to do so for a specific purpose;
              </p>
            </li>
            <li className="text-sm">
              We need to process the information to provide you the Services,
              including to operate the Services, provide customer support and
              personalized features and to protect the safety and security of
              the Services;
            </li>
            <li className="text-sm">
              It satisfies a legitimate interest (which is not overridden by
              your data protection interests), such as preventing fraud,
              ensuring network and information security, enforcing our rules and
              policies, protecting our legal rights and interests, research and
              development, personalizing the Services, and marketing and
              promoting the Services; or
            </li>
            <li className="text-sm">
              We need to process your information to comply with our legal
              obligations.
            </li>
          </ul>
          <p className="mt-5 text-xl font-bold">
            Additional Information for California Users
          </p>
          <p className="mt-5 text-sm">
            The California Consumer Privacy Act (CCPA) requires us to provide
            California residents with some additional information about the
            categories of personal information we collect and share, where we
            get that personal information, and how and why we use it.
          </p>
          <p className="mt-5 text-sm">
            We collect the following categories of personal information from
            California residents, depending on the Services used:
          </p>
          <ul className="ml-12 mt-6 inline-block list-disc space-y-2">
            <li className="text-sm">
              Identifiers, like your Bbaby username, email address, IP address,
              and cookie information.
            </li>
            <li className="text-sm">
              Commercial information, including information about transactions
              you undertake with us.
            </li>
            <li className="text-sm">
              Internet or other electronic network activity information, such as
              information about your activity on our Services and limited
              information about your activity on the services of advertisers who
              use our advertising technology.
            </li>
            <li className="text-sm">
              Geolocation information based on your IP address, or more specific
              location information if you authorize your device to provide it to
              us.
            </li>
            <li className="text-sm">
              Audiovisual information in pictures, audio, or video content
              submitted to Bbaby.
            </li>
            <li className="text-sm">
              Professional or employment-related information or demographic
              information, but only if you explicitly provide it to us, such as
              by applying for a job or filling out a survey.
            </li>
            <li className="text-sm">
              Inferences we make based on other collected data, for purposes
              such as recommending content, advertising, and analytics.
            </li>
          </ul>
          <p className="mt-5 text-sm">
            You can find more information about (a) what we collect and sources
            of that information, (b) the business and commercial purposes for
            collecting that information, and (c) the categories of third parties
            with whom we share that information in the What We Collect (and How
            it is Used and Shared) section above.
          </p>
          <p className="mt-5 text-sm">
            If you are a California resident, you have additional rights under
            the CCPA, including the right to request access to or deletion of
            your personal information, and information about our data practices,
            as well as the right not to be discriminated against for exercising
            your privacy rights. These rights can be exercised as described in
            the Data Subject and Consumer Information Requests section above.
          </p>
          <p className="mt-5 text-xl font-bold">Children</p>
          <p className="mt-5 text-sm">
            Children under the age of 13 are not allowed to create an account or
            otherwise use the Services. Additionally, if you are in the EEA, you
            must be over the age required by the laws of your country to create
            an account or otherwise use the Services, or we need to have
            obtained verifiable consent from your parent or legal guardian.
          </p>
          <p className="mt-5 text-xl font-bold">Changes to This Policy</p>
          <p className="mt-5 text-sm">
            We may change this Privacy Policy from time to time. If we do, we
            will let you know by revising the date at the top of the policy. If
            the changes, in our sole discretion, are material, we may also
            notify you by sending an email to the address associated with your
            account (if you have chosen to provide an email address) or by
            otherwise providing notice through our Services. We encourage you to
            review the Privacy Policy whenever you access or use our Services or
            otherwise interact with us to stay informed about our information
            practices and the ways you can help protect your privacy. By
            continuing to use our Services after Privacy Policy changes go into
            effect, you agree to be bound by the revised policy.
          </p>
          <p className="mt-5 text-xl font-bold">Contact Us</p>
          <p className='text-sm mt-5'>
            To send a GDPR data subject request or CCPA consumer request, or if
            you have other inquiries about your privacy rights, follow the steps
            in the Your Rights - Data Subject and Consumer Information Requests
            section above.
          </p>
          <p className='mt-5 text-sm'>If you have other questions about this Privacy Policy, please contact us at:</p>
          <p className='mt-5 text-sm'>
            Bbaby, Inc.
          </p>
          <p className='text-sm mt-1'>
            17, Via Carlo Antonio Broggia
          </p>
          <p className='text-sm mt-1'>Pantelleria, Italia 91017</p>
          <p className='mt-5 text-sm'>Or:</p>
          <a href='mailto:simonegauli@gmail.com' className='mt-5 text-sm text-[#006cbf]'>Simonegauli@gmail.com</a>
          <p className='mt-5 text-sm'>Or:</p>
          <a href='mailto:noreply.bbabystyle@gmail.com' className='mt-5 text-sm text-[#006cbf]'>noreply.bbabystyle@gmail.com</a>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicies
