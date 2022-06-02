import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    author: 
        {type:String,
        required:true
    },
    authorAvatar: 
        {type:String,
        required:true
    },
    title: 
        {type:String,
        required:true
    },
    body: {
        type:String
    },
    image: {
        type:String
    },
    community: {
        type:String,
        required:true
    },
    communityIcon: {
        type:String,
        required:true
    },
    isImage: {
        type:Boolean,
        default:false
    },
    numComments: {
        type:Number,
        default: '0'
    },
    ups: {
        type:Number,
        default: '0'
    },
},
{
    timestamps:true
}
);
const Post = mongoose.model('Post', PostSchema);

export default Post;