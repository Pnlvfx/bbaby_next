import express from 'express'
import governanceCtrl from '../controllers/governance/governanceCtrl.js'

const governanceRouter = express.Router()

governanceRouter.get('/admin/create-image', governanceCtrl.createImage)

governanceRouter.get('/admin/create-video', governanceCtrl.createVideo)

governanceRouter.post('/governance/translate-tweet', governanceCtrl.translateTweet)

governanceRouter.post('/admin/youtube', governanceCtrl.uploadYoutube)

export default governanceRouter;