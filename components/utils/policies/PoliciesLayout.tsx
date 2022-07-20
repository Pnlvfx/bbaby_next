import MainButtonNav from "./MainButtonNav"

const PoliciesLayout = ({children}:any) => {
  return (
    <main className='bg-white text-reddit_dark'>
        <MainButtonNav />
        {children}
    </main>
  )
}

export default PoliciesLayout