import Post from '../../models/Post.js'
import Comment from '../../models/Comment.js'
import textToImage from 'text-to-image'
import videoshow from 'videoshow'
import cloudinary from '../../utils/cloudinary.js'
import {TranslationServiceClient} from '@google-cloud/translate'
import textToSpeech from '@google-cloud/text-to-speech'
import util from 'util'
import fs from 'fs'
import audioconcat from 'audioconcat'

const governanceCtrl =  {
    createImage: async (req,res) => {
        try {
            const skip = 0
            const limit = 1
            const {textColor,fontSize,community,format} = req.body
            const post = await Post.findOne({"mediaInfo.isImage" : true, community: community}).sort({createdAt: -1}).limit(limit).skip(skip)
            const texts = await Comment.find({rootId: post._id}).sort({createdAt: 1})
            texts.push(post)
            texts.reverse()
            let images = []
            const width = post.mediaInfo.dimension[1]
            const height = post.mediaInfo.dimension[0]
            let audio = []
            let concatAudio = []
            let audioDuration = []
            let audioIndex = 0

            const _createImage = async(input) => {
                const bgColor = 'rgba(0,0,0,0)'
                const data = await textToImage.generate(`${input}`, { //USE '/n to add space
                    maxWidth: width,
                    bgColor: bgColor,
                    textColor: textColor,
                    fontFamily: 'Helvetica',
                    customHeight: height,
                    fontSize: fontSize,
                    lineHeight: 48,
                    textAlign: 'center',
                    verticalAlign: 'center'
                })
                const imageWText = await cloudinary.v2.uploader.upload(data, {
                    upload_preset: 'bbaby_governance'
                })
                if (!imageWText) {
                    return res.status(500).json({msg: 'Something went wrong when trying to parse the text on the image'})
                }
                const {public_id} = imageWText
                const new_public_id = public_id.replace('/', ':')
                const updatedImage = cloudinary.v2.image(`${post.imageId}.${format}`, {overlay: new_public_id})
                if (!updatedImage) {
                    return res.status(500).json({msg: 'Final image: Something went wrong when trying to add the image with the text on the image'})
                }
                const cleanImage = updatedImage.replace('<img src=','')
                const cleanImage2 = cleanImage.replace('/>','')
                const cleanImage3 = cleanImage2.replace('http', 'https')
                const finalImage = cleanImage3.replaceAll("'", "")
                return finalImage
            }
            const createAudio = async(input) => {
                audioIndex = audioIndex + 1
                const client = new textToSpeech.TextToSpeechClient()
                const request = {
                    input: {text:input},
                    voice: {languageCode: 'it', ssmlGender: 'MALE'},
                    audioConfig: {audioEncoding: 'MP3'},
                };
                const [response] = await client.synthesizeSpeech(request);
                const path = `/home/simone/simone/website/Bbaby_next/services/api/youtubeImage/audio${audioIndex}.mp3`
                const writeFile = util.promisify(fs.writeFile)
                await writeFile(path, response.audioContent, 'binary')
                const upload = await cloudinary.v2.uploader.upload(path, {
                    upload_preset: 'bbaby_gov_video',
                    resource_type: "video"
                })
                audio.push(upload.secure_url)
                concatAudio.push(path)
                audioDuration.push(upload.duration)
                return upload.duration
            }
            // const delay = 3000
            const wait = ms => new Promise(resolve => setTimeout(resolve,ms))
            
            await Promise.all(
                texts.map(async (text,index) => {
                    const delay = `${index}000`
                    await wait(delay)
                    const finalImage = await _createImage(text.title ? text.title : text.body)
                    const loop = await createAudio(text.title ? text.title : text.body)
                    images.push({path:finalImage,loop:loop})
                    await wait(delay)
                    // const _audio = await createAudio(text.title ? text.title : text.body)
                    // if (!_audio) return res.status(500).json({msg: "Something went wrong"})
                })
            )
            audioconcat(concatAudio)
            .concat('./youtubeImage/Final.mp3')
            .on('start', function (command) {
                console.log('ffmpeg process started:', command)
              })
              .on('error', function (err, stdout, stderr) {
                console.error('Error:', err)
                console.error('ffmpeg stderr:', stderr)
              })
              .on('end', function (output) {
                res.json({
                    title: post.title,
                    description: `Bbabystyle è un social network indipendente,esistiamo solo grazie a voi. Contribuisci a far crescere bbabystyle https://bbabystyle.com`,
                    keywords: `Ucraina, News, Notizie`,
                    category: `25`,
                    privacyStatus: `private`,
                    images: images,
                    audio: audio,
                    audioDuration:audioDuration,
                    width: width,
                    height: height,
                    success:'Image and audio created successfully'
                })
              })
            
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    createVideo: (req,res) => {
        try {
            const {_videoOptions,images,audio} = req.body
            const videoOptions = {
                fps: _videoOptions.fps,
                transition: _videoOptions.transition,
                transitionDuration: _videoOptions.transitionDuration, // seconds
                videoBitrate: 1024,
                videoCodec: 'libx264',
                size: '640x?',
                audioBitrate: '128k',
                audioChannels: 2,
                format: 'mp4',
                pixelFormat: 'yuv420p'
            }
            videoshow(images,videoOptions)
            .audio(`./youtubeImage/Final.mp3`)
                .save("./youtubeImage/video1.mp4")
                .on('start', function(command) {
                    console.log("Conversion started " + command)
                })
                .on('progress', function(progress) {
                console.log('Processing: ' + progress.percent + '% done')
                })
                .on('error', function (err,stdout,stderr) {
                    res.status(500).json({msg: `Some error occured ${err ? err : stdout ? stdout : stderr}`})
                })
                .on('end', function(output) {
                    cloudinary.v2.uploader.upload(output, {
                        upload_preset: 'bbaby_gov_video',
                        resource_type: "video"
                    },function(err,response) {
                        if (err) return res.status(500).json({msg: err.message})
                        res.status(201).json({
                            success: "Conversion completed",
                            video: response.secure_url,
                            localPath: '/home/simone/simone/website/Bbaby_next/services/api/youtubeImage/video1.mp4'
                        })
                    })
            })
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    translateTweet: async (req,res) => {
        try {
            const translationClient = new TranslationServiceClient()
            const {text} = req.body
            const {lang} = req.query
            const projectId = 'bbabystyle'
            const location = 'us-central1'
            async function translateText() {
                const request = {
                    parent: `projects/${projectId}/locations/${location}`,
                    contents: [text],
                    mimeType: 'text/plain',
                    sourceLanguageCode: lang === 'en' ? lang : 'it',
                    targetLanguageCode: lang === 'en' ? 'it' : 'en'
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
        
    }

}

export default governanceCtrl;