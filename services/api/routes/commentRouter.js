import express from 'express';
import commentCtrl from '../controllers/comment/commentCtrl.js'

const commentRouter = express.Router();

commentRouter.post('/comments', commentCtrl.createComment)

commentRouter.get('/comments/root/:rootId', commentCtrl.childComments)

export default commentRouter