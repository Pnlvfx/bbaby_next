import express from 'express'
import governanceCtrl from '../controllers/governance/governanceCtrl.js'

const governanceRouter = express.Router()

governanceRouter.get('/governance/create-image', governanceCtrl.createImage)

governanceRouter.get('/governance/create-video', governanceCtrl.createVideo)

governanceRouter.post('/governance/translate-tweet', governanceCtrl.translateTweet)

governanceRouter.post('/admin/youtube', governanceCtrl.uploadYoutube)

export default governanceRouter;