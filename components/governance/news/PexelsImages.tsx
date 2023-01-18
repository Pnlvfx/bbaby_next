import { useState } from 'react'
import { catchErrorWithMessage } from '../../API/common'
import { searchPexelsImages } from '../../API/governance/governanceNewsAPI'
import { useMessage } from '../../main/TimeMsgContext'
import { Spinner } from '../../utils/Button'
import { LinkPreviewLoader } from '../../utils/LinkPreview'
import { useNewsProvider } from './NewsContext'

interface PexelsImagesProps {
  openSubmit: () => Promise<void>
}

const PexelsImages = ({ openSubmit }: PexelsImagesProps) => {
  const [searchPexels, setSearchPexels] = useState('')
  const [loadingResearch, setLoadingResearch] = useState<JSX.Element | null>(null!)
  const [pexelsImage, setPexelsImage] = useState<PexelsProps[] | []>([])
  const { setMediaInfo } = useNewsProvider()
  const message = useMessage()
  const [loadingChoose, setLoadingChoose] = useState(false)

  const dosearchPexels = async () => {
    try {
      setLoadingResearch(<LinkPreviewLoader />)
      const photos = await searchPexelsImages(searchPexels)
      setPexelsImage(photos)
      setLoadingResearch(null)
    } catch (err) {
      setLoadingResearch(null)
      catchErrorWithMessage(err, message)
    }
  }

  const selectOneImage = async (image: PexelsProps) => {
    try {
      if (loadingChoose) return
      setLoadingChoose(true)
      setMediaInfo({
        image: image.src.original,
        isImage: true,
        width: image.width,
        height: image.height,
        alt: image.alt,
      })
      await openSubmit()
      setLoadingChoose(false)
    } catch (err) {
      setLoadingChoose(false)
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
          {loadingResearch ? <Spinner /> : <p>Search</p>}
        </button>
      </form>
      {pexelsImage.length >= 1 ? (
        pexelsImage.map((image) => (
          <div key={image.id} className="mx-2 my-4 flex justify-center">
            <div className="w-full max-w-[700px]">
              <picture
                title="choose"
                className="relative box-border block cursor-pointer bg-reddit_dark-brighter"
                onClick={(e) => {
                  e.preventDefault()
                  selectOneImage(image)
                }}
              >
                <img src={image.src.medium} alt={image.alt} width={image.width} height={image.height} />
              </picture>
              <button
                className="rounded-md bg-reddit_dark-brightest p-2"
                onClick={(e) => {
                  e.preventDefault()
                  selectOneImage(image)
                }}
              >
                <p className="font-bold">Choose</p>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>Search your image</p>
        </div>
      )}
    </div>
  )
}

export default PexelsImages
