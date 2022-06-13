import { getUserFromToken } from "../user/UserFunctions.js";
import _oauth from '../../utils/twitter_oauth.js'
import User from "../../models/User.js";

const {COOKIE_DOMAIN} = process.env
const {CLIENT_URL} = process.env
const oauthCallback = `${CLIENT_URL}/settings`
const oauth = _oauth(oauthCallback)
const COOKIE_NAME = 'oauth_token'
let tokens = {}

const twitterCtrl = {
    twitterReqToken: async (req,res) => {
        try {
            const {token} = req.cookies
            const user = await getUserFromToken(token)
            const {oauth_token, oauth_token_secret} = await oauth.getOAuthRequestToken();
            res.cookie(COOKIE_NAME, oauth_token, {
                maxAge: 15 * 60 * 1000, // 15 minutes
                secure: true,
                httpOnly: true,
                sameSite: true,
                domain: COOKIE_DOMAIN
            })
            //const dbtoken = await User.findOneAndUpdate({username: user.username},{tokens:[{oauth_token: oauth_token_secret}]})
            tokens[oauth_token] = {oauth_token_secret}
            res.json({oauth_token})
        } catch (err) {
            console.log(err)
            res.status(403).json(err)
        }
    },
    twitterAccessToken: async (req,res) => {
        try {
            const {token} = req.cookies
            const user = await getUserFromToken(token)
            const {oauth_token: req_oauth_token, oauth_verifier} = req.body
            const oauth_token = req.cookies[COOKIE_NAME]
            const oauth_token_secret = tokens[oauth_token].oauth_token_secret
            if (oauth_token !== req_oauth_token) {
                res.status(403).json({msg: "Request tokens do not match"})
                return
            }
            const {oauth_access_token, oauth_access_token_secret} = await oauth.getOAuthAccessToken(oauth_token,oauth_token_secret, oauth_verifier)
            const saveUserToken = await User.findOneAndUpdate({username: user.username}, {tokens: {oauth_access_token: oauth_access_token, oauth_access_token_secret: oauth_access_token_secret}})
            res.json({success: true});
        } catch (err) {
            res.status(403).json({message: err.msg});
        }
    },
    twitterUserInfo: async (req,res) => {
        try {
            const {token} = req.cookies
            const internalUser = await getUserFromToken(token)
            const {oauth_access_token, oauth_access_token_secret} = internalUser.tokens;
            const response = await oauth.getProtectedResource(`https://api.twitter.com/1.1/account/verify_credentials.json`, "GET", oauth_access_token, oauth_access_token_secret)
            const user = JSON.parse(response.data)
            const twitterInfo = await User.findOneAndUpdate({username: internalUser.username},{externalAccounts: [{username: user.screen_name, provider: 'twitter', link: `https://www.twitter.com/${user.screen_name}`}], hasExternalAccount: true})
            res.json(JSON.parse(response.data))
        } catch (error) {
            console.log(error)
            res.status(403).json({message: error});
        }
    },
    twitterLogout: async (req,res) => {
        try {
            const {token} = req.cookies
            const user = await getUserFromToken(token)
            const oauth_token = await User.findOneAndUpdate({username: user.username},{hasExternalAccount:false, $set: {'tokens': {}, 'externalAccounts': []}})
            res.json({success: true})
        } catch (err) {
            res.status(403).json({msg: "Missing, invalid, or expired tokens"})            
        }
    },
    twitterGetUserPost: async (req,res) => {
        const {token} = req.cookies
        const internalUser = await getUserFromToken(token)
        const {oauth_access_token, oauth_access_token_secret} = internalUser.tokens
        const {slug,owner_screen_name} = req.query
        // const response = await oauth.getProtectedResource(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=spectatorindex`, "GET", oauth_access_token, oauth_access_token_secret)
        const response = await oauth.getProtectedResource(`https://api.twitter.com/1.1/lists/statuses.json?slug=${slug}&owner_screen_name=${owner_screen_name}&tweet_mode=extended&count=100`, "GET", oauth_access_token, oauth_access_token_secret)
        res.json(JSON.parse(response.data))
    },

}

export default twitterCtrl