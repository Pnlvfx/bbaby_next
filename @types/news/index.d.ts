interface mediaInfoProps {
    isImage?: boolean
    isVideo?: boolean
    image: string
    video?: string
    width: number
    height: number
    alt: string
}

interface NewsProps {
    title: string
    description: string
    full_description: string
    createdAt: Date
    _id: string
    mediaInfo: mediaInfoProps
}