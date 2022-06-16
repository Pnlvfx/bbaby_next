import express from 'express';
import Community from '../models/Community.js';
import {getUserFromToken} from '../controllers/user/UserFunctions.js'
import cloudinary from '../utils/cloudinary.js';
import Post from '../models/Post.js'

const router = express.Router();

router.post('/communities', (req,res) => {
    const {name,communityAvatar,cover} = req.body;
    Community.exists({name}).then(exists => {
        if(exists) {
            res.json('This community name already exists');
        } else {
            getUserFromToken(req.cookies.token).then(userInfo => {
            const community =  new Community({name,communityAvatar,cover,communityAuthor:userInfo.username,createdAt:new Date()});
             community.save().then(() => {
               res.status(201).json('You have successfully create a new Community');
            });
           });
        }
    })
});

router.get('/communities/:name', async (req,res) => {
    try {
        const token = req.cookies?.token ///MY EDIT
        const {name} = req.params;
        if (token) {
            const user = await getUserFromToken(token)
            const comm = await Community.findOne({name})
            if (user.username === comm.communityAuthor || user.role === 1) {
                const edit = await Community.findOneAndUpdate({name}, {user_is_moderator: true})
                const community = await Community.findOne({name})
                res.json(community);
            } else {
                const edit = await Community.findOneAndUpdate({name}, {user_is_moderator: false})
                const community = await Community.findOne({name})
                res.json(community);
            }
        } else {
            const edit = await Community.findOneAndUpdate({name}, {user_is_moderator: false})
            const community = await Community.findOne({name})
            res.json(community);
        }   
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
});

router.post('/communities/:name/change_avatar', async(req,res) => {
    try {
        const {image} = req.body
        const {name} = req.params
        const uploadedResponse = await cloudinary.v2.uploader.upload(image, {
            height: 256, width: 256, crop: "scale"
        })
        const community = await Community.findOneAndUpdate({name}, {communityAvatar: uploadedResponse.secure_url})
        const postThumb = await Post.updateMany({community: name}, {$set: {communityIcon: uploadedResponse.secure_url}})

        res.json({msg: "Image updated successfully"})
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
})


router.get('/communities/edit/:name', (req,res) => {
    const {name} = req.params;
    Community.findOne({name}).then(c => {
        res.json(c);
    })
});

router.post('/communities/edit/description', (req,res) => {
    const {name,description} = req.body;
    //console.log(req.body)
    Community.findOne({name}).updateOne({description}).then(() => {
        res.json('Description update successfully');
    })
});


router.get('/communities', (req,res) => {
    const {limit} = req.query
    Community.find({}).limit(limit).then(communities => {
        res.json(communities);
    })
});

export default router;