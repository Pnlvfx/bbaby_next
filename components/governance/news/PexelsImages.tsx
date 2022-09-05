import Image from 'next/image';
import { useContext, useState } from 'react';
import { catchErrorWithMessage } from '../../API/common';
import { translate } from '../../API/governance/governanceAPI';
import { searchPexelsImages } from '../../API/governance/governanceNewsAPI';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';
import { Spinner } from '../../utils/Button';
import { inputClass } from '../../utils/Input';
import { LinkPreviewLoader } from '../../utils/LinkPreview';
import { NewsContext, NewsContextProps } from './NewsContext';

const PexelsImages = () => {
  const [searchPexels, setSearchPexels] = useState('');
  const [pageSearch, setPageSearch] = useState('1');
  const [loading,setLoading] = useState<JSX.Element | null>(null!);
  const [pexelsImage, setPexelsImage] = useState<PexelsProps[] | []>([]);
  const {originalTitle, originalDescription, setTitle, setDescription, setlevel, setMediaInfo} = useContext(NewsContext) as NewsContextProps;
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;

  const dosearchPexels = async () => {
    try {
      setLoading(<LinkPreviewLoader />)
      const photos = await searchPexelsImages(searchPexels, pageSearch);
      setPexelsImage(photos);
      setLoading(null);
    } catch (err) {
      catchErrorWithMessage(err, message);
    }
  }

  const openSubmit = async () => {
    const res1 = await translate(originalTitle, 'en')
    const res2 = await translate(originalDescription, 'en')
    if (res1?.ok && res2?.ok) {
      if (res1 instanceof Response && res2 instanceof Response) {
        const title = await res1.json();
        const description = await res2.json();
        setTitle(title);
        setDescription(description)
        setlevel('submit')
      }
    } else {
      if (res1 instanceof Response && res2 instanceof Response) {
        const error = await res1.json();
        message.setMessage({value: error.msg, status: 'error'})
      } else {
        const error:any = res1
        message.setMessage({value: error.msg, status: 'error'})
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
    openSubmit();
  }

  return (
    <div className="flex-grow">
      <div className='p-2 lg:ml-3'>
        <form
          className='flex items-center justify-center space-x-3 mb-4'
          onSubmit={(e) => {
            e.preventDefault()
          }}>
          <input
            type={'text'}
            placeholder="Search Image"
            value={searchPexels}
            onChange={(e) => {
              setSearchPexels(e.target.value)
            }}
            className={`${inputClass} h-10 flex-grow`}
          />
          <button
            className={`h-9 rounded-full border border-gray-300 bg-white w-[75px] text-sm font-bold text-black`}
            onClick={() => {
              dosearchPexels()
            }}
          >
            {loading ? (<Spinner />) : 
            (<p>Search</p>)}
          </button>
        </form>
      {pexelsImage.length >= 2 ? pexelsImage.map((image, index) => (
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
      )) : 
      <div>
        <p>Search your image</p>
      </div>
      }
      </div>
    </div>
  )
}

export default PexelsImages;

