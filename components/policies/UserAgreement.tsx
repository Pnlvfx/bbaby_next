import Link from 'next/link'
import PoliciesTab from './PoliciesTab'

const UserAgreement = () => {
  const content1 = {}
  return (
    <div className=" justify-center py-8 md:flex">
      <div className="sticky w-full flex-none pt-10 font-bold md:w-[35%] lg:w-[22%]"></div>
      <div className="max-w-[800px] pt-12 md:pt-8">
        <h1 className="text-[30px]">Bbaby User Agreement</h1>
        <p className="pt-4 text-[14px]">
          Effective August 12 ,2022. Last Revised May August 12 ,2022
        </p>
        <p className="mr-0 p-8 pl-0 text-sm font-bold text-black lg:mr-12">
          Bbaby powers hundreds of thousands of distinct online communities.
          This User Agreement and your conduct make that possible.
        </p>
        <ul className="ml-12 mb-6 inline-block list-disc space-y-2">
          <li>
            <p className="text-sm">
              If you live outside the European Economic Area (“EEA”), the United
              Kingdom, or Switzerland, your terms are{' '}
              <Link href={'/policies/user-agreement'}>
                <a>
                  <span className="text-reddit_blue">here</span>
                  <span>.</span>
                </a>
              </Link>
            </p>
            <p className="text-sm">
              If you live in the EEA, United Kingdom, or Switzerland, your terms
              are{' '}
              <Link href={'/policies/user-agreement'}>
                <a>
                  <span className="text-reddit_blue">here</span>
                  <span>.</span>
                </a>
              </Link>
            </p>
          </li>
        </ul>
        <hr className="my-10 border-black" />
        <p className="text-2xl font-bold text-black">
          Bbaby User Agreement if you live outside the EEA, United Kingdom, or
          Switzerland, including if you live in the United States
        </p>
        <p className="mt-5 text-sm">
          Hello, bbaby&apos;s and people of the Internet! This Bbaby User
          Agreement (“Terms”) applies to your access to and use of the websites,
          mobile apps, widgets, APIs, emails, and other online products and
          services (collectively, the “Services”) provided by Bbaby, Inc.
          (“Bbaby,” “we,” “us,” or “our”).
        </p>
        <p className="mt-5 text-sm">
          Remember Bbaby is for fun and is intended to be a place for your
          entertainment, but we still need some basic rules. By accessing or
          using our Services, you agree to be bound by these Terms. If you do
          not agree to these Terms, you may not access or use our Services.
        </p>
        <p className="mt-5 text-lg">1. Your Access to the Services</p>
        <p className="mt-5 text-sm">
          No one under 13 is allowed to use or access the Services. We may offer
          additional Services that require you to be older to use them, so
          please read all notices and any Additional Terms carefully when you
          access the Services.
        </p>
        <p className="mt-5 text-sm">By using the Services, you state that:</p>
        <ul className="ml-12 mt-6 inline-block list-disc space-y-2">
          <li>
            <p className="text-sm">
              You are at least 13 years old and over the minimum age required by
              the laws of your country of residence to access and use the
              Services;
            </p>
          </li>
          <li>
            <p className="text-sm">
              You can form a binding contract with Reddit, or, if you are over
              13 but under the age of majority in your jurisdiction, that your
              legal guardian has reviewed and agrees to these Terms;
            </p>
          </li>
          <li>
            <p className="text-sm">
              You are not barred from using the Services under all applicable
              laws; and
            </p>
          </li>
          <li>
            <p className="text-sm">
              You have not been permanently suspended or removed from the
              Services.
            </p>
          </li>
        </ul>
        <p className="mt-5 text-sm">
          If you are accepting these Terms on behalf of another legal entity,
          including a business or government entity, you represent that you have
          full legal authority to bind such entity to these Terms.
        </p>
        <p className="mt-5 text-lg">2. Privacy</p>
        <span className="mt-5 text-sm">
          Bbaby&apos;s{' '}
          <Link href={'/policies/privacy-policy'}>
            <a>
              <span className="text-reddit_blue ">Privacy Policy</span>
            </a>
          </Link>{' '}
          explains how and why we collect, use, and share information about you
          when you access or use our Services. You understand that through your
          use of the Services, you consent to the collection and use of this
          information as set forth in the{' '}
          <Link href={'/policies/privacy-policies'}>
            <a>
              <span className="text-reddit_blue ">Privacy Policy</span>
            </a>
          </Link>
          .
        </span>
        <p className="mt-5 text-lg">3. Your Use of the Services</p>
        <p className="mt-5 text-sm">
          Subject to your complete and ongoing compliance with these Terms,
          Bbaby grants you a personal, non-transferable, non-exclusive,
          revocable, limited license to: (a) install and use a copy of our
          mobile application associated with the Services that is obtained from
          a legitimate marketplace on a mobile device owned or controlled by
          you; and (b) access and use the Services. We reserve all rights not
          expressly granted to you by these Terms.
        </p>
        <p className="mt-5 text-sm">
          We are always improving our Services. This means we may add or remove
          features, products, or functionalities; we will try to notify you
          beforehand, but that won&apos;t always be possible. We reserve the
          right to modify, suspend, or discontinue the Services (in whole or in
          part) at any time, with or without notice to you. Any future release,
          update, or other addition to functionality of the Services will be
          subject to these Terms, which may be updated from time to time. You
          agree that we will not be liable to you or to any third party for any
          modification, suspension, or discontinuation of the Services or any
          part thereof.
        </p>
        <p className="mt-5 text-lg">
          4. Your Bbaby Account and Account Security
        </p>
        <span className="mt-5 text-sm">
          To use certain features of our Services, you may be required to create
          a Bbaby account (an “Account”) and provide us with a username,
          password, and certain other information about yourself as set forth in
          the{' '}
          <Link href={'/policies/privacy-policies'}>
            <a>
              <span className="text-reddit_blue ">Privacy Policy</span>
            </a>
          </Link>
          .
        </span>
        <p className="mt-5 text-sm">
          You will not license, sell, or transfer your Account without our prior
          written approval.
        </p>
        <p className="mt-5 text-lg">5. Your Content</p>
        <p className="mt-5 text-sm">
          The Services may contain information, text, links, graphics, photos,
          videos, audio, streams, or other materials (“Content”), including
          Content created with or submitted to the Services by you or through
          your Account (“Your Content”). We take no responsibility for and we do
          not expressly or implicitly endorse, support, or guarantee the
          completeness, truthfulness, accuracy, or reliability of any of Your
          Content.
        </p>
        <p className="mt-5 text-sm">
          By submitting Your Content to the Services, you represent and warrant
          that you have all rights, power, and authority necessary to grant the
          rights to Your Content contained within these Terms. Because you alone
          are responsible for Your Content, you may expose yourself to liability
          if you post or share Content without all necessary rights.
        </p>
        <p className="mt-5 text-sm">
          You retain any ownership rights you have in Your Content, but you
          grant Reddit the following license to use that Content:
        </p>
        <p className="mt-5 text-sm">
          When Your Content is created with or submitted to the Services, you
          grant us a worldwide, royalty-free, perpetual, irrevocable,
          non-exclusive, transferable, and sublicensable license to use, copy,
          modify, adapt, prepare derivative works of, distribute, store,
          perform, and display Your Content and any name, username, voice, or
          likeness provided in connection with Your Content in all media formats
          and channels now known or later developed anywhere in the world. This
          license includes the right for us to make Your Content available for
          syndication, broadcast, distribution, or publication by other
          companies, organizations, or individuals who partner with Bbaby. You
          also agree that we may remove metadata associated with Your Content,
          and you irrevocably waive any claims and assertions of moral rights or
          attribution with respect to Your Content.
        </p>
        <p className="mt-5 text-sm">
          Any ideas, suggestions, and feedback about Bbaby or our Services that
          you provide to us are entirely voluntary, and you agree that Bbaby may
          use such ideas, suggestions, and feedback without compensation or
          obligation to you.
        </p>
        <span className="mt-5 text-sm">
          Although we have no obligation to screen, edit, or monitor Your
          Content, we may, in our sole discretion, delete or remove Your Content
          at any time and for any reason, including for violating these Terms,
          violating our{' '}
          <Link href={'/policies/privacy-policies'}>
            <a>
              <span className="text-sm text-reddit_blue">Privacy Policy</span>
            </a>
          </Link>
          , or if you otherwise create or are likely to create liability for us.
        </span>
        <p className="mt-5 text-lg">
          6. Third-Party Content, Advertisements, and Promotions
        </p>
        <p>
          The Services may contain links to third-party websites, products, or
          services, which may be posted by advertisers, our affiliates, our
          partners, or other users (“Third-Party Content”). Third-Party Content
          is not under our control, and we are not responsible for any third
          party&apos;s websites, products, or services. Your use of Third-Party
          Content is at your own risk and you should make any investigation you
          feel necessary before proceeding with any transaction in connection
          with such Third-Party Content.
        </p>
        <p>
          The Services may also contain sponsored Third-Party Content or
          advertisements. The type, degree, and targeting of advertisements are
          subject to change, and you acknowledge and agree that we may place
          advertisements in connection with the display of any Content or
          information on the Services, including Your Content.
        </p>
        <p>
          If you choose to use the Services to conduct a promotion, including a
          contest or sweepstakes (“Promotion”), you alone are responsible for
          conducting the Promotion in compliance with all applicable laws and
          regulations, including but not limited to creating official rules,
          offer terms, eligibility requirements, and compliance with applicable
          laws, rules, and regulations which govern the Promotion (such as
          licenses, registrations, bonds, and regulatory approval). Your
          Promotion must state that the Promotion is not sponsored by, endorsed
          by, or associated with Bbabystyle, and the rules for your Promotion must
          require each entrant or participant to release Bbabystyle from any
          liability related to the Promotion. You acknowledge and agree that we
          will not assist you in any way with your promotion, and you agree to
          conduct your Promotion at your own risk.
        </p>
      </div>
    </div>
  )
}

export default UserAgreement
