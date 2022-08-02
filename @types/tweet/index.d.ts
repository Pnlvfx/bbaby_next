interface TweetProps {
    created_at: Date
    id: string
    full_text: string
    extended_entities?: {
        media: MediaProps[]
    }
    user: {
        name: string
        screen_name: string
        profile_image_url_https: string
    }
}


interface MediaProps {
    type : string
    video_info: {
        variants: Array
    }
    media_url_https: string
    sizes: {
        large: {
            h: number
            w: number
        }
    }
}