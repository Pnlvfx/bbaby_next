import express from 'express';
import Community from '../models/Community.js';
import {getUserFromToken} from '../controllers/user/UserFunctions.js'

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
            const community = await Community.findOne({name})
            if (user.username === community.communityAuthor) {
                const edit = await Community.findOneAndUpdate({name}, {user_is_moderator: true})
            }
            res.json(community);
        } else {
            const community = await Community.findOne({name})
            res.json(community);
        }   
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
});


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