import User from "../../models/User.js";
import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import sendEmail from "./sendMail.js";
import { getUserFromToken } from "./UserFunctions.js";
import {google} from 'googleapis'
import fetch from 'node-fetch'

const {OAuth2} = google.auth

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {CLIENT_URL} = process.env
const secret = process.env.TOKEN;

const {COOKIE_DOMAIN} = process.env

const userCtrl = {
    register: async (req,res) => {
        try {
            const {email,username,password,country,countryCode,city,region,lat,lon} = req.body;

            if(!username || !email || !password)
            return res.status(400).json({msg: "Please fill in all fields"})

            if(!validateEmail(email))
            return res.status(400).json({msg: "That email is invalid"})

            const existingEmail = await User.findOne({email})
            if(existingEmail) return res.status(400).json({msg: "This email already exist!"})

            if(password.length < 8)
            return res.status(400).json({msg: "Password must be at least 8 characters long."})

            const passwordHash = bcrypt.hashSync(password, 10);

            const existingUser = await User.findOne({username})
            if (existingUser) return res.status(400).json( {msg: "This username already exist!"})

            const user = await new User({email,username,password: passwordHash,country,countryCode,city,region,lat,lon});

            const activation_token = createActivationToken(user)

            const url = `${CLIENT_URL}/activation/${activation_token}`
            sendEmail(email, url, "Verify your email address")

            user.save().then(user => {
                jwt.sign({id:user._id}, secret, (err, token) => {
                    if (err) {
                        res.status(500).json({msg: 'For some reason you are not able to login. Please retry.'});
                    }else {
                        res.status(201).cookie('token', token, {
                                httpOnly: true,
                                domain: COOKIE_DOMAIN,
                                secure: true
                        }).send();
                    }
                });
            })
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
    user: async(req,res) => {
        try {
            if (!req?.cookies?.token) {
                return res.json(null)
            } else {
                const {token} = req.cookies
                const user = await getUserFromToken(token)
                if(!user) {
                    res.status(500).json({msg: "Token is expired"})
                } else {
                    res.json({user: {username:user.username,avatar:user.avatar,email:user.email}});
                }  
            }
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    userInfo: async(req,res) => {
        try {
            const {token} = req.cookies
            if (!token) return res.status(400).json({msg: "You are not a registered user"})
            const user = await getUserFromToken(token)
            res.json({
                avatar: user.avatar,
                country: user.country, 
                email:user.email,
                externalAccounts:user.externalAccounts,
                hasExternalAccount: user.hasExternalAccount,
                role: user.role,
                username: user.username
            })
        } catch (err) {
            
        }
    },
    userAdmin: (req,res) => {
        try {
            if (!req?.cookies?.token) return res.json(null)
            
            if (req?.cookies?.token) {
                const {token} = req.cookies
                getUserFromToken(token)
                .then(user => {
                    //console.log(user)
                    res.json({user: {username:user.username,avatar:user.avatar,email:user.email,role:user.role}});
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
    logout: async (req,res) => {
        res.clearCookie('token',{
            httpOnly: true,
            domain: COOKIE_DOMAIN,
            secure: true
        }).send()
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
                const {country,countryCode,city,region,lat,lon} = req.body.data
                
                const username = await name.replace(/\s/g,'')  //remove space if there is
                
                const user = new User ({
                    username:username,email,password:passwordHash,avatar:picture,country,countryCode,city,region,lat,lon
                })

                await user.save()
                jwt.sign({id:user._id}, secret, (err, token) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.status(201).cookie('token', token, {
                            httpOnly: true,
                            domain: COOKIE_DOMAIN,
                            secure: true,
                    }).json({msg: "newUser"}).send();
                    
                }
                });
            }
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    redditLogin: async (req,res) => {
        const {REDDIT_CLIENT_ID,REDDIT_CLIENT_SECRET} = process.env
        const {code} = req.query
        const encondedHeader = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString("base64")
        let response = await fetch(`https://www.reddit.com/api/v1/access_token`, {
            method: 'POST',
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${CLIENT_URL}/login/callback`,
            headers: {authorization: `Basic ${encondedHeader}`, 'Content-Type': 'application/x-www-form-urlencoded'}
        })
        // let body = await response.json()
        // response = await fetch(`https://oauth.reddit.com/user/UTOPIA_VFX/upvoted`, {
        //     method: 'GET',
        //     headers: {authorization: `bearer ${body.access_token}`}
        // })
        // let redditUserPref = await response.json()
        // console.log(redditUserPref)
        let body = await response.json()
        response = await fetch(`https://oauth.reddit.com/api/v1/me`, {
            method: 'GET',
            headers: {authorization: `bearer ${body.access_token}`}
        })
        let redditUser = await response.json()

        const {verified,name,icon_img} = redditUser
        const password = name + process.env.REDDIT_SECRET
        const passwordHash = await bcrypt.hash(password, 10)
        if(!verified) return res.status(400).json({msg: "You need to verify your Reddit account to access"})

        const email = 'email@isnotneeded.com'
        const username = name
        const user = await User.findOne({username})
        
        if(user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            if(isMatch) {
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
                username: username,email: email,password:passwordHash,avatar:icon_img
            });
            await user.save()
            jwt.sign({id:user._id}, secret, (err,token) => {
                if(err) {
                    res.status(500).json('Incorrect credentials')
                } else {
                    res.status(201).cookie('token', token, {
                        httpOnly: true,
                        domain: COOKIE_DOMAIN,
                        secure: true,
                    }).send();
                }
            })
        }
    },
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email); 
}


const createActivationToken = ({...payload}) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '3d'})
}


export default userCtrl;