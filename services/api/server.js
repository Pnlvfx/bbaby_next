import express from 'express';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import cors from 'cors';
import 'dotenv/config';
import cloudinary from './utils/cloudinary.js';
import Comment from './models/Comment.js';
import router from './routes/userRouter.js';
import VotingRoutes from './routes/VotingRoutes.js'
import CommunityRoutes from './routes/CommunityRoutes.js'
import Community from './models/Community.js';
import {getUserFromToken} from './controllers/UserFunctions.js'

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

app.use('/',router)

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

app.post('/comments/image', async(req,res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr,{
            upload_preset: 'bbaby_avatar'
        })
        //console.log(uploadedResponse)
        res.json({url:uploadedResponse.secure_url})
    } catch (error) {
        console.error(error)
        res.status(500).json({err:'something went wrong'})
    }
})






app.post('/logout', (req, res) => {
    //res.cookie('token', '').send();
    res.clearCookie('token',{
        domain: '.bbabystyle.com',
        secure: true
    }).send()
});


// app.get('/comments/count', (req,res) => {
//     Comment.find({}).then(comments => {
//         res.json(comments.length)
//     })
// })


app.get('/comments', (req, res) => {
    //console.log(req.query)
    const {search,community,limit,skip} = req.query;
    let filters = search 
    ? {body: {$regex: '.*'+search+'.*'}}
    : {rootId:null};

    if (community) {
        filters.community = community;
    }

    Comment.find(filters).sort({postedAt: -1}).limit(limit).skip(skip).then(comments => {
        //console.log(comments)
        res.json(comments);
    })
});

app.delete('/comments/delete/:id', async(req,res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)

        res.json({msg: "Deleted Success"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})



app.get('/comments/root/:rootId', async (req, res) => {
    Comment.find({rootId:req.params.rootId}).sort({postedAt: -1}).then(comments => {
        res.json(comments);
    });  
});

app.get('/search', (req, res) => {
    const {phrase,community} = req.query;
    Comment.find({title: {$regex: '.*'+phrase+'.*'}}).sort({postedAt: -1}).then(comments => {
        Community.find({name:{$regex: '.*'+phrase+'.*'}}).then(communities => {
            res.json({comments});
        })
    })
});

app.get('/comments/root/:rootId', async (req, res) => {
    Comment.find({rootId:req.params.rootId}).sort({postedAt: -1}).then(comments => {
        res.json(comments);
    });  
});

app.get('/comments/length/:rootId', async (req, res) => {
    Comment.find({rootId:req.params.rootId}).then(comments => {
        res.json(comments.length);
    });  
});


app.get('/comments/:id', async (req, res) => {
    Comment.findById(req.params.id).then(comment => {
        res.json(comment);
    });
}) 

app.post('/comments', async (req, res) => {
  try {
    const token = req.cookies.token;
    if(!token) {
        res.sendStatus(401);
        return;
    }
    getUserFromToken(token)
    .then(userInfo => {
    const {title,body,image,parentId,rootId,community,communityIcon,isImage} = req.body;
    
    const comment = new Comment({
        title,
        body,
        image,
        community,
        communityIcon,
        author:userInfo.username,
        authorAvatar:userInfo.avatar,
        postedAt:new Date(),
        parentId,
        rootId,
        isImage,
    });
    comment.save().then(savedComment => {
        //console.log(savedComment)
        res.json(savedComment);
    }).catch();
    })
    .catch(() => {
        res.sendStatus(401);
    })
  } catch {

  }
})

const port = process.env.PORT || 4000;

app.listen(port);
 