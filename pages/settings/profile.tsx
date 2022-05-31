import Profile from '../../components/auth/usersettings/each/Profile'
import UserSettings from '../../components/auth/usersettings/UserSettings'

function profile() {
  return (
    <div className='bg-reddit_dark-brighter'>
      <div className='pl-12'>
        <UserSettings />
        <Profile />
      </div>
    </div>
    
  )
}

export default profile;