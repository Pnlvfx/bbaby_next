import express from 'express';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import cors from 'cors';
import 'dotenv/config';
import userRouter from './routes/userRouter.js';
import commentRouter from './routes/commentRouter.js';
import postRouter from './routes/postRouter.js'
import VotingRoutes from './routes/VotingRoutes.js'
import CommunityRoutes from './routes/CommunityRoutes.js'
import Community from './models/Community.js';
import Post from './models/Post.js';
import governanceRouter from './routes/governanceRouter.js';
import twitterRouter from './routes/twitterRouter.js';
import compression from 'compression';

const {ATLAS_URI} = process.env
const {CORS_ORIGIN1} = process.env;
const {CORS_ORIGIN2} = process.env;
const {CLIENT_URL} = process.env

const app= express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(compression())
app.use(cors({
    origin: [CLIENT_URL,CORS_ORIGIN1, CORS_ORIGIN2],
    credentials: true,
}));

//Routes
app.use('/',userRouter)

app.use('/', postRouter)

app.use('/',commentRouter)

app.use(VotingRoutes);

app.use(CommunityRoutes)

app.use('/', twitterRouter)

app.use('/', governanceRouter)

try {
    await mongoose.connect(ATLAS_URI, {useNewUrlParser:true,useUnifiedTopology:true,});
} catch (error) {
    console.log(error)
}

app.get('/', (req, res) => {
    res.send('This is Bbabystyle API');
});

app.get('/search', (req, res) => {
    const {phrase,community} = req.query;
    Post.find({title: {$regex: '.*'+phrase+'.*'}}).sort({postedAt: -1}).then(posts => {
        Community.find({name:{$regex: '.*'+phrase+'.*'}}).then(communities => {
            res.json({posts});
        })
    })
});

app.get('/sitemaps', async(req,res) => {
    try {
        const posts = await Post.find({}).sort({createdAt: -1})
        if(!posts) return res.status(500).json({msg: "For some reason we are not able to provide you this sitemaps, we will try to fix the problem as soon as possible"})
        res.json(posts)   
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
})

const port = process.env.PORT || 4000;

const server = app.listen(port);