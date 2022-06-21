import Post from '../../models/Post.js'
import textToImage from 'text-to-image'
import fs from 'fs'
import videoshow from 'videoshow'
import cloudinary from '../../utils/cloudinary.js'
import {google} from 'googleapis'
import User from '../../models/User.js'
import {TranslationServiceClient} from '@google-cloud/translate'
import { texttospeech } from 'googleapis/build/src/apis/texttospeech/index.js'

const governanceCtrl =  {
    createImage: async (req,res) => {
        try {
            let skip = 0
            const limit = 1

            const createImage = async() => {
                const bgColor = 'rgba(0,0,0,0)'     //transparent: rgba(0,0,0,0)
                const textColor = 'rgb(215, 218, 220)'
                const website = 'www.bbabystyle.com'
                let filters = {}
                filters.community = 'Italy'

                const post = await Post.findOne({"mediaInfo.isImage" : true, community: "Italy"}).sort({createdAt: -1}).limit(limit).skip(skip)
                const height = post.mediaInfo.dimension[0]
                const width = post.mediaInfo.dimension[1]
                const data = await textToImage.generate(`${post?.title}\n\n${post.body}\n\n\n\n${website}`, {
                    maxWidth: width,
                    bgColor: bgColor,
                    textColor: textColor,
                    customHeight: height,
                    fontSize: 48,
                    lineHeight: 48,
                    textAlign: 'center',
                    verticalAlign: 'center'
                })
                const imageWText = await cloudinary.v2.uploader.upload(data, {
                    upload_preset: 'bbaby_governance'
                })
                const {public_id} = imageWText
                const new_public_id = public_id.replace('/', ':')
                const finalImage =  cloudinary.v2.image(`${post.imageId}.webp`, {overlay: new_public_id})
                const cleanImage = finalImage.replace('<img src=','')
                const cleanImage2 = cleanImage.replace('/>','')
                const cleanImage3 = cleanImage2.replace('http', 'https')
                await createVideo(cleanImage3)
                //res.json({msg: finalImage})
            }
            const createVideo = async (cleanImage3) => {
                console.log(cleanImage3)
            const images = [
                {
                    path: 'https://res.cloudinary.com/bbabystyle/image/upload/l_governance:gtcftzadinx5bj8j2tvp/d63smyadznwbe2lsevti.webp'
                }
            ]
            const videoOptions = {
                loop: 15,
                fps:24,
                transition: true,
                transitionDuration: 1, // seconds
                videoBitrate: 1024,
                videoCodec: 'libx264',
                size: '640x?',
                audioBitrate: '128k',
                audioChannels: 2,
                format: 'mp4',
                pixelFormat: 'yuv420p'
            }
            videoshow(images,videoOptions)
            .save("./youtubeImage/video1.mp4")
            .on('start', function(command) {
                console.log("Conversion started " + command)
            })
            .on('error', function (err,stdout,stderr) {
                console.log("Some error occured" + err)
            })
            .on('end', function(output) {
                res.status(201).json({msg: "Conversion completed " + output})
            })

            }
             await createImage()





        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    createVideo: async (req,res) => {
        
        const images = [
            {
                path: 'https://res.cloudinary.com/bbabystyle/image/upload/l_governance:gtcftzadinx5bj8j2tvp/d63smyadznwbe2lsevti.webp'
            },
            // {
            //     path: './youtubeImage/image1.png'
            // },
            // {
            //     path: './youtubeImage/image2.png'
            // },
        ]

        const videoOptions = {
            loop: 15,
            fps:24,
            transition: true,
            transitionDuration: 1, // seconds
            videoBitrate: 1024,
            videoCodec: 'libx264',
            size: '640x?',
            audioBitrate: '128k',
            audioChannels: 2,
            format: 'mp4',
            pixelFormat: 'yuv420p'
        }
        videoshow(images,videoOptions)
        .save("./youtubeImage/video1.mp4")
        .on('start', function(command) {
            console.log("Conversion started" + command)
        })
        .on('error', function (err,stdout,stderr) {
            console.log("Some error occured" + err)
        })
        .on('end', function(output) {
            res.status(201).json({msg: "Conversion completed" + output})
        })

    },
    translateTweet: async (req,res) => {
        try {
            const translationClient = new TranslationServiceClient()
            const {text} = req.body
            const projectId = 'bbabystyle'
            const location = 'us-central1'
            async function translateText() {
                const request = {
                    parent: `projects/${projectId}/locations/${location}`,
                    contents: [text],
                    mimeType: 'text/plain',
                    sourceLanguageCode: 'en',
                    targetLanguageCode: 'it'
                }
                const [response] = await translationClient.translateText(request)

                for (const translation of response.translations) {
                    res.json(translation.translatedText)
                }
            }
        
            translateText()   
        } catch (err) {
           console.log(err)
           res.json({msg:err}) 
        }
    },
    uploadYoutube: async (req,res) => {
        const {OAuth2} = google.auth
        const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];
        const user = await User.findOne({username: 'SimoneGauli'})
        const TOKEN = user.googleToken
        const videoFilePath = '../../youtubeImage/video1.mp4'
        const youtube = google.youtube('v3')
    }

}

export default governanceCtrl;