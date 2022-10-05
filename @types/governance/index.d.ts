interface InputProps {
    images: Array<any>
    video: string
    localImages: Array<any>
    audio: Array<any>
    finalAudio: string
    height: number
    width: number
    title: string
    description: string
    keywords: string
    category: string
    privacyStatus: string
    msg: string
}

type VideoOptionsProps = {
    fps: string
    transition: string
    transitionDuration: string
  }

  interface PexelsProps {
    id: number
    width: number
    height: number
    url: string
    photographer: string
    photographer_url: stringstring
    photographer_id: number
    avg_color: string
    src: {
        landscape: string
        large: string
        medium: string
        original: string
        potrait: string
        small: string
        tiny: string
    },
    liked: false,
    alt: string
  }

  type modalType = 'create_image' | 'create_video'


  type ValueProps = {
    textColor: string
    fontSize: string
    format: string
  }