import express from 'express';
import userCtrl from '../controllers/userCtrl.js';


const router = express.Router();

router.post('/register', userCtrl.register)

router.post('/activation', userCtrl.activateEmail)

router.post('/login', userCtrl.login)

router.get('/user', userCtrl.user)

router.post('/forgot', userCtrl.forgotPassword)

//google

router.post('/google_login',userCtrl.googleLogin)


export default router;