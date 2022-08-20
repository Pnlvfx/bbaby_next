import Image from 'next/image'
import { useContext, useState } from 'react';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';
import { Spinner } from '../../utils/Button';
import { inputClass } from '../../utils/Input'
import { NewsContext, NewsContextProps } from './NewsContext'

const PexelsImages = () => {
  const [searchPexels, setSearchPexels] = useState('');
  const [pageSearch, setPageSearch] = useState('1');
  const [loading,setLoading] = useState(false);
  const [pexelsImage, setPexelsImage] = useState<PexelsProps[] | []>([]);
  const {setMediaInfo} = useContext(NewsContext) as NewsContextProps;
  const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;

  const searchPexelsImages = async () => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL;
      const url = `${server}/governance/pexels?text=${searchPexels}&page=${pageSearch}`
      setLoading(true)
      const res = await fetch(url,{
        method: 'get',
        credentials: 'include'
      })
      if (res.ok) {
        const photos = await res.json();
        setPexelsImage(photos);
        setLoading(false);
      } else {
        const error = await res.json();
        setMessage({value: error.msg, status: 'error'});
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        setMessage({value: err.message, status: 'error'})
        setLoading(false);
      }
    }
  }

  const selectOneImage = async (image:PexelsProps) => {
    setMediaInfo({
      image: image.src.original,
      isImage: true,
      width: image.width/4, 
      height: image.height/4, 
      alt: image.alt
    })
    setMessage({
      value:'Image selected successfully, click on the title to continue!',
      status: 'success',
      time: 16000})
  }

  return (
    <div className="flex-grow">
        <form onSubmit={(e) => {
          e.preventDefault()
        }} className='lg:flex h-10 items-center justify-center space-x-3'>
          <input
            type={'text'}
            placeholder="Search Pexels Image"
            value={searchPexels}
            onChange={(e) => {
              setSearchPexels(e.target.value)
            }}
            className={`${inputClass} lg:mx-3 h-10 flex-grow`}
          />
          <div className="flex items-center justify-center">
            <p className="mr-2">Page: </p>
            <input
              className={`${inputClass} h-10`}
              value={pageSearch}
              onChange={(e) => {
                setPageSearch(e.target.value)
              }}
              type={'number'}
            />
          </div>
          <button
            onClick={() => {
              searchPexelsImages()
            }}
            className={`h-9 rounded-full border border-gray-300 bg-white w-[75px] text-sm font-bold text-black`}
          >
            {loading ? (<Spinner />) : 
            (<p>Search</p>)}
          </button>
        </form>
      {pexelsImage.map((image,index) => (
        <div key={index} className='mx-2 my-4 flex justify-center'>
            <div className='max-w-[700px] w-full'>
                <div id='pexels_images' className='cursor pointer'>
                    <Image src={image.src.original} alt={image.alt} width={image.width/8}  height={image.height/8} />
                </div>
                <button className='bg-reddit_dark-brightest p-2 rounded-md'
                onClick={(e) => {
                    e.preventDefault();
                    selectOneImage(image)
                }}>
                    <p className='font-bold'>Choose</p>
                </button>
            </div>
        </div>
      ))}
    </div>
  )
}

export default PexelsImages
