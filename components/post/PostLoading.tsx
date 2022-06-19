import LoaderPlaceholder from "./LoaderPlaceholder"

const PostLoading = () => {
  return (
    <div className="flex bg-reddit_dark-brighter rounded-md overflow-hidden max-h-[700px]">
         <div className='bg-[#141415] w-10 flex-none relative'>
            <LoaderPlaceholder extraStyles={{height:'100%'}} />
          </div>
          <div className="p-2">
            <div className="flex mb-3 truncate">
                <div className="h-5 relative w-full">
                    <LoaderPlaceholder extraStyles={{height:'100%'}} />
                </div>
            </div>
            <div>
                <div className="mb-4 max-h-300 h-96 w-full container relative">
                <LoaderPlaceholder extraStyles={{height:'100%'}} />
                </div>
            </div>
          </div>
    </div>
  )
}

export default PostLoading