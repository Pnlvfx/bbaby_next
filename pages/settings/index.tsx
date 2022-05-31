import UserSettings from '../../components/auth/usersettings/UserSettings'
import Account from '../../components/auth/usersettings/each/Account'

function index() {
  return (
    <div className='bg-reddit_dark-brighter'>
      <div className='pl-10'>
        <UserSettings />
        <Account />
      </div>
    </div>
  )
}

export default index;