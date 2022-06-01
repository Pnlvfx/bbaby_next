import Post from '../../models/Post.js'
import {getUserFromToken} from '../user/UserFunctions.js'

const PostCtrl = {
    getPosts: async (req, res) => {
        const {search, community, limit, skip} = await req.query;
        let filters = search ? {body: {regex: '.*'+search+'.*'}} : {}

        if (community) {
            filters.community = community
        }
        const posts = await Post.find(filters).sort({createdAt: -1}).limit(limit).skip(skip)
        res.json(posts)
    },
    getPost: async (req,res) => {
            const {id} = req.params
            const post = await Post.findById(id)
            res.json(post);
    },
    addImage: async (req,res) => {
        try {
            
        } catch (err) {
            
        }
    },
    createPost: async (req, res) => {
        try {
            const {token} = req.cookies
            if(!token) {
                res.sendStatus(401);
                return;
            }
            const user = await getUserFromToken(token)
            const {title,body,image,parentId,rootId,community,communityIcon,isImage} = req.body;

            const post = await new Post({
                author:user.username,
                authorAvatar:user.avatar,
                title,
                body,
                image,
                community,
                communityIcon,
                parentId,
                rootId,
                isImage
            })
            const savedPost = await post.save()
            if(savedPost) {
                res.json(savedPost)
            } else {
                res.sendStatus(401)
            }
        } catch (err) {
            
        }
    },
    deletePost: async (req,res) => {
        try {
            const id = req.params.id
            const find = await Post.findByIdAndDelete(id)
            res.json({msg: "Deleted Success"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

export default PostCtrl;