import { useState } from 'react'
import { catchErrorWithMessage } from '../../API/common'
import govnewsapi from '../../API/governance/govnewsapi'
import { useMessage } from '../../main/TimeMsgContext'
import { Spinner } from '../../utils/Button'
import { LinkPreviewLoader } from '../../utils/LinkPreview'
import PexelsImage from './PexelsImage'

export interface PexelsImagesProps {
  openSubmit: () => Promise<void>
}

const PexelsImages = ({ openSubmit }: PexelsImagesProps) => {
  const [searchPexels, setSearchPexels] = useState('')
  const [loading, setLoading] = useState<JSX.Element | null>(null!)
  const [pexelsImage, setPexelsImage] = useState<PexelsProps[] | []>([])
  const message = useMessage()

  const dosearchPexels = async () => {
    try {
      setLoading(<LinkPreviewLoader />)
      const photos = await govnewsapi.searchPexelsImages(searchPexels)
      setPexelsImage(photos)
      setLoading(null)
    } catch (err) {
      setLoading(null)
      catchErrorWithMessage(err, message)
    }
  }

  return (
    <div className="block lg:mx-2">
      <form className="mb-4 flex items-center justify-center bg-reddit_dark-brighter" onSubmit={(e) => e.preventDefault()}>
        <input
          type={'text'}
          placeholder="Search Image"
          value={searchPexels}
          onChange={(e) => {
            setSearchPexels(e.target.value)
          }}
          className={`inputClass h-10 flex-grow pl-2 text-[16px] leading-6 outline-none`}
        />
        <button
          className={`mr-2 h-7 w-[75px] rounded-full border border-gray-300 bg-white text-sm font-bold text-black`}
          onClick={() => {
            dosearchPexels()
          }}
        >
          {loading ? <Spinner /> : <p>Search</p>}
        </button>
      </form>
      {pexelsImage.length >= 1 ? (
        pexelsImage.map((image) => <PexelsImage key={image.id} image={image} openSubmit={openSubmit} />)
      ) : (
        <div>
          <p>Search your image</p>
        </div>
      )}
    </div>
  )
}

export default PexelsImages
