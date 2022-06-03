import Header from './header/Header'
import AuthModal from './auth/AuthModal'
import CommunityFormModal from './community/CommunityFormModal'

const Layout = ({children} : any) => {

  return (
    <div>
        <AuthModal />
        <Header />
        <CommunityFormModal />
        {children}
    </div>
  )
}

export default Layout;