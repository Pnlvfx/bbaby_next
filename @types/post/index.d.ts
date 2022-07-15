type Postprops = {
    post: {
      _id: string
      author:string
      authorAvatar: string
      title:string
      body:string
      community:string
      communityIcon: string
      mediaInfo: {
        dimension: Array
        isImage: boolean
        isVideo: boolean
        image: string
        video: [{
          url: string,
          thumbnail: string
        }]
      }
      ups: number
      liked: string
      numComments: number
      createdAt: Date
      }
}

type PostProps = {
    _id: string
    author:string
    authorAvatar: string
    title:string
    body:string
    community:string
    communityIcon: string
    mediaInfo: {
      dimension: Array
      isImage: boolean
      isVideo: boolean
      image: string
      video: {
        url: string,
        thumbnail: string
      }
    }
    ups: number
    liked: string
    numComments: number
    createdAt: Date
    }