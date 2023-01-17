interface NewTiktakResponse {
  original_body: string
  body: string
  permalink: string
  _id: string
}

interface GetTiktakResponse {
  tiktak: TiktakProps
  videos: PexelsProps[]
}

interface TiktakProps {
  original_body: string
  body: string
  permalink: string
  audio: string
  duration: number
  background_video: string
  images: FFmpegImage[]
  audios: string[]
  video: string
  _id: string
  createdAt: string
  updatedAt: string
}

interface FFmpegImage {
  path: string
  loop: number
}
