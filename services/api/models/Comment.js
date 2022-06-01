import mongoose from "mongoose";

const {ObjectId} = mongoose

const CommentSchema = new mongoose.Schema({
    author: 
        {type:String,
        required:true
    },
    authorAvatar: 
        {type:String,
        required:true
    },
    body: {
        type:String,
        required:true
    },
    parentId: {
        type:ObjectId,
        required:false
    },
    rootId: {
        type:ObjectId,
        required:false
    },
},
{
    timestamps:true
}
);
const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;