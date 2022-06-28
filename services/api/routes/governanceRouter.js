import express from 'express'
import governanceCtrl from '../controllers/governance/governanceCtrl.js'

const governanceRouter = express.Router()

governanceRouter.post('/governance/create-image', governanceCtrl.createImage)

governanceRouter.post('/governance/create-video', governanceCtrl.createVideo)

governanceRouter.post('/governance/translate-tweet', governanceCtrl.translateTweet)

export default governanceRouter;