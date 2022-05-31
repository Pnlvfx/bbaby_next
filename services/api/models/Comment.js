import { timeStamp } from "console";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
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
    postedAt: {
        type:Date,
        required:true
    },
    parentId: {
        type:mongoose.ObjectId,
        required:false
    },
    rootId: {
        type:mongoose.ObjectId,
        required:false
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
},
{
    timestamps:true
}
);
const Comment = mongoose.model('Comment', schema);

export default Comment;