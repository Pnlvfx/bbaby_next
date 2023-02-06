import MainButtonNav from './MainButtonNav'

interface PoliciesLayoutProps {
  children: React.ReactNode
}

const PoliciesLayout = ({ children }: PoliciesLayoutProps) => {
  return (
    <main className="bg-white text-reddit_dark">
      <MainButtonNav />
      {children}
    </main>
  )
}

export default PoliciesLayout
