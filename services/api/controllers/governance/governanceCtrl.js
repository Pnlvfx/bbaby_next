import Post from '../../models/Post.js'
import textToImage from 'text-to-image'
import fs from 'fs'
import videoshow from 'videoshow'
import cloudinary from '../../utils/cloudinary.js'
import {google} from 'googleapis'
import User from '../../models/User.js'

const governanceCtrl =  {
    createImage: async (req,res) => {
        try {
            let skip = 0
            const limit = 1

            const createImage = async() => {
                const bgColor = '#1a1a1b'     //transparent: rgba(0,0,0,0)
                const textColor = 'rgb(215, 218, 220)'
                const website = 'www.bbabystyle.com'
                const post = await Post.findOne({community: 'Italy'}).sort({createdAt: -1}).limit(limit).skip(skip)
                const data = await textToImage.generate(`${post?.title}\n\n${post.body}\n\n\n\n${website}`, {
                    maxWidth: 1920,
                    bgColor: bgColor,
                    textColor: textColor,
                    customHeight: 1080,
                    fontSize: 48,
                    lineHeight: 48,
                    textAlign: 'center',
                    verticalAlign: 'center'
                })
                const clean = await data.replace(/^data:image\/\w+;base64,/, "")
                const buf = Buffer.from(clean, 'base64')
                fs.writeFile(`./youtubeImage/image${skip}.png`, buf, function(err,image) {
                    if (err) {
                        console.log(err)
                    }
                })      
            }
            if (skip === 0) {
                await createImage()
                skip = 1
                if (skip === 1) {
                    await createImage()
                    skip = 2
                    if (skip === 2) {
                        await createImage()
                        res.json({msg: 'all three image are being created'})
                    }
                }
            }

        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    // createImage: async (req,res) => {  //cloudinary
    //     try {
    //         const limit = 1
    //         const createImage = async() => {
    //             const post = await Post.findOne({community: 'Italy', MediaInfo: {isImage: true}}).sort({createdAt: -1}).limit(limit)
    //             const image = await cloudinary.v2.uploader.upload(post.image, {
    //                 transformation: {
    //                     overlay: {font_family: "Arial", font_size: 40, font_weight: 'bold', text: `${post.title}`}}
    //                  })
    //             console.log(image)
    //             //console.log(textToImage)
    //             // const uploadedResponse = await cloudinary.uploader.upload(textToImage,{
    //             //     upload_preset: 'bbaby_avatar'
    //             // })
    //             // res.json(uploadedResponse)
    //         }
    //         createImage()

    //     } catch (err) {
    //         res.status(500).json({msg: err.message})
    //     }
    // },
    createVideo: async (req,res) => {
        const images = [
            {
                path: './youtubeImage/image0.png'
            },
            {
                path: './youtubeImage/image1.png'
            },
            {
                path: './youtubeImage/image2.png'
            },
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