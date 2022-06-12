import express from 'express';
import twitterCtrl from '../controllers/twitter/twitterCtrl.js';

const twitterRouter = express.Router();

twitterRouter.post('/twitter/oauth/request_token', twitterCtrl.twitterReqToken)

twitterRouter.post('/twitter/oauth/access_token', twitterCtrl.twitterAccessToken)

twitterRouter.get('/twitter/user/info', twitterCtrl.twitterUserInfo)

twitterRouter.get('/twitter/selected-tweets', twitterCtrl.twitterGetUserPost)

twitterRouter.post('/twitter/logout', twitterCtrl.twitterLogout)

export default twitterRouter;