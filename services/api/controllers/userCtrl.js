import User from "../models/User.js";
import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import sendEmail from "./sendMail.js";
import { getUserFromToken } from "./UserFunctions.js";
import {google} from 'googleapis'

const {OAuth2} = google.auth

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {CLIENT_URL} = process.env
const secret = process.env.TOKEN;

const {COOKIE_DOMAIN} = process.env

const userCtrl = {
    register: async (req,res) => {
        try {
            const {email,username,password} = req.body;

            if(!username || !email || !password)
            return res.status(400).json({msg: "Please fill in all fields"})

            if(!validateEmail(email))
            return res.status(400).json({msg: "That email is invalid"})

            const existingEmail = await User.findOne({email})
            if(existingEmail) return res.status(400).json({msg: "This email already exist!"})

            if(password.length < 8)
            return res.status(400).json({msg: "Password must be at least 8 characters long."})

            const passwordHash = bcrypt.hashSync(password, 10);

            const user = new User({email,username,password: passwordHash});

            const activation_token = createActivationToken(user)


            const url = `${CLIENT_URL}/activation/${activation_token}`
            sendEmail(email, url, "Verify your email address")

            user.save().then(user => {
                jwt.sign({id:user._id}, secret, (err, token) => {
                    if (err) {
                        res.sendStatus(500);
                    }else {
                        res.status(201).cookie('token', token).send();
                    }
                    });
            }).catch(() => {
                res.status(500).json({msg: "This username already exist."});
            });    
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    activateEmail: async (req,res) => {
        try {
            const {activation_token} = req.body;
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const {email,username,password} = user

            const check = await User.findOne({email})
            if(check) return res.status(400).json({msg: "This email already exists"})

            

            res.json({msg: "Success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req,res) => {
        try {
            const {username,password} = req.body;
            User.findOne({username}).then(user => {
                if(user && user.username) {
                    const passOk = bcrypt.compareSync(password,user.password);
                    if (passOk) {
                        jwt.sign({id:user._id}, secret, (err,token) => {
                            res.cookie('token', token, {
                                httpOnly: true,
                                domain: COOKIE_DOMAIN,
                                secure: true
                            }).send()
                        });
                    } else {
                        res.status(422).json({msg:'Invalid username or password'});
                    }
                } else {
                    res.status(422).json({msg:'Invalid username or password'});
                }
            });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    user: (req,res) => {
        try {
            if (!req?.cookies?.token) return res.json(null)
            
            if (req?.cookies?.token) {
                const {token} = req.cookies
                getUserFromToken(token)
                .then(user => {
                    //console.log(user)
                    res.json({user: {username:user.username,avatar:user.avatar,email:user.email}});
                }).catch(err => {
                    res.status(500).json({msg: "Token is expired"})
                })   
            }
            
        } catch {

        }
    },
    forgotPassword: async (req,res) => {
        try {
            const {email} = req.body
            const user = await User.findOne({email})
            if(!user) return res.status(400).json({msg:"This email does not exist."})

            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    googleLogin: async (req,res) => {
        try {
            const {tokenId} = req.body

            const verify = await client.verifyIdToken({idToken: tokenId,audience: process.env.MAILING_SERVICE_CLIENT_ID})

            const {email_verified,email,name,picture} = verify.payload

            const password = email + process.env.GOOGLE_SECRET

            const passwordHash = await bcrypt.hash(password, 10)

            if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

           
                const user = await User.findOne({email})
                if(user){
                    const isMatch = await bcrypt.compare(password,user.password)
                    if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
                    
                    if (isMatch) {
                        jwt.sign({id:user._id}, secret, (err,token) => {
                            res.cookie('token', token, {
                                httpOnly: true,
                                domain: COOKIE_DOMAIN,
                                secure: true,
                            }).send()
                    });
                } 
                } else {
                   const user = new User ({
                       username:name,email,password:passwordHash,avatar:picture
                   })  

                   await user.save()
                   jwt.sign({id:user._id}, secret, (err, token) => {
                    if (err) {
                        res.sendStatus(500);
                    }else {
                        res.status(201).cookie('token', token).send();
                        
                    }
                    });
                }
            

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email); 
}


const createActivationToken = ({...payload}) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '3d'})
}


export default userCtrl;