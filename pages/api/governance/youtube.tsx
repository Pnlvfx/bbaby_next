import { NextApiRequest, NextApiResponse } from "next";
import {google} from 'googleapis'
import fs from 'fs'
import { OAuth2Client } from "google-auth-library";
import readline from 'readline'

export default async function uploadYoutube(req:NextApiRequest,res:NextApiResponse) {
    const {OAuth2} = google.auth
    const SCOPES = 'https://www.googleapis.com/auth/youtube.upload'
    const TOKEN_DIR:any = process.env.HOME_PATH
    const TOKEN_PATH = `${TOKEN_DIR}/youtube_oauth_token.json`
    const videoFilePath = `${TOKEN_DIR}/youtubeImage/video1.mp4`
    const thumbFilePath = `${TOKEN_DIR}/youtubeImage/thumbnail.png`
    
    const authorize = (credentials: { web: { client_secret: any; client_id: any; redirect_uris: any[]; }; },callback: (auth: any) => void) => {
        const clientSecret = credentials.web.client_secret
        const clientId = credentials.web.client_id
        const redirectUrl = credentials.web.redirect_uris[0]
        const oauth2Client = new OAuth2(clientId,clientSecret,redirectUrl)
        fs.readFile(TOKEN_PATH,function (err,token:any) {
            if (err) {
                getNewToken(oauth2Client,callback)
            } else {
                oauth2Client.credentials = JSON.parse(token)
                callback(oauth2Client)
            }
        })

    }

    const getNewToken = (oauth2Client: OAuth2Client,callback: any) => {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        })
        console.log(`Authorize this app by visiting this url: ${authUrl}`)
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here:',function(code) {
            rl.close()
            oauth2Client.getToken(code, function(err,token:any) {
                if (err) {
                    console.log('Error while trying to retrieve access token', err)
                    return
                }
                oauth2Client.credentials = token;
                storeToken(token)
                callback(oauth2Client)
            })
        })
    }

    const storeToken = (token: any) => {
        try {
            fs.mkdirSync(TOKEN_DIR)
        } catch (err:Error|any) {
            if (err.code != 'EEXIST') {
                return res.status(500).json({msg: err})
            }
        }
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return res.status(500).json({msg: "Error when trying to write the file to disk"})
            console.log('token stored to ' + TOKEN_PATH)
        })
    }

    const uploadVideo = (auth:any,title:string,description:string,tags:string[],privacyStatus: string) => {
        const youtube = google.youtube('v3')
        youtube.videos.insert({
            auth: auth,
            part: ['snippet,status'],
            requestBody: {
                snippet: {
                    title,
                    description,
                    tags,
                    categoryId: '25',
                    defaultAudioLanguage: 'it',
                    defaultLanguage: 'it'
                },
                status: {
                    privacyStatus
                },
            },
            media: {
                body: fs.createReadStream(videoFilePath)
            }
        },
        function (err:any, response:any) {
            if (err) {
                return res.status(500).json(err.message)
                return
            }
            console.log(response?.data)

            console.log('Video uploaded. Uloading the thumbnail now')
            youtube.thumbnails.set({
                auth: auth,
                videoId: response.data.id,
                media: {
                    body: fs.createReadStream(thumbFilePath)
                },
            },
            function (err:Error|null,response:any) {
                if (err) {
                    return res.status(500).json('The API returned an error' + err)
                    return
                }
                fs.rmdir(`${TOKEN_DIR}/youtubeImage`, {recursive: true}, (err) => {
                    if (err) {
                        return res.status(500).json('Cannot delete this folder')
                    }
                })
                res.status(201).json(response.data)
            })
        }
        )
    }

    try {
        const {title,description,tags,categoryId,privacyStatus} = req.body
        fs.readFile(`${TOKEN_DIR}/youtube_client_secret.json`, function processClientSecrets(err,content:any) {
            if (err) {
                console.log('Error loading client secret file:' + err)
                return res.status(500).json({msg: err.message})
            }
            authorize(JSON.parse(content), (auth) => uploadVideo(auth,title,description,tags,privacyStatus))
        })
    } catch (err) {
        
    }
}