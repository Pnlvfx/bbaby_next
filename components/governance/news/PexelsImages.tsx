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
      setLoading(null);
    }
  }

  const openSubmit = async () => {
    try {
      const title = await translate(originalTitle, 'en');
      const description = await translate(originalDescription, 'en');
      setTitle(title);
      setDescription(description)
      setlevel('submit')
    } catch (err) {
      catchErrorWithMessage(err, message);
    }
  }

  const selectOneImage = async (image: PexelsProps) => {
    setMediaInfo({
      image: image.src.original,
      isImage: true,
      width: image.width/4, 
      height: image.height/4, 
      alt: image.alt
    })
    await openSubmit();
  }

  return (
    <div className="lg:mx-2 block">
      <div className=''>
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
      {pexelsImage.length >= 2 ? pexelsImage.map((image) => (
        <div key={image.id} className='mx-2 my-4 flex justify-center'>
            <div className='max-w-[700px] w-full'>
              <figure
                title='choose'
                className='relative bg-reddit_dark-brighter box-border block cursor-pointer'
                onClick={(e) => {
                  e.preventDefault();
                  selectOneImage(image);
                }}
              >
                <img
                  src={image.src.medium}
                  alt={image.alt} 
                  width={image.width}  
                  height={image.height}
                />
              </figure>
              <button 
                className='bg-reddit_dark-brightest p-2 rounded-md'
                onClick={async (e) => {
                    e.preventDefault();
                    await selectOneImage(image)
                }}
              >
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

