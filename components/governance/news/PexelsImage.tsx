import React, { useState } from 'react'
import { catchErrorWithMessage } from '../../API/common'
import { useMessage } from '../../main/TimeMsgContext'
import { Spinner } from '../../utils/buttons/Button'
import { useNewsProvider } from './NewsContext'
import { PexelsImagesProps } from './PexelsImages'

interface PexelsImageProps extends PexelsImagesProps {
  image: PexelsProps
}

const PexelsImage = ({ image, openSubmit }: PexelsImageProps) => {
  const message = useMessage()
  const [loading, setLoading] = useState(false)
  const { setMediaInfo } = useNewsProvider()
  const selectOneImage = async (image: PexelsProps) => {
    try {
      if (loading) return
      setLoading(true)
      setMediaInfo({
        image: image.src.original,
        isImage: true,
        width: image.width,
        height: image.height,
        alt: image.alt,
      })
      await openSubmit()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      catchErrorWithMessage(err, message)
    }
  }
  return (
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
          {loading && (
            <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
              <Spinner width={50} height={50} color={'black'} />
            </div>
          )}
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
  )
}

export default PexelsImage
