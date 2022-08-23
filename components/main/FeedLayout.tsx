

interface FeedLayoutProps {
  children: React.ReactNode
}

const FeedLayout = ({children} : FeedLayoutProps) => {
  
  return (
    <div className="mt-5 mx-[2px] flex justify-center lg:mx-[10px]">
      <div className="w-full lg:w-7/12 xl:w-5/12 lg:mr-4 2xl:w-[650px] flex-none">
        {children}
      </div>
    </div>
  )
}

export default FeedLayout;