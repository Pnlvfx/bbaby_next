import express from 'express';
import Community from '../models/Community.js';
import {getUserFromToken} from '../controllers/user/UserFunctions.js'
import cloudinary from '../utils/cloudinary.js';
import Post from '../models/Post.js'
import User from '../models/User.js';

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

router.get('/communities', (req,res) => {  ///WITHOUT SORT OR SUBSCRIBED INFORMATION
    const {limit} = req.query
    Community.find({}).sort({}).limit(limit).then(communities => {
        res.json(communities);
    })
});

router.get('/best-communities', async(req,res) => {  ///WITH SORT AND SUBSCRIBED INFORMATION
    const token = req.cookies?.token
    const {limit} = req.query
    const sort = {number_of_posts: -1}
    const notSub = await Community.updateMany({}, {user_is_subscriber: false}).sort(sort).limit(limit)
    if (token) {
        const user = await getUserFromToken(token)
        const subscribed = await Community.updateMany({name: user.subscribed}, {user_is_subscriber: true}).sort(sort).limit(limit)
    }
    const communities = await Community.find({}).sort(sort).limit(limit)
    res.json(communities);
});



router.post('/communities/subscribe', async(req,res) => {
    const {token} = req.cookies
    const {community} = req.body
    if(!token) {
        return res.sendStatus(401);
    }
    const user = await getUserFromToken(token)
    const check = await User.findOne({username: user.username, subscribed: community})
    if (check) { //UNSUBSCRIBE
        const unsubscribe = await User.findOneAndUpdate({username: user.username}, {$pull: {subscribed: community}})
        const subscribedCount = await Community.findOneAndUpdate({name: community}, {$inc: {subscriberCount: -1}})
        res.json({msg: `You have unfollowed ${community}`})
    } else {
        const subscribe = await User.findOneAndUpdate({username: user.username}, {$push: {subscribed: community}})
        const subscribedCount = await Community.findOneAndUpdate({name: community}, {$inc: {subscriberCount: +1}})
        res.json({msg: `You now follow ${community}`})
    }
    
})

export default router;