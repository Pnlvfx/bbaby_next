type Postprops = {
    post: {
        author:string,
        title:string,
        body:string,
        image: string,
        ups: number,
        _id: string,
        liked: string,
        community:string,
        communityIcon: string,
        numComments: number,
        createdAt: Date,
    
        mediaInfo: {
          dimension: any,
        }
    
      }
      isListing?:Boolean,
      open? : Boolean
}