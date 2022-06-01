import Comment from '../../models/Comment.js'
import {getUserFromToken} from '../user/UserFunctions.js'

const commentCtrl = {
    createComment: async (req,res) => {
        try {
            const {token} = req.cookies
            if(!token) {
                res.sendStatus(401);
                return;
            }
            const user = await getUserFromToken(token)
            const {body,parentId,rootId} = req.body;
            const comment = await new Comment({
                author:user.username,
                authorAvatar:user.avatar,
                body,
                parentId,
                rootId,
            })
            const savedComment = await comment.save()
            if(savedComment) {
                res.json(savedComment)
            } else {
                res.sendStatus(401)
            }
        } catch (err) {

        }
    },
    childComments: async (req,res) => {
        const {rootId} = req.params
        const comments = await Comment.find({rootId:rootId}).sort({createdAt: -1})
        res.json(comments)
    }
}

export default commentCtrl;