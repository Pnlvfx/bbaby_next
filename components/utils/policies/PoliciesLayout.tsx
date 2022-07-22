import MainButtonNav from './MainButtonNav'
import PoliciesHeader from './PoliciesHeader'

const PoliciesLayout = ({ children }: any) => {
  return (
    <main className="bg-white text-reddit_dark">
      <PoliciesHeader />
      <MainButtonNav />
      {children}
    </main>
  )
}

export default PoliciesLayout;
