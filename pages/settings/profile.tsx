import type { NextPage, NextPageContext } from 'next'
import Profile from '../../components/user_settings/Profile'
import UserSettings from '../../components/user_settings/UserSettings'
import UserSecurity from '../../components/utils/security/UserSecurity'
import { getSession } from '../../components/API/ssrAPI'
import { useSession } from '../../components/auth/UserContext';
import CEO from '../../components/main/CEO'
import { siteUrl } from '../../components/main/config'

const ProfilePage:NextPage = () => {
  const {session} = useSession();
  const title = 'Bbabystyle Settings'
  const description = `${session?.user?.username}`
  const url = `${siteUrl}/settings/profile`
  const image = session?.user?.avatar;
  const card = 'summary'

  return (
    <div>
       <CEO
        title={title}
        description={description}
        twitter_card={card}
        image={image}
        width={'256'}
        height={'256'}
        type={'website'}
        url={url}
        index={true}
      />
      <UserSecurity>
        <main className="flex bg-reddit_dark-brighter justify-center">
          <div className='w-[60%] max-w-[1350px]'>
            <UserSettings />
            <Profile />
          </div>
        </main>
      </UserSecurity>
    </div>
  )
}

export default ProfilePage;

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
