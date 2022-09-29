import UserSettings from '../../components/user_settings/UserSettings'
import Account from '../../components/user_settings/Account'
import type { NextPage, NextPageContext } from 'next';
import UserSecurity from '../../components/utils/security/UserSecurity';
import { getSession } from '../../components/API/ssrAPI';
import { useSession } from '../../components/auth/UserContext';
import CEO from '../../components/main/CEO';
import { siteUrl } from '../../components/main/config';

const UserSettingsPage:NextPage = () => {
  const {session} = useSession();
  const title = 'Bbabystyle Settings'
  const description = `${session?.user?.username}`
  const url = `${siteUrl}/settings`;
  const image = session?.user?.avatar;
  const card = 'summary';
  
  return (
    <div>
       <CEO
        title={title}
        description={description}
        twitter_card={card}
        type={'website'}
        url={url}
        image={image}
        width={'256'}
        height={'256'}
        index={true}
      />
        <UserSecurity>
        <main className='bg-reddit_dark-brighter flex justify-center'>
          <div className='w-[60%] max-w-[1350px]'>
            <UserSettings />
            <Account />
          </div>
        </main>
        </UserSecurity>
    </div>
  )
}

export default UserSettingsPage;

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const session = await getSession(context);
    return {
      props: {
        session,
      },
    }
  } catch (err) {
    const error = `Don't panic. Now we fix the issue!`
    return {
      props: {
        error
      }
    }
  }
}