import express from 'express';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import cors from 'cors';
import 'dotenv/config';
import cloudinary from './utils/cloudinary.js';
import Comment from './models/Comment.js';
import userRouter from './routes/userRouter.js';
import commentRouter from './routes/commentRouter.js';
import postRouter from './routes/postRouter.js'
import VotingRoutes from './routes/VotingRoutes.js'
import CommunityRoutes from './routes/CommunityRoutes.js'
import Community from './models/Community.js';
import Post from './models/Post.js';

const uri = process.env.ATLAS_URI;

const origin1 = process.env.CORSORIGIN1;
const origin2 = process.env.CORSORIGIN2;

const app= express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors({
    origin: [origin1, origin2],
    credentials: true,
}));

//Routes

app.use('/',userRouter)

app.use('/', postRouter)

app.use('/',commentRouter)

app.use(VotingRoutes);

app.use(CommunityRoutes)


await mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology:true,});
const db = mongoose.connection;
db.on('error', console.log);



app.get('/', (req, res) => {
    res.send('This is Bbabystyle API');
});



app.post('/upload_avatar', async(req,res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr,{
            upload_preset: 'bbaby_avatar'
        })
        //console.log(uploadedResponse)
        res.json({msg: uploadedResponse.secure_url})
    } catch (error) {
        console.error(error)
        res.status(500).json({err:'something went wrong'})
    }
})

app.get('/search', (req, res) => {
    const {phrase,community} = req.query;
    Post.find({title: {$regex: '.*'+phrase+'.*'}}).sort({postedAt: -1}).then(posts => {
        Community.find({name:{$regex: '.*'+phrase+'.*'}}).then(communities => {
            res.json({posts});
        })
    })
});

const port = process.env.PORT || 4000;

app.listen(port);
 