import express from 'express'
import governanceCtrl from '../controllers/governance/governanceCtrl.js'

const governanceRouter = express.Router()

governanceRouter.get('/admin/create-image', governanceCtrl.createImage)

export default governanceRouter;