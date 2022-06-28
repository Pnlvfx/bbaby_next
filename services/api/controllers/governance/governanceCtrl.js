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
import puppeteer from 'puppeteer'
import { google } from 'googleapis'
import readline from 'readline'



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
            let localImages = []
            const width = post.mediaInfo.dimension[1]
            const height = post.mediaInfo.dimension[0]
            let audio = []
            let concatAudio = []
            let audioDuration = []
            let audioIndex = 0
            const {HOME_PATH} = process.env
            const path = `${HOME_PATH}/youtubeImage`
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
            const saveImageToDisk = async(imageUrl,index) => {
                const browser = await puppeteer.launch({
                    args: ['--no-sandbox', '--disabled-setupid-sandbox']
                })
                const page = await browser.newPage()
                page.on('response',async (response) => {
                    const url = response.url()
                    //console.log(response.request().resourceType())
                    if (response.request().resourceType() === 'document') { //normally should be 'image'
                        response.buffer().then((file) => {
                            const imagePath = `./youtube/youtubeImage/image${index}.webp`
                            const writeStream = fs.createWriteStream(imagePath)
                            writeStream.write(file)
                        })
                    }
                })
                await page.goto(imageUrl)
                await browser.close
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
                makeDir(path)
                const audio_path = `${path}/audio${audioIndex}.mp3`
                const writeFile = util.promisify(fs.writeFile)
                await writeFile(audio_path, response.audioContent, 'binary')
                const upload = await cloudinary.v2.uploader.upload(audio_path, {
                    upload_preset: 'bbaby_gov_video',
                    resource_type: "video"
                })
                audio.push(upload.secure_url)
                concatAudio.push(audio_path)
                audioDuration.push(upload.duration)
                return upload.duration
            }
            const makeDir = async(path) => {
                try {
                    fs.mkdirSync(path)
                } catch (err) {
                    if (err.code != 'EEXIST') {
                        console.log(err)
                    }
                }
            }
            const wait = ms => new Promise(resolve => setTimeout(resolve,ms))
            
            await Promise.all(
                texts.map(async (text,index) => {
                    const delay = `${index}000`
                    await wait(delay)
                    const finalImage = await _createImage(text.title ? text.title : text.body)
                    const loop = await createAudio(text.title ? text.title : text.body)
                    await saveImageToDisk(finalImage, index)
                    const imagePath = `${path}/image${index}.webp`
                    localImages.push({path: imagePath, loop:loop})
                    images.push(finalImage)
                    await wait(delay)
                })
            )
            audioconcat(concatAudio)
            .concat(`${HOME_PATH}/youtubeImage/Final.mp3`)
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
                    privacyStatus: `public`,
                    images: images,
                    localImages: localImages,
                    audio: audio,
                    audioDuration:audioDuration,
                    width: width,
                    height: height,
                    success:'Image and audio created successfully'
                })
              })
        } catch (err) {
            console.log(err.message)
            res.status(500).json({msg: err.message})
        }
    },
    createVideo: (req,res) => {
        try {
            const {HOME_PATH} = process.env
            const {_videoOptions,images} = req.body
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
            .audio(`${HOME_PATH}/youtubeImage/Final.mp3`)
                .save(`${HOME_PATH}/youtubeImage/video1.mp4`)
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
    uploadVideo: async(req,res) => {
        try {
            const {OAuth2} = google.auth
            const SCOPES = 'https://googleapis.com/auth/youtube.upload'
            const TOKEN_DIR = process.env.HOME_PATH
            const TOKEN_PATH = `${TOKEN_DIR}/youtube_oauth_token.json`
            const videoFilePath = `${TOKEN_DIR}/youtubeImage/video1.mp4`
            const thumbFilePath = `${TOKEN_DIR}/youtubeImage/image0.webp`

            const authorize = (credentials,callback) => {
                const clientSecret = credentials.web.client_secret
                const clientId = credentials.web.client_id
                const redirectUrl = credentials.web.redirect_uris[0]
                const oauth2Client = new OAuth2(clientId,clientSecret,redirectUrl)
                fs.readFile(TOKEN_PATH,function (err,token) {
                    if (err) {
                        getNewToken(oauth2Client,callback)
                    } else {
                        oauth2Client.credentials = JSON.parse(token)
                        callback(oauth2Client)
                    }
                })
            }
            const getNewToken = (oauth2Client,callback) => {
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
                    oauth2Client.getToken(code, function(err,token) {
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
            const storeToken = (token) => {
                try {
                    fs.mkdirSync(TOKEN_DIR)
                } catch (err) {
                    if (err.code != 'EEXIST') {
                        return res.status(500).json({msg: err})
                    }
                }
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) return res.status(500).json({msg: "Error when trying to write the file to disk"})
                    console.log('token stored to ' + TOKEN_PATH)
                })
            }
            const uploadVideo = (auth,title,description,tags,privacyStatus) => {
                let videoInfo = {}
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
                function (err, response) {
                    if (err) {
                        return res.status(500).json(err.message)
                        return
                    }
                    videoInfo = response?.data
        
                    console.log('Video uploaded. Uloading the thumbnail now')
                    youtube.thumbnails.set({
                        auth: auth,
                        videoId: response.data.id,
                        media: {
                            body: fs.createReadStream(thumbFilePath)
                        },
                    },
                    function (err,response) {
                        if (err) {
                            return res.status(500).json('The API returned an error' + err)
                            return
                        }
                        fs.rmdir(`${TOKEN_DIR}/youtubeImage`, {recursive: true}, (err) => {
                            if (err) {
                                return res.status(500).json({msg:'Cannot delete this folder'})
                            }
                        })
                        res.status(201).json({VideoInfo: videoInfo, success: 'Video and thumbnail updated successfully'})
                    })
                }
                )
            }
            const {title,description,tags,categoryId,privacyStatus} = req.body
            fs.readFile(`${TOKEN_DIR}/youtube_client_secret.json`, function processClientSecrets(err,content) {
                if (err) {
                    console.log('Error loading client secret file:' + err)
                    return res.status(500).json({msg: err.message})
                }
                authorize(JSON.parse(content), (auth) => uploadVideo(auth,title,description,tags,privacyStatus))
            })

        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }
}

export default governanceCtrl;
