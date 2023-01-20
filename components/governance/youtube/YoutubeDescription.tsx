import { useState } from 'react'

type YoutubeDescriptionProps = {
  description: string
  descriptionArrayToSend: string[]
}

const YoutubeDescription = ({ description, descriptionArrayToSend }: YoutubeDescriptionProps) => {
  const [selected, setSelected] = useState(false)
  const tooLong = description.length >= 300 ? true : false

  const select = () => {
    if (tooLong) return
    if (selected) {
      setSelected(false)
      descriptionArrayToSend.splice(descriptionArrayToSend.indexOf(description), 1)
    } else {
      setSelected(true)
      descriptionArrayToSend.push(description)
    }
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        select()
      }}
      className={`mb-3 border ${selected ? 'border-reddit_blue' : tooLong ? 'border-red-900' : 'border-reddit_border'}`}
    >
      <p>{description}</p>
    </button>
  )
}

export default YoutubeDescription
