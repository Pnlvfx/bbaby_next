

const LinkPreviewLoader = () => {
  return (
    <div className='overflow-hidden border border-reddit_border rounded-md mb-3 bg-reddit_dark-brighter xl:mx-2 max-w-[700px] h-[550px]'>
        <div className='p-2'>
            <div className={`w-full mb-4 text-lg text-center h-[28px] loading`} />
            <div className='mb-4 flex items-center justify-center h-[350px] loading' />
            <div className='flex justify-center min-h-[300px] loading' />
        </div>
    </div>
  )
}

export default LinkPreviewLoader;