import Post from '../../models/Post.js'
import TelegramBot from 'node-telegram-bot-api'
import Comment from '../../models/Comment.js'
import {getUserFromToken} from '../user/UserFunctions.js'
import cloudinary from '../../utils/cloudinary.js';
import 'dotenv/config';
import User from '../../models/User.js';
import {TwitterApi} from 'twitter-api-v2';


const PostCtrl = {
    getPosts: async (req, res) => {
        const {token} = req.cookies
        const userLang = req.acceptsLanguages('en','it')
        const {community, author, limit, skip} = req.query;
            if(token) {
                const user = await getUserFromToken(token)
                // VOTING REALTIME
                const userNullVote = await Post.find({_id : {'$nin': user.downVotes && user.upVotes}}).updateMany({"liked" : "null"})
                const userUpVote = await Post.find({_id : {'$in': user.upVotes}}).updateMany({"liked" : "true"})
                const userDownVote = await Post.find({_id : {'$in': user.downVotes}}).updateMany({"liked" : "false"})
                //
            }
            
            if(!token) {
                const nullVote = await Post.find({}).updateMany({'liked' : null})
            }
        let filters = {}

        if (!community && !author) {
            if (userLang === 'en') {
                filters.community = {'$nin': ['Italy', 'calciomercato']}
            }
            if (userLang === 'it') {
                filters.community =  ['Italy', 'calciomercato']
            }
        } else if (community) {
            filters.community = community
        } else if (author) {
            filters.author = author
        }

        const posts = await Post.find(filters).sort({createdAt: -1}).limit(limit).skip(skip)
        res.json(posts)
    },
    getPost: async (req,res) => {
            const {token} = req.cookies
            const {id} = req.params
            if (!token) {
                const post = await Post.findByIdAndUpdate(id, {'liked': 'null' })
                res.json(post)    
            } else {
                const user = await getUserFromToken(token)
                let filters = {username: user.username, upVotes: id}
                 const userUpVoted = User.find({filters})
                 //console.log(userUpVoted)
                // console.log(userUpVoted)
                // const userDownVoted = User.find({downVotes: {'$in': id}})
                const post = await Post.findById(id)
                res.json(post);

                
            }
    },
    addImage: async (req,res) => {
        try {
            const fileStr = req.body.data
            const uploadedResponse = await cloudinary.uploader.upload(fileStr,{
                upload_preset: 'bbaby_avatar'
            })
            
            res.json({url:uploadedResponse.secure_url, imageId: uploadedResponse.public_id })
        } catch (err) {
            res.status(500).json({err:'something went wrong'})
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
            const {title,body,image,community,communityIcon,isImage,imageHeight,imageWidth,imageId,sharePostToTG,sharePostToTwitter} = req.body
            const post = await new Post({
                author:user.username,
                authorAvatar:user.avatar,
                title,
                body,
                image,
                community,
                communityIcon,
                imageId,
                mediaInfo: {
                    dimension: [imageHeight,imageWidth],
                    isImage: isImage
                }
            })
            const savedPost = await post.save()
            if(sharePostToTG) {
                const telegramToken = process.env.TELEGRAM_TOKEN
                const bot = new TelegramBot(telegramToken, {polling: true});
                const chat_id = savedPost.community === 'Italy' ? '@anonynewsitaly' : savedPost.community === 'calciomercato' ? '@bbabystyle1' : '@bbaby_style'
                const my_text = `https://bbabystyle.com/b/${savedPost.community}/comments/${savedPost._id}`
                const message = await bot.sendMessage(chat_id, my_text)
            }
            if(sharePostToTwitter) {
                const {oauth_access_token, oauth_access_token_secret} = user.tokens
                if (!oauth_access_token && oauth_access_token_secret) {
                    return res.status(500).json({msg:'You need to access to your twitter account first'})
                }
                const {role} = user
                if(oauth_access_token && oauth_access_token_secret) {
                    if (role === '0') { //NORMAL USER
                        const twitterClient = new TwitterApi({
                            appKey: process.env.TWITTER_CONSUMER_KEY,
                            appSecret: process.env.TWITTER_CONSUMER_SECRET,
                            accessToken: oauth_access_token,
                            accessSecret: oauth_access_token_secret,
                        });
                        const response = await twitterClient.v1.tweet(`bbabystyle.com/b/${savedPost.community}/comments/${savedPost._id}`)
                    } else { //GOVERNANCE
                        if (savedPost.community === 'Italy') {
                            const twitterClient = new TwitterApi({
                                appKey: process.env.TWITTER_CONSUMER_KEY,
                                appSecret: process.env.TWITTER_CONSUMER_SECRET,
                                accessToken: process.env.ANON_ACCESS_TOKEN,
                                accessSecret:process.env.ANON_ACCESS_TOKEN_SECRET,
                            });
                            const response = await twitterClient.v1.tweet(`bbabystyle.com/b/${savedPost.community}/comments/${savedPost._id}`)
                        } else if (savedPost.community === 'calciomercato') {
                            const twitterClient = new TwitterApi({
                                appKey: process.env.TWITTER_CONSUMER_KEY,
                                appSecret: process.env.TWITTER_CONSUMER_SECRET,
                                accessToken: process.env.BBABYITALIA_ACCESS_TOKEN,
                                accessSecret:process.env.BBABYITALIA_ACCESS_TOKEN_SECRET,
                            });
                            const response = await twitterClient.v1.tweet(`bbabystyle.com/b/${savedPost.community}/comments/${savedPost._id}`)
                        } else {
                            const twitterClient = new TwitterApi({
                                appKey: process.env.TWITTER_CONSUMER_KEY,
                                appSecret: process.env.TWITTER_CONSUMER_SECRET,
                                accessToken: process.env.BBABY_ACCESS_TOKEN,
                                accessSecret:process.env.BBABY_ACCESS_TOKEN_SECRET,
                            });
                            const response = await twitterClient.v1.tweet(`bbabystyle.com/b/${savedPost.community}/comments/${savedPost._id}`)
                        }
                    }
                    
                }
            }
            if(savedPost) {
                res.json(savedPost)
            } else {
                res.sendStatus(401)
            }
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    voting: async (req,res) => {
        try {
            const {token} = req.cookies
            if(!token) {
                res.status(401).json({msg: "You need to be logged for vote this post"})
                return;
            }
            const user = await getUserFromToken(token)
            const {id} = req.params
            const {dir} = req.body

            const userVotedUp = await User.findOne({username: user.username, upVotes: id})
            const userVotedDown = await User.findOne({username: user.username, downVotes: id})

            if (userVotedUp) {
                if(dir === '1') {   //delete existing upvote and add +1 
                    const deletePrevVote = await User.findOneAndUpdate({upVotes: id}, {$pull: {upVotes: id}})
                    const post = await Post.findByIdAndUpdate(id, {$inc : {'ups' : -1}})
                    //const liked = await Post.findByIdAndUpdate(id,{liked: true})
                    res.status(200).json({vote: post.ups -1})
                } else {
                    const deletePrevVote = await User.findOneAndUpdate({upVotes: id}, {$pull: {upVotes: id}})
                    const userVote = await User.findOneAndUpdate({username: user.username},{$push: {downVotes: id}})
                    const post = await Post.findByIdAndUpdate(id, {$inc : {'ups' : -2}})
                    res.status(200).json({vote: post.ups -2})
                }
            } else if(userVotedDown) {
                if(dir === '1') {
                    const deletePrevVote = await User.findOneAndUpdate({downVotes: id}, {$pull: {downVotes: id}})
                    const userVote = await User.findOneAndUpdate({username: user.username},{$push: {upVotes : id}})
                    const post = await Post.findByIdAndUpdate(id, {$inc : {'ups' : +2}})
                    res.status(200).json({vote: post.ups +2})
                } else  {
                    const deletePrevVote = await User.findOneAndUpdate({downVotes: id}, {$pull: {downVotes: id}})
                    const post = await Post.findByIdAndUpdate(id, {$inc : {'ups' : +1}})
                    res.status(200).json({vote: post.ups +1})
                }
            } else {
                if(dir === '1') {
                    const userVote = await User.findOneAndUpdate({username: user.username},{$push: {upVotes : id}})
                    const post = await Post.findByIdAndUpdate(id, {$inc : {'ups' : +1}})
                    res.status(200).json({vote: post.ups + 1})
                } else {
                    const post = await Post.findByIdAndUpdate(id, {$inc : {'ups' : -1}})
                    const userVote = await User.findOneAndUpdate({username: user.username},{$push: {downVotes: id}})
                    res.status(200).json({vote: post.ups -1})
                }
            }
            
        } catch (err) {
            res.status(500).json({msg: err})
        }
    },
    deletePost: async (req,res) => { //and comments related
        try {
            const {id} = req.params
            const findPost = await Post.findByIdAndDelete(id)
            if(findPost.isImage) {
                const deleteImage = await cloudinary.uploader.destroy(findPost.imageId)
            }
            const findChildComments = await Comment.deleteMany({rootId:id})
            res.json({msg: "Deleted Success"})
        } catch (err) {
            return res.status(500).json({msg: err})
        }
    },
}

export default PostCtrl;