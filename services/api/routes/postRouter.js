import express from 'express';
import PostCtrl from '../controllers/post/postCtrl.js';

const postRouter = express.Router();

postRouter.get('/posts', PostCtrl.getPosts)

postRouter.get('/posts/:id', PostCtrl.getPost)

postRouter.post('/posts/image', PostCtrl.addImage)

postRouter.post('/posts', PostCtrl.createPost)

postRouter.delete('/posts/:id', PostCtrl.deletePost)

export default postRouter;